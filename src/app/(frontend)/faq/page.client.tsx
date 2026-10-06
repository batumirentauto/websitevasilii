'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useApp, PHONE_NUMBER, EMERGENCY_PHONE, EMERGENCY_WHATSAPP } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

interface FaqItem {
  id: string
  category: 'booking' | 'payment' | 'documents' | 'insurance' | 'delivery' | 'trips' | 'return'
  categoryLabelRu: string
  categoryLabelEn: string
  questionRu: string
  questionEn: string
  answerRu: React.ReactNode
  answerEn: React.ReactNode
  highlight?: string
}

export default function FaqClient() {
  const { lang, t } = useApp()
  const isEn = lang !== 'ru'

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'deposit': true,
    'payment-methods': true,
    'driver-license': true,
  })

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const faqData: FaqItem[] = [
    // 1. Бронирование и залог
    {
      id: 'deposit',
      category: 'booking',
      categoryLabelRu: 'Залог и бронь',
      categoryLabelEn: 'Deposit & Booking',
      questionRu: 'Действительно ли аренда БЕЗ залога и депозита? В чём подвох?',
      questionEn: 'Is car rental really WITHOUT any deposit? What is the catch?',
      highlight: '0 ₾ залог',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Никакого подвоха нет:</strong> залог (депозит) действительно <strong>0 ₾</strong>. Мы не замораживаем ваши деньги на карте и не берем наличные «под залог». Вы оплачиваете только фиксированную стоимость аренды за согласованные сутки.
          </p>
          <p>
            Автомобиль застрахован, и мы доверяем нашим клиентам. При возврате авто мы не ищем микроцарапины и не удерживаем скрытые комиссии.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>No catch at all:</strong> the security deposit is strictly <strong>0 ₾</strong>. We never block funds on your credit card or hold cash deposits. You only pay the exact agreed rental price for the rental period.
          </p>
          <p>
            The vehicle is fully insured, and we treat our clients with trust. When returning the car, we do not perform unfair inspections or invent hidden fees.
          </p>
        </div>
      ),
    },
    {
      id: 'prepayment',
      category: 'booking',
      categoryLabelRu: 'Залог и бронь',
      categoryLabelEn: 'Deposit & Booking',
      questionRu: 'Нужна ли предоплата для бронирования автомобиля?',
      questionEn: 'Is prepayment required to book a car?',
      highlight: '0 ₾ предоплата',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Предоплата не требуется:</strong> бронирование абсолютно бесплатное.
          </p>
          <p>
            Для бронирования достаточно прислать в Telegram или WhatsApp фото вашего водительского удостоверения и контактный номер. Оплата производится <strong>при получении автомобиля</strong> после осмотра и подписания договора.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>No prepayment needed:</strong> reservations are 100% free with zero prepayment.
          </p>
          <p>
            To confirm a booking, simply send a photo of your driver’s license and contact phone number to Telegram or WhatsApp. You pay only upon car handover after inspection.
          </p>
        </div>
      ),
    },
    {
      id: 'cancellation',
      category: 'booking',
      categoryLabelRu: 'Залог и бронь',
      categoryLabelEn: 'Deposit & Booking',
      questionRu: 'Что если у меня изменятся планы или отменят рейс? Сколько стоит отмена?',
      questionEn: 'What if my plans change or flight is cancelled? What is the cancellation fee?',
      highlight: 'Бесплатная отмена',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Отмена бесплатная 0 ₾ в любое время.</strong> Мы понимаем, что рейсы задерживают, а планы в путешествиях могут меняться.
          </p>
          <p>
            Единственная человеческая просьба — предупредить нас как можно раньше в мессенджере, чтобы мы могли освободить авто для других гостей.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>Cancellation is 100% free (0 ₾) at any time.</strong> We know flights get rescheduled and holiday plans fluctuate.
          </p>
          <p>
            We only kindly request that you message us as early as possible so we can release the car for other guests.
          </p>
        </div>
      ),
    },
    {
      id: 'mileage',
      category: 'booking',
      categoryLabelRu: 'Залог и бронь',
      categoryLabelEn: 'Deposit & Booking',
      questionRu: 'Есть ли суточный лимит пробега по Грузии?',
      questionEn: 'Is there a daily mileage limit within Georgia?',
      highlight: 'Безлимитный пробег',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Пробег абсолютно безлимитный</strong> на весь период аренды.
          </p>
          <p>
            Вы можете свободно путешествовать из Батуми в Тбилиси, Сванетию, Кахетию, Казбеги и обратно, не высчитывая километры и не опасаясь доплат при сдаче.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>Unlimited mileage</strong> across all Georgia for the entire rental duration.
          </p>
          <p>
            Drive freely from Batumi to Tbilisi, Svaneti, Kakheti, Kazbegi and back without calculating kilometers or fearing per-kilometer surcharge fees.
          </p>
        </div>
      ),
    },
    {
      id: 'rental-day-calculation',
      category: 'booking',
      categoryLabelRu: 'Залог и бронь',
      categoryLabelEn: 'Deposit & Booking',
      questionRu: 'Как рассчитываются сутки аренды? 1 день — это календарный день или 24 часа?',
      questionEn: 'How is a rental day calculated? Is 1 day a calendar day or 24 hours?',
      highlight: '1 день = 24 часа',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>1 день аренды — это ровно сутки (24 часа)</strong> с момента фактического получения автомобиля.
          </p>
          <p>
            Например, если вы забрали автомобиль сегодня в <strong>14:00</strong> на 1 сутки, вернуть его нужно завтра до <strong>14:00</strong>. Никакой привязки к расчетным часам отелей или календарным дням нет.
          </p>
          <p className="text-xs text-[#6E6E73]">
            <strong>Задерживаетесь при возврате?</strong> Первый час задержки (до 60 минут) — <strong>в подарок бесплатно</strong> при согласовании с менеджером. Если нужно продлить на 2–6 часов — действует честная почасовая оплата (10–20 ₾/час) без необходимости оплачивать полные дополнительные сутки!
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>1 rental day equals exactly 24 hours</strong> from the exact moment you receive the vehicle.
          </p>
          <p>
            For example, if you pick up the car at <strong>14:00</strong> today for 1 day, drop-off is due tomorrow by <strong>14:00</strong>. There are no hotel-style checkout cutoffs or calendar day restrictions.
          </p>
          <p className="text-xs text-[#6E6E73]">
            <strong>Running late for drop-off?</strong> The 1st hour is <strong>free of charge</strong> with prior manager notice. If you need 2 to 6 extra hours, a fair hourly rate applies (10–20 GEL/hour) without paying for a full extra day!
          </p>
        </div>
      ),
    },

    // 2. Оплата и расчеты
    {
      id: 'payment-methods',
      category: 'payment',
      categoryLabelRu: 'Способы оплаты',
      categoryLabelEn: 'Payment Methods',
      questionRu: 'Какими способами можно оплатить аренду автомобиля?',
      questionEn: 'What payment methods are available for car rental?',
      highlight: isEn ? 'Cash / Card / Bank transfer' : 'Наличные / Карта / Банковский перевод',
      answerRu: (
        <div className="space-y-3">
          <p>Оплата происходит при получении автомобиля. Мы предлагаем удобные способы расчета:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>Наличными:</strong> при передаче автомобиля.</li>
            <li><strong>Оплата банковской картой (по запросу):</strong> если вы планируете оплату картой, сообщите об этом менеджеру при согласовании бронирования.</li>
            <li><strong>Переводом на счет в грузинском банке:</strong> прямой расчет на банковский счет в Грузии (Bank of Georgia, TBC, Credo и др.).</li>
            <li><strong>Другие способы оплаты:</strong> возможность альтернативных способов расчета вы всегда можете уточнить у нашего менеджера.</li>
          </ul>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>Payment takes place upon vehicle pickup. We offer convenient payment options:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>Cash:</strong> upon vehicle handover.</li>
            <li><strong>Bank card payment (on request):</strong> if you plan to pay by card, please let our manager know when confirming your reservation.</li>
            <li><strong>Transfer to a Georgian bank account:</strong> direct payment to a bank account in Georgia (Bank of Georgia, TBC, Credo, etc.).</li>
            <li><strong>Other payment options:</strong> feel free to check with our manager for alternative payment arrangements upon booking.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'online-pay-third-party',
      category: 'payment',
      categoryLabelRu: 'Способы оплаты',
      categoryLabelEn: 'Payment Methods',
      questionRu: 'Может ли оплатить аренду другой человек (например, родственник удаленно, а заберет водитель)?',
      questionEn: 'Can someone else pay remotely while another driver collects the vehicle?',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Да, конечно!</strong> Оплату можно произвести удаленно (переводом или картой по согласованию с менеджером), а автомобиль получит указанный в договоре водитель с оригиналом прав.
          </p>
          <p>
            Главное условие: тот, кто фактически садится за руль, должен иметь при себе физический оригинал своего водительского удостоверения и паспорт для оформления договора.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>Yes, absolutely!</strong> Payment can be completed remotely (via transfer or card upon agreement with the manager), while the designated driver receives the vehicle.
          </p>
          <p>
            Crucial condition: the person who drives must present their physical original driving license and passport for contract registration.
          </p>
        </div>
      ),
    },

    // 3. Документы, стаж и возраст
    {
      id: 'driver-license',
      category: 'documents',
      categoryLabelRu: 'Документы и стаж',
      categoryLabelEn: 'Documents & Experience',
      questionRu: 'Подойдут ли электронные права, государственные приложения или фото на телефоне?',
      questionEn: 'Are digital licenses, government mobile apps, or smartphone photos accepted?',
      highlight: 'Строго физический оригинал',
      answerRu: (
        <div className="space-y-3">
          <p className="text-[#FF3B30] font-bold">
            ⚠️ КАТЕГОРИЧЕСКИ НЕТ! Фото на телефоне, сканы или электронные удостоверения в любых государственных приложениях полицией Грузии не принимаются.
          </p>
          <p>
            Патрульная полиция Грузии требует у иностранных граждан исключительно <strong>физический пластиковый оригинал прав</strong> (национальные права вашей страны с латинской транслитерацией либо МВУ).
          </p>
          <p>
            Штраф за отсутствие оригинала прав и эвакуация авто на штрафстоянку составляют около <strong>1 500 лари</strong>. Подробнее со всеми статьями закона смотрите в нашей{' '}
            <Link href="/guide#license-original" className="text-[#0071E3] font-semibold underline">
              Памятке водителю →
            </Link>
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p className="text-[#FF3B30] font-bold">
            ⚠️ STRICTLY NO! Photos on smartphones, digital PDFs, or national state apps are categorically rejected by Georgian police.
          </p>
          <p>
            Foreign drivers must have their <strong>physical original plastic driver’s license</strong> (with Latin transliteration or IDP) on hand.
          </p>
          <p>
            Fines and impound tow charges for driving without an original physical license reach approx <strong>1,500 GEL</strong>. See full details in our{' '}
            <Link href="/guide#license-original" className="text-[#0071E3] font-semibold underline">
              Driving Guide →
            </Link>
          </p>
        </div>
      ),
    },
    {
      id: 'driving-experience',
      category: 'documents',
      categoryLabelRu: 'Документы и стаж',
      categoryLabelEn: 'Documents & Experience',
      questionRu: 'Какой минимальный возраст и стаж вождения требуются для аренды?',
      questionEn: 'What is the minimum age and driving experience required?',
      highlight: 'Возраст от 21 года',
      answerRu: (
        <div className="space-y-3">
          <p>
            Минимальный возраст водителя — <strong>от 21 года</strong>.
          </p>
          <p>
            <strong>Стаж вождения:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>От 2 лет стажа:</strong> страховка КАСКО действует с <strong>0 франшизой</strong> (полное покрытие).</li>
            <li><strong>От 1 до 2 лет стажа:</strong> франшиза при ДТП по вашей вине составит 3% от стоимости авто.</li>
            <li><strong>До 1 года стажа (начинающий водитель):</strong> франшиза 5%.</li>
          </ul>
          <p className="text-xs text-[#6E6E73]">
            Если стаж от 2 лет, но права были недавно перевыпущены — достаточно показать фото старых прав или справку для подтверждения стажа страховой.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            Minimum driver age is <strong>21 years old</strong>.
          </p>
          <p>
            <strong>Driving experience conditions:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>2+ years experience:</strong> comprehensive CASCO insurance operates with <strong>0 franchise</strong>.</li>
            <li><strong>1 to 2 years experience:</strong> insurance excess / deductible is 3% of car value if at fault.</li>
            <li><strong>0 to 1 year experience:</strong> insurance excess / deductible is 5% of car value.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'second-driver',
      category: 'documents',
      categoryLabelRu: 'Документы и стаж',
      categoryLabelEn: 'Documents & Experience',
      questionRu: 'Можно ли вписать второго водителя в договор и сколько это стоит?',
      questionEn: 'Can I add a second driver to the rental contract and what does it cost?',
      highlight: '2-й водитель бесплатно',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Второй водитель вписывается бесплатно (0 ₾).</strong>
          </p>
          <p>
            При оформлении просто предоставьте оригинал водительского удостоверения и паспорт второго водителя, чтобы страховка распространялась на обоих.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>Adding a second driver is 100% free (0 ₾).</strong>
          </p>
          <p>
            Simply present the physical driving license and passport of the second driver at handover so insurance covers both drivers.
          </p>
        </div>
      ),
    },

    // 4. Страховка и ДТП
    {
      id: 'insurance-coverage',
      category: 'insurance',
      categoryLabelRu: 'Страховка и ДТП',
      categoryLabelEn: 'Insurance & Incidents',
      questionRu: 'Какая страховка включена в стоимость и что она покрывает?',
      questionEn: 'What insurance is included in the price and what does it cover?',
      highlight: 'КАСКО + ОСАГО включено',
      answerRu: (
        <div className="space-y-3">
          <p>
            В стоимость каждой аренды уже включены <strong>КАСКО и ОСАГО</strong>. Страховка защищает автомобиль от повреждений при ДТП, действий третьих лиц и угона.
          </p>
          <p>
            <strong>При стаже от 2 лет франшиза равна 0 ₾</strong> — в случае любого происшествия вы не несете финансовой ответственности при соблюдении правил.
          </p>
          <p className="text-xs text-[#86868B]">
            * Исключения стандартны для всех страховых компаний мира: управление в нетрезвом виде, грубое нарушение условий договора, передача руля лицу без прав.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            Both <strong>comprehensive CASCO and third-party liability (OSAGO)</strong> are included in the rental price by default.
          </p>
          <p>
            <strong>With 2+ years of driving experience, your franchise is 0 ₾</strong> — meaning zero financial liability in accidental incidents when rules are followed.
          </p>
        </div>
      ),
    },
    {
      id: 'accident-sos',
      category: 'insurance',
      categoryLabelRu: 'Страховка и ДТП',
      categoryLabelEn: 'Insurance & Incidents',
      questionRu: 'Что делать, если произошло ДТП или пробило колесо в дороге?',
      questionEn: 'What should I do if an accident or flat tire happens on the road?',
      highlight: 'Поддержка SOS 24/7',
      answerRu: (
        <div className="space-y-3">
          <p>
            Мы остаемся с вами на связи <strong>24 часа в сутки, 7 дней в неделю</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm">
            <li>Остановитесь, включите аварийную сигнализацию и убедитесь в безопасности всех пассажиров.</li>
            <li><strong>Сразу свяжитесь с нами:</strong> WhatsApp / телефон круглосуточной линии SOS:{' '}
              <a href={`tel:${EMERGENCY_PHONE.replace(/\s/g, '')}`} className="font-bold text-[#FF3B30] underline">
                {EMERGENCY_PHONE}
              </a>
            </li>
            <li>Мы поможем вызвать патруль (112), зафиксировать протокол для страховой и скоординируем техническую помощь или подменный автомобиль.</li>
          </ol>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            Our emergency support is available <strong>24/7</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm">
            <li>Stop safely, turn on hazard lights, and ensure everyone is safe.</li>
            <li><strong>Immediately contact our 24/7 SOS helpline:</strong> WhatsApp / Tel:{' '}
              <a href={`tel:${EMERGENCY_PHONE.replace(/\s/g, '')}`} className="font-bold text-[#FF3B30] underline">
                {EMERGENCY_PHONE}
              </a>
            </li>
            <li>We coordinate with police (112) for the insurance protocol, arrange towing, or provide a replacement vehicle.</li>
          </ol>
        </div>
      ),
    },

    // 5. Подача, доставка и базы
    {
      id: 'pickup-locations',
      category: 'delivery',
      categoryLabelRu: 'Подача и адреса',
      categoryLabelEn: 'Pickup & Delivery',
      questionRu: 'Где находятся ваши базы и можно ли заказать доставку в аэропорт или к отелю?',
      questionEn: 'Where are your bases located and can you deliver to the airport or hotel?',
      answerRu: (
        <div className="space-y-3">
          <p>У нас действуют 3 официальные точки в ключевых городах Грузии:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>Батуми:</strong> ул. Мамия Варшанидзе 154 (бесплатный самовывоз). Подача в аэропорт Батуми (BUS) или по городу — по согласованию.</li>
            <li><strong>Кутаиси:</strong> Международный Аэропорт Кутаиси (KUT) — круглосуточная встреча прямо у терминала прилёта. Доставка в город — 30 ₾.</li>
            <li><strong>Тбилиси:</strong> 3-й микрорайон Нуцубидзе (бесплатно). Доставка в аэропорт Тбилиси (TBS) или к отелю — 30 ₾ днем / 50 ₾ ночью.</li>
          </ul>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>We operate 3 dedicated hubs in Georgia:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>Batumi:</strong> 154 Mamiya Varshanidze St (free base pickup). Airport (BUS) / city delivery on request.</li>
            <li><strong>Kutaisi:</strong> Kutaisi International Airport (KUT) — direct 24/7 meet & greet outside arrivals. City delivery 30 ₾.</li>
            <li><strong>Tbilisi:</strong> Nutsubidze microdistrict (free base pickup). Airport (TBS) / hotel delivery: 30 ₾ day / 50 ₾ night.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'child-seat',
      category: 'delivery',
      categoryLabelRu: 'Подача и адреса',
      categoryLabelEn: 'Pickup & Delivery',
      questionRu: 'Предоставляете ли вы детское кресло или бустер?',
      questionEn: 'Do you provide baby car seats or booster cushions?',
      highlight: 'Кресла и бустеры в наличии',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Да, детские кресла и бустеры есть в наличии.</strong>
          </p>
          <p>
            При бронировании просто укажите возраст и вес ребенка, чтобы мы заранее подготовили и установили в машину подходящее удерживающее устройство к вашему приезду.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>Yes, baby car seats and booster cushions are readily available.</strong>
          </p>
          <p>
            When booking, simply specify your child’s age and approximate weight so we can install the matching seat before handover.
          </p>
        </div>
      ),
    },

    // 6. Поездки по Грузии и горы
    {
      id: 'mountain-regions',
      category: 'trips',
      categoryLabelRu: 'Маршруты и горы',
      categoryLabelEn: 'Routes & Mountains',
      questionRu: 'Куда можно и куда нельзя ездить на арендованном авто?',
      questionEn: 'Where can and cannot you drive in Georgia?',
      highlight: 'Вся Грузия открыта',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Разрешено:</strong> передвижение по всей территории Грузии, доступной для автомобильного движения — Батуми, Тбилиси, Кахетия, Боржоми, Бакуриани, Казбеги, Местия (Сванетия) и др.
          </p>
          <p className="text-[#FF3B30] font-semibold">
            Запрещенные опасные направления для прокатных авто:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-[#48484A]">
            <li>Тушетия (экстремальный перевал Абано) — запрещено на всех автомобилях.</li>
            <li>Ушгули (дорога Местия — Ушгули) на седанах (разрешено только на полноприводных кроссоверах/внедорожниках 4x4 при сухой погоде).</li>
            <li>Оккупированные территории (Абхазия и Южная Осетия) — въезд запрещен законом Грузии.</li>
            <li>Глубокое бездорожье, броды через горные реки и каменистые русла.</li>
          </ul>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>Allowed:</strong> All standard public roads across Georgia: Batumi, Tbilisi, Kakheti, Borjomi, Bakuriani, Kazbegi, Mestia (Svaneti), etc.
          </p>
          <p className="text-[#FF3B30] font-semibold">
            Prohibited extreme off-road routes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-[#48484A]">
            <li>Tusheti (Abano Pass) — strictly prohibited for all rental vehicles.</li>
            <li>Mestia to Ushguli on sedans (permitted only on 4x4 AWD SUVs under dry weather).</li>
            <li>Occupied territories (Abkhazia, South Ossetia) — illegal under Georgian law.</li>
            <li>River crossings, extreme boulders, and off-road tracks.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'cross-border',
      category: 'trips',
      categoryLabelRu: 'Маршруты и горы',
      categoryLabelEn: 'Routes & Mountains',
      questionRu: 'Можно ли выехать на машине в Турцию, Армению или другие соседние страны?',
      questionEn: 'Can I cross the border into Turkey, Armenia or other neighboring countries?',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Нет, выезд за пределы государственной границы Грузии запрещен.</strong>
          </p>
          <p>
            Страховка и генеральная доверенность действуют исключительно на территории Грузии. На пограничных КПП прокатный автомобиль без специальной нотариальной международной доверенности не пропустят.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>No, crossing international borders is strictly not permitted.</strong>
          </p>
          <p>
            Insurance and registration documents are valid strictly inside Georgian territory. Border checkpoints will deny passage to rental vehicles without specialized international notarized powers.
          </p>
        </div>
      ),
    },

    // 7. Возврат, мойка и продление
    {
      id: 'intercity-return',
      category: 'return',
      categoryLabelRu: 'Возврат и мойка',
      categoryLabelEn: 'Return & Washing',
      questionRu: 'Можно ли взять машину в Батуми, а вернуть в Тбилиси или Кутаиси?',
      questionEn: 'Can I pick up in Batumi and drop off in Tbilisi or Kutaisi?',
      highlight: 'One-way аренда доступна',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Да, междугородний возврат возможен!</strong> Это один из самых популярных маршрутов у туристов.
          </p>
          <p>
            Вы можете взять автомобиль в Батуми и сдать его в Тбилиси или в аэропорту Кутаиси.
          </p>
          <p className="text-xs text-[#6E6E73]">
            При долгосрочной аренде (от 7–10 дней в зависимости от сезона) возврат в другом городе часто предоставляется <strong>бесплатно</strong>! Для коротких поездок действует небольшая стандартная плата за обратный перегон авто. Уточняйте точный расчет на ваши даты у менеджера.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>Yes, one-way intercity returns are available!</strong> This is one of our most popular travel options.
          </p>
          <p>
            You can pick up your car in Batumi and drop it off in Tbilisi or Kutaisi Airport.
          </p>
          <p className="text-xs text-[#6E6E73]">
            On longer rentals (typically 7–10+ days depending on seasonality), intercity returns are often provided <strong>completely free</strong>. For shorter bookings, a modest relocation fee applies.
          </p>
        </div>
      ),
    },
    {
      id: 'car-washing',
      category: 'return',
      categoryLabelRu: 'Возврат и мойка',
      categoryLabelEn: 'Return & Washing',
      questionRu: 'Нужно ли мыть машину перед возвратом?',
      questionEn: 'Do I need to wash the car before returning it?',
      highlight: 'Мыть НЕ нужно',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Нет, мыть машину после аренды не нужно!</strong>
          </p>
          <p>
            Стандартная городская пыль и дорожная грязь — это норма. Мы самостоятельно моем и дезинфицируем каждый автомобиль на нашей базе перед выдачей следующему клиенту.
          </p>
          <p className="text-xs text-[#86868B]">
            * Исключение: сильное загрязнение салона (пролитые напитки, пятна на сиденьях) — в таких редких случаях оплачивается фактическая химчистка.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>No, you do not need to wash the car before returning it!</strong>
          </p>
          <p>
            Normal exterior road dust and light rain splatters are completely fine. We handle complete washing and interior prep at our detailing base before handing over to the next guest.
          </p>
        </div>
      ),
    },
    {
      id: 'fuel-policy',
      category: 'return',
      categoryLabelRu: 'Возврат и мойка',
      categoryLabelEn: 'Return & Washing',
      questionRu: 'Какое топливо заправлять и с каким уровнем бака возвращать автомобиль?',
      questionEn: 'What fuel should I use and what fuel level is required upon return?',
      highlight: 'Бак: столько же, сколько было',
      answerRu: (
        <div className="space-y-3">
          <p>
            <strong>Правило уровня топлива:</strong> возвращайте машину с тем же уровнем топлива, с которым получили (обычно мы выдаем с полным или фиксированным баком, отмеченным в акте).
          </p>
          <p>
            <strong>Тип топлива:</strong> в зависимости от машины используется бензин (95, 98, 100) либо дизель (92 не используется). Точный тип топлива уточняйте у менеджера при выдаче автомобиля. Заправляйтесь на проверенных сетевых АЗС: Gulf, Wissol, Rompetrol, Socar, Connect.
          </p>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            <strong>Fuel level policy:</strong> Same-to-same. Return the car with the same fuel level you received it with (recorded upon pickup).
          </p>
          <p>
            <strong>Fuel type:</strong> depending on the vehicle, cars run on petrol (95, 98, 100) or diesel (we never use 92). Please confirm the exact fuel grade with your manager upon pickup. Refuel at reputable branded stations: Gulf, Wissol, Rompetrol, Socar, Connect.
          </p>
        </div>
      ),
    },
    {
      id: 'late-return',
      category: 'return',
      categoryLabelRu: 'Возврат и мойка',
      categoryLabelEn: 'Return & Washing',
      questionRu: 'Что если мы задержимся в дороге или захотим продлить аренду на пару часов?',
      questionEn: 'What if we get delayed in traffic or want to extend rental by a few hours?',
      highlight: '+1 час бесплатно',
      answerRu: (
        <div className="space-y-3">
          <p>
            У нас действуют самые лояльные условия продления:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>Первый 1 час задержки:</strong> совершенно <strong>бесплатно (0 ₾)</strong>! Вы спокойно доезжаете без нервов и спешки.</li>
            <li><strong>Следующие до 6 часов:</strong> оплачиваются по прозрачному почасовому тарифу (10–15 ₾/час в зависимости от класса машины), без необходимости переплачивать за целые лишние сутки.</li>
            <li><strong>Свыше 7 часов задержки:</strong> рассчитываются как следующие сутки аренды.</li>
          </ul>
        </div>
      ),
      answerEn: (
        <div className="space-y-3">
          <p>
            We offer fair and transparent extension terms:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>First +1 hour delay:</strong> completely <strong>free of charge (0 ₾)</strong>! No stress if you get caught in traffic.</li>
            <li><strong>Next 2 to 6 hours:</strong> billed at a clear hourly rate (10–15 GEL/hr depending on vehicle class) without charging a full day.</li>
            <li><strong>Beyond 7 hours:</strong> billed as a regular extra 24-hour day.</li>
          </ul>
        </div>
      ),
    },
  ]

  const categories = [
    { id: 'all', labelRu: 'Все вопросы', labelEn: 'All Questions', count: faqData.length },
    { id: 'booking', labelRu: 'Залог и бронь', labelEn: 'Deposit & Booking', count: faqData.filter(i => i.category === 'booking').length },
    { id: 'payment', labelRu: 'Способы оплаты', labelEn: 'Payment Methods', count: faqData.filter(i => i.category === 'payment').length },
    { id: 'documents', labelRu: 'Документы и права', labelEn: 'Documents & License', count: faqData.filter(i => i.category === 'documents').length },
    { id: 'insurance', labelRu: 'Страховка и ДТП', labelEn: 'Insurance & SOS', count: faqData.filter(i => i.category === 'insurance').length },
    { id: 'delivery', labelRu: 'Подача и адреса', labelEn: 'Delivery & Hubs', count: faqData.filter(i => i.category === 'delivery').length },
    { id: 'trips', labelRu: 'Маршруты и горы', labelEn: 'Routes & Mountains', count: faqData.filter(i => i.category === 'trips').length },
    { id: 'return', labelRu: 'Возврат и мойка', labelEn: 'Return & Washing', count: faqData.filter(i => i.category === 'return').length },
  ]

  const filteredItems = useMemo(() => {
    return faqData.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory
      if (!matchCategory) return false

      if (!searchQuery.trim()) return true

      const q = searchQuery.toLowerCase().trim()
      const searchInRu = item.questionRu.toLowerCase().includes(q) || item.categoryLabelRu.toLowerCase().includes(q)
      const searchInEn = item.questionEn.toLowerCase().includes(q) || item.categoryLabelEn.toLowerCase().includes(q)
      return searchInRu || searchInEn
    })
  }, [faqData, activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-20 text-[#1D1D1F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#86868B] mb-6">
          <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
            {t.brandName || 'VASILII RENT'}
          </Link>
          <span>/</span>
          <span className="text-[#1D1D1F]">{isEn ? 'FAQ' : 'Частые вопросы'}</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-bold text-[#1D1D1F] shadow-xs mb-4">
            <span>💬</span> {isEn ? 'Real Client Questions & Answers' : 'На основе реальных диалогов с клиентами'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight mb-4">
            {isEn ? 'Frequently Asked Questions' : 'Часто задаваемые вопросы'}
          </h1>
          <p className="text-base sm:text-lg text-[#6E6E73] leading-relaxed">
            {isEn
              ? 'Clear answers regarding 0 deposit, payment methods, physical driver license requirements, insurance, and road trips across Georgia.'
              : 'Всё, что важно знать перед бронированием: 0 залог, способы оплаты, оригинал прав, страховка без франшизы и маршруты по Грузии.'}
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lg text-[#86868B]">
            🔍
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isEn
                ? 'Search questions (e.g. deposit, card, license, child seat)...'
                : 'Поиск по вопросам (например: залог, карта, права, мойка, кресло)...'
            }
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-black/[0.08] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent shadow-xs transition-all placeholder:text-[#86868B]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#86868B] hover:text-[#1D1D1F]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {categories.map((c) => {
            const isActive = activeCategory === c.id
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#1D1D1F] text-white shadow-sm'
                    : 'bg-white text-[#6E6E73] hover:text-[#1D1D1F] border border-black/[0.06]'
                }`}
              >
                <span>{isEn ? c.labelEn : c.labelRu}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#F5F5F7] text-[#86868B]'
                  }`}
                >
                  {c.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-3 mb-12">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-black/[0.06]">
              <span className="text-4xl block mb-3">🔍</span>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-1">
                {isEn ? 'No questions found' : 'По вашему запросу ничего не найдено'}
              </h3>
              <p className="text-xs text-[#6E6E73] mb-4">
                {isEn
                  ? 'Try searching with different keywords or reset filter'
                  : 'Попробуйте изменить поисковую фразу или сбросить фильтр'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
                className="px-4 py-2 rounded-full bg-[#1D1D1F] text-white text-xs font-bold"
              >
                {isEn ? 'Reset Search' : 'Сбросить поиск'}
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = !!openIds[item.id]
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-[#FAFAFB] transition-colors"
                  >
                    <div className="space-y-1.5 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F5F7] text-[#86868B]">
                          {isEn ? item.categoryLabelEn : item.categoryLabelRu}
                        </span>
                        {item.highlight && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#E8FAF0] text-[#248A3D] border border-[#34C759]/20">
                            {item.highlight}
                          </span>
                        )}
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F] leading-snug">
                        {isEn ? item.questionEn : item.questionRu}
                      </h2>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full bg-[#F5F5F7] flex items-center justify-center shrink-0 text-xs font-bold text-[#6E6E73] transition-transform duration-200 mt-1 ${
                        isOpen ? 'rotate-180 bg-[#1D1D1F] text-white' : ''
                      }`}
                    >
                      ↓
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 text-sm sm:text-base text-[#48484A] leading-relaxed border-t border-black/[0.04]">
                      {isEn ? item.answerEn : item.answerRu}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Quick Links Banner to Guide & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Link
            href="/guide"
            className="p-6 rounded-3xl bg-white border border-black/[0.06] hover:border-[#0071E3]/40 shadow-xs transition-all group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EBF5FF] border border-[#0071E3]/20 flex items-center justify-center text-2xl shrink-0">
              🚦
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0071E3] block mb-1">
                {isEn ? 'Road Guide & Fines' : 'Памятка водителю'}
              </span>
              <h3 className="text-base font-extrabold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors mb-1">
                {isEn ? 'Speed Cameras, Tolerance & Police Rules' : 'ПДД, камеры скорости и проверка штрафов'}
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'All details on section speed checks, original physical license law, alcohol 0.3‰, and protocols.ge.'
                  : 'Подробный разбор секционных камер, порога +15 км/ч, требования оригинала прав и проверки на protocols.ge.'}
              </p>
            </div>
          </Link>

          <Link
            href="/terms"
            className="p-6 rounded-3xl bg-white border border-black/[0.06] hover:border-[#34C759]/40 shadow-xs transition-all group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E8FAF0] border border-[#34C759]/20 flex items-center justify-center text-2xl shrink-0">
              📋
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#34C759] block mb-1">
                {isEn ? 'Terms & Contract' : 'Условия проката'}
              </span>
              <h3 className="text-base font-extrabold text-[#1D1D1F] group-hover:text-[#34C759] transition-colors mb-1">
                {isEn ? 'Full Rental Contract & Franchise Tiers' : 'Официальные условия, КАСКО и тарифы'}
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Complete transparency on insurance conditions, driving experience, and hourly delay policies.'
                  : 'Полные правила страхования, условия для водителей со стажем менее 2 лет и почасовые тарифы.'}
              </p>
            </div>
          </Link>
        </div>

        {/* Direct Ask Manager CTA Card */}
        <div className="bg-[#1D1D1F] text-white p-8 sm:p-10 rounded-3xl text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#34C759] uppercase tracking-wider block">
              {isEn ? 'Still Have Questions?' : 'Остались вопросы?'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isEn ? 'We are online in Telegram and WhatsApp' : 'Ответим лично за 2 минуты в мессенджере'}
            </h2>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed mb-6">
              {isEn
                ? 'Send us a message with your dates and questions — we will assist with choosing the right car and route recommendations.'
                : 'Напишите нам даты и маршрут — поможем выбрать подходящую машину, подскажем состояние горных дорог и забронируем без предоплаты.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/995591050752?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D1%82%D1%8C%20%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%20%D0%BF%D0%BE%20%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%20%D0%B0%D0%B2%D1%82%D0%BE"
                target="_blank"
                rel="noreferrer"
                className="h-11 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
              >
                <span>WhatsApp</span>
              </a>
              <a
                href="https://t.me/rentcarvasilii"
                target="_blank"
                rel="noreferrer"
                className="h-11 px-6 rounded-full bg-[#0088CC] hover:bg-[#0077b5] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
              >
                <span>Telegram</span>
              </a>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                className="h-11 px-6 rounded-full bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <span>📞 {PHONE_NUMBER}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
