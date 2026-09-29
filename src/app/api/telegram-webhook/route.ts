import { NextRequest, NextResponse } from 'next/server'

// Configuration & Credentials (strictly from environment variables)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const AUTHORIZED_USER_ID = Number(process.env.TELEGRAM_AUTHORIZED_ID || '5811905642')
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''
const GITHUB_REPO = process.env.GITHUB_REPO || 'batumirentauto/websitevasilii'

// Send message to Telegram chat
async function sendTelegramMessage(chatId: number, text: string) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
  } catch (err) {
    console.error('Failed to send Telegram message:', err)
  }
}

// Send typing action to Telegram
async function sendChatAction(chatId: number, action = 'typing') {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action }),
    })
  } catch {}
}

// Resilient multi-model Gemini caller with automatic fallback
const GEMINI_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-3-flash-preview',
]

async function callGemini(contents: any[], jsonMode = false): Promise<string> {
  let lastError: any = null
  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`
      const body: any = { contents }
      if (jsonMode) {
        body.generationConfig = { responseMimeType: 'application/json' }
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        console.warn(`[Gemini] Model ${model} returned ${res.status}:`, errJson)
        lastError = new Error(errJson.error?.message || `HTTP ${res.status}`)
        continue
      }
      const data = await res.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      if (text) {
        return text
      }
      lastError = new Error(`Model ${model} returned empty content`)
    } catch (e: any) {
      lastError = e
    }
  }
  throw lastError || new Error('Все модели Gemini временно недоступны')
}

// Transcribe Telegram voice message using Gemini
async function transcribeVoice(fileId: string): Promise<string> {
  // 1. Get file path from Telegram
  const fileRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`)
  const fileData = await fileRes.json()
  if (!fileData.ok || !fileData.result?.file_path) {
    throw new Error('Could not get audio file from Telegram')
  }

  // 2. Download audio buffer
  const audioUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileData.result.file_path}`
  const audioRes = await fetch(audioUrl)
  const audioBuffer = await audioRes.arrayBuffer()
  const base64Audio = Buffer.from(audioBuffer).toString('base64')

  // 3. Transcribe via resilient Gemini call
  const text = await callGemini([
    {
      parts: [
        {
          inlineData: {
            mimeType: 'audio/ogg',
            data: base64Audio,
          },
        },
        {
          text: 'Расшифруй это голосовое сообщение на русском языке. Верни только распознанный текст без кавычек и комментариев.',
        },
      ],
    },
  ])

  if (!text) {
    throw new Error('Не удалось распознать голос')
  }
  return text
}

// GitHub API: Get file content and SHA
async function getGitHubFile(filePath: string): Promise<{ content: string; sha: string } | null> {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const data = await res.json()
  const content = Buffer.from(data.content, 'base64').toString('utf-8')
  return { content, sha: data.sha }
}

// GitHub API: Commit updated file
async function commitGitHubFile(filePath: string, newContent: string, sha: string, commitMessage: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(newContent, 'utf-8').toString('base64'),
      sha,
      branch: 'main',
    }),
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`GitHub commit failed: ${errText}`)
  }
  return await res.json()
}

// Robust patch application with 4-level fallback
function applyPatch(content: string, search: string, replace: string): string {
  // 1. Direct match
  if (content.includes(search)) {
    return content.replace(search, replace)
  }

  // 2. Normalized CRLF to LF
  const normContent = content.replace(/\r\n/g, '\n')
  const normSearch = search.replace(/\r\n/g, '\n')
  const normReplace = replace.replace(/\r\n/g, '\n')
  if (normContent.includes(normSearch)) {
    return normContent.replace(normSearch, normReplace)
  }

  // 3. Trimmed search match
  const trimSearch = normSearch.trim()
  if (normContent.includes(trimSearch)) {
    return normContent.replace(trimSearch, normReplace.trim())
  }

  // 4. Line-by-line whitespace-tolerant match
  const contentLines = normContent.split('\n')
  const searchLines = normSearch.trim().split('\n').map((l) => l.trim()).filter(Boolean)

  if (searchLines.length > 0) {
    for (let i = 0; i <= contentLines.length - searchLines.length; i++) {
      let matches = true
      for (let j = 0; j < searchLines.length; j++) {
        if (contentLines[i + j].trim() !== searchLines[j]) {
          matches = false
          break
        }
      }
      if (matches) {
        const before = contentLines.slice(0, i).join('\n')
        const after = contentLines.slice(i + searchLines.length).join('\n')
        return `${before}\n${normReplace}\n${after}`
      }
    }
  }

  throw new Error('Не удалось сопоставить фрагмент кода для замены в файле.')
}

// AI Agent: Decide and modify code/data
async function executeAgentTask(promptText: string, chatId: number) {
  await sendChatAction(chatId, 'typing')

  const systemInstruction = `Ты — ведущий AI-разработчик сайта Vasilii Rent (vslrentcar.com), построенного на Next.js 15 (App Router, Tailwind CSS, TypeScript).
