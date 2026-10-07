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

// Persistent conversation history backed by GitHub Issue #1 + in-memory fast cache
interface ChatMessage {
  role: 'user' | 'model'
  text: string
  timestamp: number
}

let cachedHistory: ChatMessage[] = []
let cacheLoaded = false
const MEMORY_ISSUE_NUMBER = 1

async function loadHistory(): Promise<ChatMessage[]> {
  if (cacheLoaded && cachedHistory.length > 0) {
    return cachedHistory
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues/${MEMORY_ISSUE_NUMBER}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      if (data.body) {
        const parsed = JSON.parse(data.body)
        if (Array.isArray(parsed.messages)) {
          cachedHistory = parsed.messages
          cacheLoaded = true
          return cachedHistory
        }
      }
    }
  } catch (err) {
    console.warn('[Memory] Failed to load history from GitHub issue:', err)
  }

  cacheLoaded = true
  return cachedHistory
}

async function persistHistory(messages: ChatMessage[]) {
  cachedHistory = messages
  try {
    await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues/${MEMORY_ISSUE_NUMBER}`, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        body: JSON.stringify(
          {
            updatedAt: new Date().toISOString(),
            messages: messages.slice(-50), // keep up to 50 messages for rich continuous dialogue
          },
          null,
          2
        ),
      }),
    })
  } catch (err) {
    console.warn('[Memory] Failed to persist history to GitHub issue:', err)
  }
}

async function addChatMessage(role: 'user' | 'model', text: string) {
  const history = await loadHistory()
  history.push({ role, text, timestamp: Date.now() })
  if (history.length > 50) {
    history.shift()
  }
  await persistHistory(history)
}

async function clearChatHistory() {
  cachedHistory = []
  await persistHistory([])
}

async function getFormattedHistory(excludeLast = true): Promise<string> {
  const history = await loadHistory()
  const list = excludeLast ? history.slice(0, -1) : history
  if (list.length === 0) return ''
  return list
    .slice(-30) // pass last 30 messages for long, deep context continuity
    .map((m) => `${m.role === 'user' ? 'Василий' : 'Бот'}: ${m.text}`)
    .join('\n\n')
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

interface ImagePayload {
  base64: string
  mimeType: string
}

// Download image file from Telegram (photos or image documents)
async function downloadTelegramImage(fileId: string): Promise<ImagePayload> {
  const fileRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`)
  const fileData = await fileRes.json()
  if (!fileData.ok || !fileData.result?.file_path) {
    throw new Error('Не удалось получить файл изображения из Telegram')
  }

  const filePath: string = fileData.result.file_path
  const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`
  const res = await fetch(fileUrl)
  if (!res.ok) {
    throw new Error(`Ошибка загрузки изображения из Telegram: HTTP ${res.status}`)
  }
  const arrayBuffer = await res.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')

  let mimeType = 'image/jpeg'
  const lower = filePath.toLowerCase()
  if (lower.endsWith('.png')) mimeType = 'image/png'
  else if (lower.endsWith('.webp')) mimeType = 'image/webp'
  else if (lower.endsWith('.gif')) mimeType = 'image/gif'

  return { base64, mimeType }
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
async function executeAgentTask(promptText: string, chatId: number, image?: ImagePayload) {
  await sendChatAction(chatId, 'typing')
  const promptRecord = image
    ? (promptText ? `[Скриншот]: ${promptText}` : `[Скриншот без текста]`)
    : promptText
  await addChatMessage('user', promptRecord)

  const previousHistory = await getFormattedHistory(true)
  const historySection = previousHistory
    ? `\n\nПОЛНАЯ ИСТОРИЯ ДИАЛОГА С ВАСИЛИЕМ (УЧИТЫВАЙ ВСЕ ПРЕДЫДУЩИЕ РЕПЛИКИ!):\n${previousHistory}\n\nКРИТИЧЕСКОЕ ПРАВИЛО: Ты ведёшь ЕДИНЫЙ непрерывный диалог. Если Василий отвечает «Сделай эту правку», «Да», «Вноси», «Применяй», «Ок» или ссылается на прошлое обсуждение — не переспрашивай, а сразу примени согласованное решение через Вариант 2 (edit)!\n`
    : ''

  const systemInstruction = `Ты — ведущий AI-разработчик сайта Vasilii Rent (vslrentcar.com), построенного на Next.js 15 (App Router, Tailwind CSS, TypeScript).
Владелец сайта (Василий) пишет тебе задачи, идеи или вопросы по сайту и автопарку голосом, текстом или присылает скриншоты сайта, прайс-листов и документов.${historySection}

Ключевые файлы сайта (ВНИМАНИЕ: Все страницы используют архитектуру App Router с клиентскими компонентами *.client.tsx или словарём translations.ts! ВСЕ тексты, блоки, вопросы, правила находятся в *.client.tsx или translations.ts, а НЕ в page.tsx!):
1. "src/data/cars.json" — каталог моделей автомобилей (45 моделей, всего в парке более 80 машин):
   - id, name, category, year, transmission, seats, drive, carplay, fuelType, fuelConsumption, priceGel (цена в лари), depositGel (залог в лари), featured (хит), images.
2. "src/context/translations.ts" — словарь 8 языков (ru, en, ar, fa, pl, de, it, fr):
   - тексты hero-блока, преимущества, бейджи, условия аренды (termsAllowedText, termsForbiddenText, termsDurationText и др.), требования, контакты.
3. "src/app/(frontend)/page.client.tsx" — вся главная страница:
   - hero-секция, селектор городов, баннер бесплатного перегона, популярные авто, полный каталог, 3 шага аренды, отзывы, блок преимуществ.
4. "src/app/(frontend)/terms/page.client.tsx" — страница условий аренды:
   - требования, страховка КАСКО без франшизы, исключения, разрешенные и запрещенные регионы, SOS 24/7.
5. "src/app/(frontend)/faq/page.client.tsx" — интерактивная база знаний FAQ (частые вопросы):
   - залог (0 лари), оплата (наличные, карта, перевод), бронь, отмена, разрешенные регионы, правила поездки в Ушгули, возврат, продление.
6. "src/app/(frontend)/guide/page.client.tsx" — памятка водителю:
   - секционные камеры, строгий оригинал прав (электронные не принимаются), ПДД, protocols.ge, парковки, заправки.
7. "src/app/(frontend)/contacts/page.client.tsx" — адреса баз, карты, режим работы и телефоны.
8. "src/components/Header.tsx", "src/components/Footer.tsx" — шапка сайта и подвал.
9. "src/context/AppContext.tsx" — глобальный контекст приложения:
   - курсы валют (RATES: GEL: 1, USD, EUR) и логика конвертации цен с округлением вверх (Math.ceil), телефоны WhatsApp и горячей линии, адреса и координаты баз в городах (Батуми, Тбилиси, Кутаиси).

Конкурентные преимущества и правила Vasilii Rent:
- Сванетия (Местия и Ушгули): Дорога в Ушгули давно полностью заасфальтирована. Проезд открыт, но из-за горного рельефа мы рекомендуем ехать на кроссовере.
- Единственный закрытый регион — Тушетия (перевал Абано / Омало) из-за крайней опасности перевала («дорога смерти»). Также запрещены оккупированные территории и бездорожье без покрытия.
- Выезд за границу (Турция, Армения и др.) строго запрещён: для пересечения границы на авто с грузинскими номерами нужно быть резидентом Грузии, а главное — страховка за границей не действует, что несет критические риски.
- Безлимитный пробег по всей Грузии.
- Отсутствие депозита (большинство авто сдаются под 0 ₾ залог).
- Бронирование без предоплаты.
- Бесплатная отмена бронирования в любое время.
- Аренда от 1 дня без наценок.
- Страховка КАСКО + ОСАГО включена в стоимость: БЕЗ франшизы (если стаж от 2 лет); со стажем от 0 до 2 лет страховка действует с прозрачной франшизой (3–5%). ВАЖНО: страховая компания берет франшизу ТОЛЬКО в случае ДТП по вине нашего арендатора. Если виновник третье лицо — ремонт полностью покрывается без франшизы. Страховка не действует при грубых нарушениях: алкоголь/наркотики, выезд на встречную через сплошную, красный свет, опасное вождение / дрифт, передача руля третьим лицам, оффроуд или езда без масла после пробитого поддона. Колёса покрываются только при ДТП с другими авто.
- Бесплатный возврат в другом городе (Батуми / Тбилиси / Кутаиси) — 0 ₾ (по запросу).
- Условия продления аренды (с уведомлением менеджера заранее):
  * +1 час — бесплатно в подарок;
  * Следующие 6 часов (со 2-го по 7-й час) — почасовая оплата:
    • 10 ₾/час при суточной стоимости аренды до 160 ₾/сутки;
    • 15 ₾/час при суточной стоимости аренды 161–260 ₾/сутки;
    • 20 ₾/час при суточной стоимости аренды от 261 ₾/сутки;
  * Спустя 7 часов задержки (с 8-го часа) оплачиваются полные следующие сутки аренды.
  * Продление всегда согласуется с менеджером заранее с учетом графика следующих броней.

Инструкция:
Определи тип запроса владельца:

Вариант 1 (reply): если Василий спрашивает совет, обсуждает идею, предлагает концепцию, прислал скриншот с вопросом или требуется согласовать логику/тарифы перед внедрением:
{
  "action": "reply",
  "reply": "развернутый, полезный, профессиональный ответ Василию на русском языке с детальным анализом скриншота/вопроса и предложением конкретного решения"
}

Вариант 2 (edit): если задача понятна (из текста, голосового или скриншота) и готова для немедленного внесения изменений в код или данные сайта:
{
  "action": "edit",
  "targetFile": "относительный путь к файлу (например, src/data/cars.json)",
  "explanation": "краткое объяснение на русском, что именно меняем",
  "commitMessage": "краткое сообщение коммита на английском (например, feat: update Audi TT specs)"
}

Ответь СТРОГО в формате JSON.`

  // Step 1: Decision or Reply
  const promptParts: any[] = [{ text: systemInstruction }]
  if (image) {
    promptParts.push({
      inlineData: {
        mimeType: image.mimeType,
        data: image.base64,
      },
    })
  }

  const userQuery = promptText
    ? `Запрос владельца: "${promptText}"`
    : `Владелец отправил скриншот/изображение без подписи. Внимательно изучи изображение, определи суть вопроса, проблему или ошибку на сайте и дай понятный, профессиональный ответ Василию либо предложи/выполни решение.`
  promptParts.push({ text: userQuery })

  const rawPlan = await callGemini([{ parts: promptParts }], true)

  const plan = JSON.parse(rawPlan)

  // If AI determines this is a consultation, proposal or question
  if (plan.action === 'reply' || (!plan.targetFile && plan.reply)) {
    await addChatMessage('model', plan.reply)
    await sendTelegramMessage(chatId, `💡 <b>Ответ разработчика:</b>\n\n${plan.reply}`)
    return
  }

  let targetFile = plan.targetFile
  if (!targetFile) {
    throw new Error('Целевой файл не определен.')
  }

  // Auto-redirect server page wrapper to its client counterpart if page.tsx was selected
  if (targetFile.endsWith('/page.tsx')) {
    const clientPath = targetFile.replace(/\/page\.tsx$/, '/page.client.tsx')
    const clientTest = await getGitHubFile(clientPath)
    if (clientTest) {
      targetFile = clientPath
    }
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
Задача владельца: "${promptText || 'Внести правки по присланному скриншоту'}".
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

  const patchParts: any[] = [{ text: patchPrompt }]
  if (image) {
    patchParts.push({
      inlineData: {
        mimeType: image.mimeType,
        data: image.base64,
      },
    })
  }

  const rawPatch = await callGemini([{ parts: patchParts }], true)

  const patchData = JSON.parse(rawPatch)
  let patchApplied = false
  if (patchData.patches && Array.isArray(patchData.patches) && patchData.patches.length > 0) {
    try {
      let tempContent = currentFile.content
      for (const p of patchData.patches) {
        if (!p.search) continue
        tempContent = applyPatch(tempContent, p.search, p.replace || '')
      }
      if (tempContent !== currentFile.content) {
        newContent = tempContent
        patchApplied = true
      }
    } catch (patchErr) {
      console.warn('[Patch Warning] applyPatch failed, attempting full-file rewrite fallback:', patchErr)
    }
  }

  if (!patchApplied && patchData.fullContent && patchData.fullContent !== currentFile.content) {
    newContent = patchData.fullContent
    patchApplied = true
  }

  // Automatic retry: If file did not change or search blocks couldn't match, ask AI for fullContent
  if (!patchApplied || newContent === currentFile.content) {
    await sendTelegramMessage(chatId, '⚙️ <i>Уточняю контекст и применяю полное обновление файла...</i>')
    const fallbackPrompt = `Ты — ведущий разработчик.
Задача: "${promptText || 'Внести правки по присланному скриншоту'}".
Целевой файл: "${targetFile}".
Файл не изменился через точечный патч. 
Верни ПОЛНЫЙ готовый код обновленного файла СТРОГО в JSON:
{
  "fullContent": "полный текст всего файла с уже внедренными изменениями"
}

Текущий файл:
\`\`\`
${currentFile.content}
\`\`\``

    const fallbackRes = await callGemini([{ parts: [{ text: fallbackPrompt }] }], true)
    const fallbackData = JSON.parse(fallbackRes)
    if (fallbackData.fullContent && fallbackData.fullContent !== currentFile.content) {
      newContent = fallbackData.fullContent
    } else {
      throw new Error('Файл не изменился. Проверьте формулировку задачи или попробуйте указать конкретный текст/параметр.')
    }
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

  await addChatMessage('model', `Применил изменения в ${targetFile}: ${plan.explanation}`)
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
        `Ты можешь отправлять мне команды <b>голосом</b>, <b>текстом</b> или <b>скриншотами / фото</b> прямо со смартфона:\n\n` +
        `💡 <b>Примеры задач:</b>\n` +
        `• <i>Отправь скриншот сайта: «почему здесь так?» или «исправь эту кнопку»</i>\n` +
        `• <i>«Поменяй цену на Audi Q7 на 180 лари»</i>\n` +
        `• <i>«Сделай депозит на BMW 325d равным 200 лари»</i>\n` +
        `• <i>«Добавь на главную плашку акции: скидка 10% от 7 дней»</i>\n` +
        `• <i>«Обнови телефон в шапке на +995591050752»</i>\n` +
        `• <i>«Добавь блок вопросов и ответов (FAQ) перед футером»</i>\n\n` +
        `📊 <b>Служебные команды:</b>\n` +
        `• /status — статус репозитория и боевого сайта\n` +
        `• /cars — список всех моделей и текущих цен\n` +
        `• /clear — начать новый диалог (очистить историю)`
      )
      return NextResponse.json({ ok: true })
    }

    if (message.text?.startsWith('/clear') || message.text?.startsWith('/reset')) {
      await clearChatHistory()
      await sendTelegramMessage(
        chatId,
        '🧹 <b>Память диалога очищена!</b>\nНачинаем новый разговор с чистого листа.'
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

    // Support swipe-to-reply in Telegram
    let replyPrefix = ''
    if (message.reply_to_message) {
      const parentText = (message.reply_to_message.text || message.reply_to_message.caption || '').trim()
      if (parentText) {
        replyPrefix = `[В ответ на реплику: "${parentText.slice(0, 250)}"]\n`
      }
    }

    // Extract prompt from Voice, Photo, Document or Text
    let prompt = ''
    let imagePayload: ImagePayload | undefined = undefined

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
    } else if (message.photo && Array.isArray(message.photo) && message.photo.length > 0) {
      await sendChatAction(chatId, 'upload_photo')
      const largestPhoto = message.photo[message.photo.length - 1]
      prompt = (message.caption || '').trim()

      const statusMsg = prompt
        ? `📸 <b>Получен скриншот:</b> «<i>${prompt}</i>»\nИзучаю изображение и анализирую код проекта...`
        : `📸 <b>Получен скриншот.</b>\nВнимательно изучаю детали на изображении и анализирую проект...`
      await sendTelegramMessage(chatId, statusMsg)

      try {
        imagePayload = await downloadTelegramImage(largestPhoto.file_id)
      } catch (err: any) {
        await sendTelegramMessage(chatId, `❌ Не удалось загрузить изображение: ${err.message}`)
        return NextResponse.json({ ok: true })
      }
    } else if (message.document && message.document.mime_type?.startsWith('image/')) {
      await sendChatAction(chatId, 'upload_photo')
      prompt = (message.caption || '').trim()

      const statusMsg = prompt
        ? `📸 <b>Получен файл изображения:</b> «<i>${prompt}</i>»\nИзучаю изображение и анализирую проект...`
        : `📸 <b>Получен файл изображения.</b>\nВнимательно изучаю детали...`
      await sendTelegramMessage(chatId, statusMsg)

      try {
        imagePayload = await downloadTelegramImage(message.document.file_id)
      } catch (err: any) {
        await sendTelegramMessage(chatId, `❌ Не удалось загрузить изображение: ${err.message}`)
        return NextResponse.json({ ok: true })
      }
    } else if (message.text) {
      prompt = message.text.trim()
      await sendTelegramMessage(chatId, `⏳ <b>Принято в работу:</b> «<i>${prompt}</i>»\nАнализирую архитектуру проекта...`)
    } else {
      await sendTelegramMessage(chatId, 'ℹ️ Отправьте текстовое, голосовое сообщение или скриншот/фотографию с задачей.')
      return NextResponse.json({ ok: true })
    }

    const fullPrompt = replyPrefix ? `${replyPrefix}${prompt}` : prompt

    // Execute the agent task asynchronously
    executeAgentTask(fullPrompt, chatId, imagePayload).catch(async (err) => {
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