Владелец сайта (Василий) пишет тебе задачи, идеи или вопросы по сайту и автопарку голосом или текстом.

Ключевые файлы сайта:
1. "src/data/cars.json" — каталог моделей автомобилей (45 моделей, всего в парке более 80 машин):
   - id, name, category, year, transmission, seats, drive, carplay, fuelType, fuelConsumption, priceGel (цена в лари), depositGel (залог в лари), featured (хит), images.
2. "src/context/translations.ts" — словарь 8 языков (ru, en, ar, fa, pl, de, it, fr):
   - тексты hero-блока, преимущества, бейджи (в т.ч. freeIntercityBadge), требования, контакты.
3. "src/app/(frontend)/page.tsx" — главная страница:
   - hero-секция, селектор городов, баннер бесплатного перегона, популярные авто, полный каталог, 3 шага аренды, преимущества.
4. "src/app/(frontend)/terms/page.tsx" — страница условий аренды:
   - требования, страховка, правила поездок, бесплатный возврат в любом городе.
5. "src/app/(frontend)/contacts/page.tsx" — адреса баз и координаты:
   - Батуми (Варшанидзе 154), Тбилиси (Нуцубидзе), Кутаиси (Аэропорт KUT).
6. "src/components/Header.tsx", "src/components/Footer.tsx" — шапка и подвал.

Конкурентные преимущества Vasilii Rent:
- Безлимитный пробег по всей Грузии.
- Отсутствие депозита (большинство авто сдаются под 0 ₾ залог).
- Бронирование без предоплаты.
- Бесплатная отмена бронирования в любое время.
- Аренда от 1 дня без наценок.
- Страховка включена в стоимость: БЕЗ франшизы (если стаж от 2 лет); со стажем от 0 до 2 лет страховка действует с франшизой.
- Бесплатный возврат в другом городе (Батуми / Тбилиси / Кутаиси) — 0 ₾.

Инструкция:
Определи тип запроса владельца:

Вариант 1 (reply): если Василий спрашивает совет, обсуждает идею, предлагает концепцию или требуется согласовать логику/тарифы перед внедрением:
{
  "action": "reply",
  "reply": "развернутый, полезный, профессиональный ответ Василию на русском языке с предложением конкретного решения"
}

Вариант 2 (edit): если задача понятна и готова для немедленного внесения изменений в код или данные сайта:
{
  "action": "edit",
  "targetFile": "относительный путь к файлу (например, src/data/cars.json)",
  "explanation": "краткое объяснение на русском, что именно меняем",
  "commitMessage": "краткое сообщение коммита на английском (например, feat: update Audi TT specs)"
}

Ответь СТРОГО в формате JSON.`

  // Step 1: Decision or Reply
  const rawPlan = await callGemini([
    { parts: [{ text: systemInstruction }, { text: `Запрос владельца: "${promptText}"` }] },
  ], true)

  const plan = JSON.parse(rawPlan)

  // If AI determines this is a consultation, proposal or question
  if (plan.action === 'reply' || (!plan.targetFile && plan.reply)) {
    await sendTelegramMessage(chatId, `💡 <b>Ответ разработчика:</b>\n\n${plan.reply}`)
    return
  }

  const targetFile = plan.targetFile
  if (!targetFile) {
    throw new Error('Целевой файл не определен.')
  }

  // Step 2: Fetch current content from GitHub
  const currentFile = await getGitHubFile(targetFile)
  if (!currentFile) {
    throw new Error(`Файл ${targetFile} не найден в репозитории.`)
  }

  await sendTelegramMessage(chatId, `🔍 <b>Анализирую файл:</b> <code>${targetFile}</code>\n<i>${plan.explanation}</i>\n⚡ Генерирую патч изменений...`)
  await sendChatAction(chatId, 'typing')

  // Step 3: Fast Patch Generation
  const patchPrompt = `Ты — эксперт по веб-разработке (Next.js 15, TypeScript, Tailwind).
Задача владельца: "${promptText}".
Целевой файл: "${targetFile}".

Текущее содержимое файла:
\`\`\`
${currentFile.content}
\`\`\`

Инструкция:
Чтобы изменение применилось мгновенно и без задержек, верни точный патч в формате JSON с блоками "search" и "replace".
Правила:
1. В "search" укажи точный фрагмент существующего кода из файла (включи 2-4 строки контекста вокруг изменений, чтобы совпадение было 100% уникальным).
2. В "replace" укажи точный фрагмент с внесёнными изменениями.
3. Если требуется несколько правок, добавь их все в массив "patches".
4. Если файл новый или очень короткий (< 100 строк) и его проще переписать полностью, укажи поле "fullContent".

Формат ответа СТРОГО JSON:
{
  "patches": [
    {
      "search": "точный фрагмент из файла для поиска",
      "replace": "обновленный фрагмент для замены"
    }
  ],
  "fullContent": "строка с полным кодом (только если patches пустой)"
}`

  const rawPatch = await callGemini([
    { parts: [{ text: patchPrompt }] },
  ], true)

  const patchData = JSON.parse(rawPatch)
  let newContent = currentFile.content

  if (patchData.patches && Array.isArray(patchData.patches) && patchData.patches.length > 0) {
    for (const p of patchData.patches) {
      if (!p.search) continue
      newContent = applyPatch(newContent, p.search, p.replace || '')
    }
  } else if (patchData.fullContent) {
    newContent = patchData.fullContent
  } else {
    throw new Error('ИИ не предоставил ни патчей, ни содержимого файла.')
  }

  if (newContent === currentFile.content) {
    throw new Error('Файл не изменился. Проверьте формулировку задачи.')
  }

  // Step 4: Commit directly to GitHub
  await sendChatAction(chatId, 'typing')
  const commitRes = await commitGitHubFile(
    targetFile,
    newContent,
    currentFile.sha,
    plan.commitMessage || `feat(tg-bot): ${promptText.slice(0, 50)}`
  )

  const commitSha = commitRes.commit?.sha?.substring(0, 7) || 'latest'
  const commitUrl = `https://github.com/${GITHUB_REPO}/commit/${commitRes.commit?.sha || 'main'}`

  await sendTelegramMessage(
    chatId,
    `✅ <b>Изменения успешно применены!</b>\n\n` +
    `📁 <b>Файл:</b> <code>${targetFile}</code>\n` +
    `📝 <b>Коммит:</b> <a href="${commitUrl}">${commitSha}</a> — <i>${plan.explanation}</i>\n\n` +
    `🚀 <b>Railway</b> уже начал автоматическую сборку и обновление сайта.\n` +
    `Через 1-2 минуты изменения появятся на <a href="https://vslrentcar.com">vslrentcar.com</a>!`
  )
}

// Webhook Handler (POST)
export async function POST(req: NextRequest) {
  try {
    const update = await req.json()
    const message = update.message || update.edited_message

    if (!message) {
      return NextResponse.json({ ok: true })
    }

    const chatId = message.chat.id
    const senderId = message.from?.id

    // Security check: only owner can execute commands
    if (senderId !== AUTHORIZED_USER_ID) {
      await sendTelegramMessage(
        chatId,
        '⛔ <b>Доступ ограничен.</b>\nЭтот бот является внутренним инструментом управления Vasilii Rent.'
      )
      return NextResponse.json({ ok: true })
    }

    // Handle commands
    if (message.text?.startsWith('/start') || message.text?.startsWith('/help')) {
      await sendTelegramMessage(
        chatId,
        `👋 <b>Привет, Василий!</b>\n\n` +
        `Я твой личный AI-разработчик и администратор сайта <b>vslrentcar.com</b>.\n\n` +
        `Ты можешь отправлять мне команды <b>голосом</b> или <b>текстом</b> прямо из машины или со смартфона:\n\n` +
        `💡 <b>Примеры задач:</b>\n` +
        `• <i>«Поменяй цену на Audi Q7 на 180 лари»</i>\n` +
        `• <i>«Сделай депозит на BMW 325d равным 200 лари»</i>\n` +
        `• <i>«Добавь на главную плашку акции: скидка 10% от 7 дней»</i>\n` +
        `• <i>«Обнови телефон в шапке на +995591050752»</i>\n` +
        `• <i>«Добавь блок вопросов и ответов (FAQ) перед футером»</i>\n\n` +
        `📊 <b>Служебные команды:</b>\n` +
        `• /status — статус репозитория и боевого сайта\n` +
        `• /cars — список всех моделей и текущих цен`
      )
      return NextResponse.json({ ok: true })
    }

    if (message.text?.startsWith('/status')) {
      await sendTelegramMessage(
        chatId,
        `🚀 <b>Статус сайта:</b>\n\n` +
        `🌐 <b>Домен:</b> <a href="https://vslrentcar.com">https://vslrentcar.com</a>\n` +
        `📦 <b>Репозиторий:</b> <a href="https://github.com/${GITHUB_REPO}">${GITHUB_REPO}</a>\n` +
        `🚗 <b>Автопарк:</b> 80+ автомобилей (45 моделей, все на АКПП, кузов 1-й картинкой)\n` +
        `⚡ <b>Деплой:</b> автоматический через Railway при каждом коммите`
      )
      return NextResponse.json({ ok: true })
    }

    if (message.text?.startsWith('/cars')) {
      const carsFile = await getGitHubFile('src/data/cars.json')
      if (carsFile) {
        const cars = JSON.parse(carsFile.content)
        const summary = cars.slice(0, 20).map((c: any) => `• ${c.name}: <b>${c.priceGel} ₾</b> (залог ${c.depositGel} ₾)`).join('\n')
        await sendTelegramMessage(chatId, `📋 <b>Первые 20 моделей из каталога:</b>\n\n${summary}\n\n<i>Всего в каталоге: ${cars.length} моделей (более 80 авто в парке)</i>`)
      }
      return NextResponse.json({ ok: true })
    }

    // Extract prompt from Voice or Text
    let prompt = ''
    if (message.voice) {
      await sendChatAction(chatId, 'record_voice')
      await sendTelegramMessage(chatId, '🎙 <i>Слушаю голосовое сообщение...</i>')
      try {
        prompt = await transcribeVoice(message.voice.file_id)
        await sendTelegramMessage(chatId, `🗣 <b>Распознано:</b> «<i>${prompt}</i>»\n⏳ Приступаю к выполнению задачи...`)
      } catch (err: any) {
        await sendTelegramMessage(chatId, `❌ Не удалось распознать голосовое сообщение: ${err.message}`)
        return NextResponse.json({ ok: true })
      }
    } else if (message.text) {
      prompt = message.text
      await sendTelegramMessage(chatId, `⏳ <b>Принято в работу:</b> «<i>${prompt}</i>»\nАнализирую архитектуру проекта...`)
    } else {
      await sendTelegramMessage(chatId, 'ℹ️ Отправьте текстовое или голосовое сообщение с задачей.')
      return NextResponse.json({ ok: true })
    }

    // Execute the agent task asynchronously
    executeAgentTask(prompt, chatId).catch(async (err) => {
      console.error('Agent task error:', err)
      await sendTelegramMessage(chatId, `❌ <b>Ошибка при выполнении:</b>\n<code>${err.message}</code>\n\nПопробуйте переформулировать задачу.`)
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Webhook error:', err)
    return NextResponse.json({ ok: true })
  }
}

// GET for simple health check
export async function GET() {
  return NextResponse.json({
    status: 'active',
    service: 'Vasilii Rent Telegram Bot Webhook',
    timestamp: new Date().toISOString(),
  })
}
