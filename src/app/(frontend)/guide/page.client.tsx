'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useApp, PHONE_NUMBER, EMERGENCY_PHONE, EMERGENCY_WHATSAPP } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export default function GuidePageClient() {
  const { lang } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru
  const isEn = lang !== 'ru'

  const [activeTab, setActiveTab] = useState<'all' | 'cameras' | 'speed' | 'parking' | 'roads'>('all')

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-20 text-[#1D1D1F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#86868B] mb-6">
          <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
            {t.brandName || 'VASILII RENT'}
          </Link>
          <span>/</span>
          <span className="text-[#1D1D1F]">{isEn ? 'Driving Guide' : 'Памятка водителю'}</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-bold text-[#1D1D1F] shadow-xs mb-4">
            <span>💡</span> {isEn ? 'Practical Driving & Road Guide' : 'Честный гид по дорогам Грузии'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight mb-4">
            {isEn
              ? 'Driving in Georgia: Fines, Cameras & Practical Tips'
              : 'Памятка водителю: ПДД, камеры и штрафы в Грузии'}
          </h1>
          <p className="text-base sm:text-lg text-[#6E6E73] leading-relaxed">
            {isEn
              ? 'Essential driving knowledge for tourists: physical license rules, section speed cameras, non-penalized tolerance +15 km/h, avoiding cascading fines, parking apps, and mountain road safety.'
              : 'Всё, что важно знать туристу за рулем: строгие требования к оригиналу прав, как работают секционные камеры, нештрафуемый порог +15 км/ч, как не получить 3–4 штрафа за 5 минут, парковки и правила в горах.'}
          </p>
        </div>

        {/* Quick Jump Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <a
            href="#license-original"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FFEBEA] hover:border-[#FF3B30]/30 border border-black/[0.08] text-xs font-bold text-[#FF3B30] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>🪪</span> {isEn ? 'Physical License (Risk ~1500 ₾)' : 'Оригинал прав (риск 1500 ₾)'}
          </a>
          <a
            href="#section-control"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FFEBEA] hover:border-[#FF3B30]/30 border border-black/[0.08] text-xs font-bold text-[#FF3B30] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>⚠️</span> {isEn ? 'Section Cameras Risk' : 'Секционные камеры (риск 3–4 штрафов)'}
          </a>
          <a
            href="#speed-limits"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>🎯</span> {isEn ? 'Speed Tolerance (+15 km/h)' : 'Лимит скорости (+15 км/ч)'}
          </a>
          <a
            href="#protocols-check"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>🔍</span> {isEn ? 'Check Fines (protocols.ge)' : 'Проверка штрафов (protocols.ge)'}
          </a>
          <a
            href="#animals-mountains"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>🐄</span> {isEn ? 'Cows & Mountain Passes' : 'Коровы и серпантины'}
          </a>
          <a
            href="#parking"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>🅿️</span> {isEn ? 'City Parking' : 'Парковка в городах'}
          </a>
          <a
            href="#fuel"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>⛽</span> {isEn ? 'Fuel & Gas Stations' : 'Топливо и АЗС'}
          </a>
        </div>

        {/* ========================================================
            CARD 1: CRITICAL ALERT — SECTION SPEED CONTROL CAMERAS
           ======================================================== */}
        <section
          id="section-control"
          className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#FF3B30]/30 shadow-lg mb-8 relative overflow-hidden scroll-mt-24"
        >
          <div className="absolute top-0 right-0 bg-[#FF3B30] text-white text-[11px] font-extrabold uppercase px-4 py-1.5 rounded-bl-2xl tracking-wider">
            {isEn ? 'CRITICAL TOURIST TRAP' : 'ГЛАВНАЯ ЛОВУШКА ДЛЯ ТУРИСТОВ'}
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF5F5] border border-[#FF3B30]/20 flex items-center justify-center text-2xl shrink-0">
              📸
            </div>
            <div>
              <span className="text-xs font-bold text-[#FF3B30] uppercase tracking-wider block mb-1">
                {isEn ? 'Section Speed Control (Average Speed)' : 'Секционный контроль средней скорости'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn
                  ? 'Average Speed Cameras: Danger of 3–4 Fines in 5 Minutes'
                  : 'Камеры средней скорости: риск получить 3–4 штрафа за 5–7 минут'}
              </h2>
            </div>
          </div>

          <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 rounded-2xl p-5 sm:p-6 mb-6">
            <p className="text-sm sm:text-base font-semibold text-[#1D1D1F] leading-relaxed mb-3">
              {isEn ? (
                <>
                  <strong className="text-[#FF3B30]">How it works:</strong> Georgia uses extensive <em>Section Control</em> systems on highways. Cameras do NOT just record your speed at a single point. Camera A records entry time, and Camera B records exit time. The system calculates your <strong>average speed</strong> across the entire sector (typically 2 to 6 km).
                </>
              ) : (
                <>
                  <strong className="text-[#FF3B30]">Как это устроено:</strong> На трассах Грузии камеры контроля скорости работают не только точечно, а целыми <strong>секциями (Section Control)</strong>. Камера на въезде в сектор фиксирует время въезда, а камера на выезде — время выезда. Система делит расстояние на время и вычисляет вашу <strong>среднюю скорость</strong> на отрезке в 2–6 км.
                </>
              )}
            </p>
            <p className="text-sm sm:text-base font-bold text-[#FF3B30] leading-relaxed">
              {isEn
                ? '⚡ Cascading fines: These sectors are often chained back-to-back without gaps! If you cruise with excessive speed, you will trigger multiple sectors in a row, receiving 3–4 separate fines (50–100 GEL each) within just 5 to 7 minutes of driving!'
                : '⚡ Каскадные штрафы: Такие сектора часто установлены цепочкой друг за другом без перерывов! Если ехать быстрее разрешенного, вы нарушите правила на каждом отрезке пути и получите 3–4 штрафа подряд (по 50–100 лари каждый) всего за 5–7 минут быстрой езды!'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>🛑</span> {isEn ? 'Why braking before the camera fails' : 'Почему сброс скорости у столба не помогает'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Many drivers slow down right under the camera pole and immediately accelerate again. For section cameras, this is useless: the system calculates your average travel time across the whole several-kilometer distance.'
                  : 'Многие по привычке резко тормозят прямо перед камерой, а проехав ее, снова жмут на газ. При секционном контроле это не спасает: важна средняя скорость на всем 3–5 километровом отрезке.'}
              </p>
            </div>
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>📍</span> {isEn ? 'High-risk road stretches' : 'Где секций особенно много'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Highway Tbilisi — Batumi: Khashuri bypass, Zestafoni bypass, Kutaisi bypass, Kobuleti bypass, and access routes near tunnels. Navigators (Waze, Yandex) frequently miss recently installed sectors.'
                  : 'Автобан Тбилиси — Батуми: объездные Хашури, Зестафони, Кутаисский обход, объездная Кобулети и подъезды к туннелям. Навигаторы часто не успевают за новыми камерами МВД.'}
              </p>
            </div>
          </div>

          {/* Actionable Advice */}
          <div className="bg-[#1D1D1F] text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#34C759] uppercase tracking-wider block mb-1">
                {isEn ? 'Best Practice' : 'Золотое правило от VASILII RENT'}
              </span>
              <p className="text-xs sm:text-sm text-[#D2D2D7]">
                {isEn
                  ? 'Turn on Cruise Control at the speed limit (+10 km/h margin) and relax. You save money and travel safely.'
                  : 'Включайте круиз-контроль на разрешенную скорость со спокойным запасом (+10 км/ч к знаку) и наслаждайтесь видами.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 2: CRITICAL — ORIGINAL PHYSICAL DRIVER'S LICENSE ONLY
           ======================================================== */}
        <section
          id="license-original"
          className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#FF3B30]/30 shadow-lg mb-8 relative overflow-hidden scroll-mt-24"
        >
          <div className="absolute top-0 right-0 bg-[#FF3B30] text-white text-[11px] font-extrabold uppercase px-4 py-1.5 rounded-bl-2xl tracking-wider">
            {isEn ? 'STRICT POLICE RULE' : 'СТРОГОЕ ТРЕБОВАНИЕ ПОЛИЦИИ'}
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF5F5] border border-[#FF3B30]/20 flex items-center justify-center text-2xl shrink-0">
              🪪
            </div>
            <div>
              <span className="text-xs font-bold text-[#FF3B30] uppercase tracking-wider block mb-1">
                {isEn ? 'Foreign Drivers Warning' : 'Водительские права для иностранцев в Грузии'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn
                  ? 'Strictly Physical Original License (No photos or apps!)'
                  : 'Строго физический оригинал прав: фото и Госуслуги не действуют'}
              </h2>
            </div>
          </div>

          <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 rounded-2xl p-5 sm:p-6 mb-6">
            <p className="text-sm sm:text-base font-semibold text-[#1D1D1F] leading-relaxed mb-3">
              {isEn ? (
                <>
                  <strong className="text-[#FF3B30]">No electronic licenses accepted:</strong> The Georgian Patrol Police <strong>categorically rejects</strong> photos of driver’s licenses on smartphones, screenshots, electronic documents in applications like Gosuslugi, Diia, eGov, etc. Foreign tourists must have their <strong>physical original license (plastic card or paper document)</strong> physically present.
                </>
              ) : (
                <>
                  <strong className="text-[#FF3B30]">Электронные права и фото не принимаются:</strong> Патрульная полиция Грузии <strong>категорически не принимает</strong> у иностранных граждан водительские удостоверения в виде фото на телефоне, скриншотов или электронных документов в приложениях «Госуслуги», «Дія», eGov и их аналогов. При себе обязан быть исключительно <strong>физический оригинал (пластик/бумага)</strong>!
                </>
              )}
            </p>
            <p className="text-sm sm:text-base font-bold text-[#FF3B30] leading-relaxed">
              {isEn
                ? '⚡ Financial risk ~1,500 GEL + vehicle impound: Driving without the physical document leads to severe penalties (~1,500 GEL total with towing/impound), and the police have the authority to leave you on the roadside and tow the car away.'
                : '⚡ Общая сумма штрафов плюс возможная эвакуация составят около 1 500 лари! Кроме того, патруль имеет право высадить вас прямо посреди трассы и увезти автомобиль на штрафстоянку.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>👥</span> {isEn ? 'Passenger with an original license saves the car' : 'Если рядом пассажир с нормальными правами'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'If another person in the car has an original physical license, the vehicle will NOT be impounded or towed — police will permit handing over the steering wheel so you can continue your journey. However, the unlicensed driver will still receive the fine.'
                  : 'Если рядом с вами в автомобиле находится спутник с нормальными физическими правами, машину на штрафстоянку НЕ заберут — руль разрешат передать ему, и вы сможете продолжить поездку. Но водителя без оригинала прав при этом всё равно оштрафуют.'}
              </p>
            </div>

            <div className="bg-[#E8FAF0] p-5 rounded-2xl border border-[#34C759]/20">
              <h3 className="text-sm font-bold text-[#248A3D] mb-2 flex items-center gap-2">
                <span>💡</span> {isEn ? 'Lifesaver: 10 days to cancel fines!' : 'Главный лайфхак: 10 дней на аннулирование штрафа!'}
              </h3>
              <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed">
                {isEn
                  ? 'You have 10 days! If the driver presents the original physical driving license at a Georgian police precinct within 10 days of the stop (for example, if you left it at the hotel and bring it in), the issued fines can be officially cancelled.'
                  : 'У вас есть 10 дней! Если в течение 10 дней с момента составления протокола водитель обратится в отделение патрульной полиции с оригиналом своих прав (например, забыли в гостинице или вам оперативно передали документ), выписанные штрафы могут быть официально аннулированы.'}
              </p>
            </div>
          </div>

          <div className="bg-[#1D1D1F] text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#34C759] uppercase tracking-wider block mb-1">
                {isEn ? 'Rule of Thumb' : 'Золотое правило туриста'}
              </span>
              <p className="text-xs sm:text-sm text-[#D2D2D7]">
                {isEn
                  ? 'Never leave your physical driver’s license in the hotel safe or luggage. Always keep it on you alongside your passport.'
                  : 'Никогда не оставляйте пластиковое водительское удостоверение в номере отеля или чемодане. Всегда держите оригинал при себе рядом с паспортом.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 3: SPEED LIMIT TOLERANCE (+15 KM/H)
           ======================================================== */}
        <section
          id="speed-limits"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.06] shadow-sm mb-8 scroll-mt-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF5FF] border border-[#0071E3]/20 flex items-center justify-center text-2xl shrink-0">
              🎯
            </div>
            <div>
              <span className="text-xs font-bold text-[#0071E3] uppercase tracking-wider block mb-1">
                {isEn ? 'Speed Limits & Threshold' : 'Скоростной режим и нештрафуемый порог'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn ? 'Non-Penalized Speed Tolerance: +15 km/h' : 'Нештрафуемый лимит скорости: строго +15 км/ч'}
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed mb-6">
            {isEn
              ? 'In Georgia, the non-penalized speed tolerance is +15 km/h above the posted sign. Any speed at +15 km/h or higher triggers an automatic video fine (usually 50 GEL). Notice: unlike Russia (+20 km/h), in Georgia exceeding by 15 km/h already incurs a fine!'
              : 'В Грузии нештрафуемый порог превышения составляет ровно +15 км/ч к знаку. Начиная с +15 км/ч и выше автоматически выписывается штраф (стандартно 50 лари). Обратите внимание: в отличие от РФ (+20 км/ч), в Грузии превышение на 15 км/ч уже штрафуется!'}
          </p>

          {/* Interactive Visual Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* City */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04] text-center">
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">
                {isEn ? 'City & Villages' : 'Населенный пункт'}
              </span>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#FF3B30] bg-white text-xl font-extrabold text-[#1D1D1F] mb-3">
                60
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-[#34C759] font-bold">
                  {isEn ? 'Up to 74 km/h: 0 ₾ (No fine)' : 'До 74 км/ч: 0 ₾ (без штрафа)'}
                </p>
                <p className="text-[#FF3B30] font-bold">
                  {isEn ? 'From 75 km/h: 50 ₾ fine' : 'С 75 км/ч: штраф 50 ₾'}
                </p>
              </div>
            </div>

            {/* Highway / Intercity */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04] text-center">
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">
                {isEn ? 'Intercity Roads' : 'Загородные трассы'}
              </span>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#FF3B30] bg-white text-xl font-extrabold text-[#1D1D1F] mb-3">
                90
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-[#34C759] font-bold">
                  {isEn ? 'Up to 104 km/h: 0 ₾ (No fine)' : 'До 104 км/ч: 0 ₾ (без штрафа)'}
                </p>
                <p className="text-[#FF3B30] font-bold">
                  {isEn ? 'From 105 km/h: 50 ₾ fine' : 'со 105 км/ч: штраф 50 ₾'}
                </p>
              </div>
            </div>

            {/* Autobahn */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04] text-center">
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">
                {isEn ? 'Motorway (Autobahn)' : 'Автомагистраль'}
              </span>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#FF3B30] bg-white text-xl font-extrabold text-[#1D1D1F] mb-3">
                110
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-[#34C759] font-bold">
                  {isEn ? 'Up to 124 km/h: 0 ₾ (No fine)' : 'До 124 км/ч: 0 ₾ (без штрафа)'}
                </p>
                <p className="text-[#FF3B30] font-bold">
                  {isEn ? 'From 125 km/h: 50 ₾ fine' : 'со 125 км/ч: штраф 50 ₾'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04] space-y-2 text-xs sm:text-sm text-[#48484A]">
            <p className="flex items-start gap-2">
              <span className="text-[#FF9500] font-bold">⚠️</span>
              <span>
                <strong>{isEn ? 'Excess > 40 km/h:' : 'Превышение более чем на +40 км/ч:'}</strong>{' '}
                {isEn ? 'Fine of 150 GEL.' : 'Штраф 150 лари.'}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#FF3B30] font-bold">🚨</span>
              <span>
                <strong>{isEn ? 'Dangerous situation:' : 'Создание аварийной обстановки:'}</strong>{' '}
                {isEn ? 'Fine of 250 GEL.' : 'Штраф 250 лари.'}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#0071E3] font-bold">💡</span>
              <span>
                <strong>{isEn ? 'Speedometer tip:' : 'Погрешность спидометра:'}</strong>{' '}
                {isEn
                  ? 'Vehicle speedometers show 2–3 km/h higher than true GPS speed. Setting cruise control to 70 km/h in 60 zones or 100 km/h in 90 zones gives complete peace of mind.'
                  : 'Спидометры автомобилей завышают скорость на 2–3 км/ч. Движение со скоростью 70 км/ч при знаке 60 или 100 км/ч при знаке 90 абсолютно безопасно и гарантирует отсутствие штрафов.'}
              </span>
            </p>
          </div>
        </section>

        {/* ========================================================
            CARD 4: HOW TO CHECK FINES (PROTOCOLS.GE & 20% DISCOUNT)
           ======================================================== */}
        <section
          id="protocols-check"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.06] shadow-sm mb-8 scroll-mt-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#E8FAF0] border border-[#34C759]/20 flex items-center justify-center text-2xl shrink-0">
              🔍
            </div>
            <div>
              <span className="text-xs font-bold text-[#34C759] uppercase tracking-wider block mb-1">
                {isEn ? 'Best Portal for Protocols & 20% Discount' : 'Лучший сервис проверки и скидка 20%'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn ? 'Checking Fines: protocols.ge' : 'Проверка штрафов на сайте protocols.ge'}
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed mb-6">
            {isEn
              ? 'In Georgia, the fastest and most convenient portal to check administrative protocols and video fines is protocols.ge. It directly connects to the Ministry of Internal Affairs database, showing all protocols, photographic evidence, exact timestamps, and payment amounts with discount.'
              : 'В Грузии удобнее и быстрее всего проверять видеоштрафы и протоколы патрульной полиции на специализированном государственном портале protocols.ge (также база доступна на police.ge). Здесь собраны все активные протоколы с фотографиями фиксации, временем, местом и расчетом суммы.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <span className="w-7 h-7 rounded-full bg-[#1D1D1F] text-white text-xs font-bold flex items-center justify-center mb-3">
                1
              </span>
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-1">
                {isEn ? 'Open protocols.ge' : 'Зайдите на protocols.ge'}
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Open the specialized official portal protocols.ge (or police.ge). The interface is fast, clear, and available in Georgian and English.'
                  : 'Перейдите на официальный сервис protocols.ge. Сайт работает быстро и адаптирован для моментального поиска по номеру.'}
              </p>
            </div>

            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <span className="w-7 h-7 rounded-full bg-[#1D1D1F] text-white text-xs font-bold flex items-center justify-center mb-3">
                2
              </span>
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-1">
                {isEn ? 'Enter Plate & Tech Pass' : 'Введите госномер и техпаспорт'}
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Input the vehicle plate number and the technical passport / registration certificate (provided by us in WhatsApp upon rental pickup).'
                  : 'Введите номер автомобиля и номер техпаспорта (фото техпаспорта мы сразу отправляем вам в WhatsApp при выдаче автомобиля).'}
              </p>
            </div>

            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <span className="w-7 h-7 rounded-full bg-[#34C759] text-white text-xs font-bold flex items-center justify-center mb-3">
                %
              </span>
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-1">
                {isEn ? '20% Discount within 30 days' : 'Скидка 20% в первые 30 дней'}
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Paying within 30 days grants an automatic 20% government discount (e.g., 50 GEL becomes 40 GEL). Payment can be completed directly online.'
                  : 'При оплате штрафа в течение первых 30 дней государство дает 20% скидку (например, штраф 50 лари оплачивается как 40 лари)!'}
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#1D1D1F] block mb-1">
                {isEn ? '🤝 Zero markup policy at VASILII RENT' : '🤝 В автопрокате VASILII RENT никаких комиссий'}
              </span>
              <p className="text-xs text-[#6E6E73]">
                {isEn
                  ? 'We never add processing surcharges for fines. You pay the exact official sum with the 20% discount directly on protocols.ge or via your bank.'
                  : 'Мы не берем комиссий за обработку штрафов. Вы можете оплатить точную сумму со скидкой 20% прямо на protocols.ge или через банковское приложение.'}
              </p>
            </div>
            <a
              href="https://protocols.ge"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1D1D1F] text-white hover:bg-black text-xs font-bold shrink-0 transition-transform active:scale-95 shadow-sm"
            >
              {isEn ? 'Open protocols.ge ↗' : 'Перейти на protocols.ge ↗'}
            </a>
          </div>
        </section>

        {/* ========================================================
            CARD 4: ANIMALS & MOUNTAIN ROADS
           ======================================================== */}
        <section
          id="animals-mountains"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.06] shadow-sm mb-8 scroll-mt-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] border border-[#F59E0B]/20 flex items-center justify-center text-2xl shrink-0">
              🐄
            </div>
            <div>
              <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider block mb-1">
                {isEn ? 'Road Reality: Livestock & Passes' : 'Специфика дорог: коровы, перевалы и туннели'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn
                  ? 'Livestock on Roads, Tunnels & Serpentine Safety'
                  : 'Коровы на трассе, свет в туннелях и горные перевалы'}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {/* Cows / Animals */}
            <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>🐂</span> {isEn ? 'Cows on highways & turns' : 'Коровы и домашний скот на скоростных трассах'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-2">
                {isEn
                  ? 'In Georgia, cows, horses, and dogs freely wander across highways, especially around Khashuri, Surami, Kakheti, Svaneti, and Adjara. They frequently lie down directly on warm asphalt.'
                  : 'В Грузии коровы, лошади и собаки свободно гуляют вдоль и поперек трасс — особенно в районе Хашури, Сурами, в Кахетии, Сванетии и горных районах Аджарии. Они нередко отдыхают прямо на теплом асфальте.'}
              </p>
              <p className="text-xs text-[#FF3B30] font-semibold">
                {isEn
                  ? '⚠️ Cows do not fear cars or horns! Honking is useless. Slow down before blind curves and carefully bypass them.'
                  : '⚠️ Коровы не боятся машин и не реагируют на звуковой сигнал (клаксон)! Сигналить бессмысленно: снизьте скорость заранее и аккуратно объезжайте.'}
              </p>
            </div>

            {/* Tunnels & Lights */}
            <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>💡</span> {isEn ? 'Mandatory headlights in tunnels' : 'Обязательный ближний свет в туннелях'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Georgia has numerous long tunnels (Rikoti pass, Military Georgian Road). Driving without low-beam headlights in tunnels is strictly prohibited and captured by automatic cameras at tunnel portals.'
                  : 'В Грузии много туннелей (Рикотский перевал, Военно-Грузинская дорога и др.). Включение ближнего света фар в туннелях строго обязательно! Камеры на въездах и выездах из туннелей автоматически штрафуют за выключенный свет.'}
              </p>
            </div>

            {/* Engine Braking in Mountains */}
            <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>⛰️</span> {isEn ? 'Engine braking on long descents' : 'Торможение двигателем на затяжных спусках'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'On steep mountain descents (Gudauri, Kazbegi, Mestia, Goderdzi), do not ride your brakes continuously! Shift transmission to Manual (M), Low (L/2), or Brake mode (B on hybrids) to brake with the engine and avoid overheating brake pads.'
                  : 'На крутых спусках с перевалов (Гудаури, Казбеги, Местия, Годердзи) не держите тормоз непрерывно! Переключайте селектор коробки в ручной режим (M), пониженную (2 / L) или режим рекуперации (B на гибридах), чтобы тормозить мотором и не перегреть тормозные колодки.'}
              </p>
            </div>

            {/* Solid Line Overpass */}
            <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>⛔</span> {isEn ? 'Solid line overtake ban' : 'Запрет пересечения сплошной линии'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Crossing single or double solid lines to overtake is strictly forbidden and heavily fined (from 100 GEL). Never overtake on blind turns on mountain serpentines.'
                  : 'Пересечение сплошной линии для обгона строго наказывается полицией (штраф от 100 лари, лишение прав при повторе). Никогда не выходите на обгон в закрытых поворотах серпантинов.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 5: PARKING IN CITIES
           ======================================================== */}
        <section
          id="parking"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.06] shadow-sm mb-8 scroll-mt-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F5FF] border border-[#0071E3]/20 flex items-center justify-center text-2xl shrink-0">
              🅿️
            </div>
            <div>
              <span className="text-xs font-bold text-[#0071E3] uppercase tracking-wider block mb-1">
                {isEn ? 'Municipal Parking Rules' : 'Правила парковки в городах'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn ? 'Parking in Batumi, Tbilisi & Kutaisi' : 'Парковка в Батуми, Тбилиси и Кутаиси'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Batumi Parking */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>🌊</span> {isEn ? 'Batumi Parking' : 'Парковка в Батуми'}
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed mb-3">
                {isEn
                  ? 'Most street parking spaces marked with white lines in Batumi are municipal paid parking. Prices are very low: ~1 GEL/day, 10 GEL/week, 20 GEL/month.'
                  : 'Почти все размеченные карманы вдоль улиц в центре Батуми относятся к муниципальной платной парковке. Стоимость очень демократичная: 1 ₾ в день, 10 ₾ на неделю, 20 ₾ на месяц.'}
              </p>
              <div className="text-xs text-[#1D1D1F] font-semibold bg-white p-3 rounded-xl border border-black/[0.06]">
                {isEn
                  ? 'Payment: via PayBox terminals (Batumi Parking / BPM section) or TBC/BoG banking apps.'
                  : 'Как оплатить: в терминалах PayBox (раздел «Парковка Батуми» / BPM) или в приложениях TBC и Bank of Georgia.'}
              </div>
            </div>

            {/* Tbilisi Parking */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>🏛️</span> {isEn ? 'Tbilisi Parking' : 'Парковка в Тбилиси'}
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed mb-3">
                {isEn
                  ? 'Tbilisi uses zonal hourly parking (Zones A, B, C) in the historic center and central avenues, costing 1 to 3 GEL per hour via the Tbilisi Parking mobile app.'
                  : 'В центре Тбилиси действует зональная почасовая парковка (зоны A, B, C) стоимостью 1–3 лари в час через мобильное приложение Tbilisi Parking.'}
              </p>
              <div className="text-xs text-[#1D1D1F] font-semibold bg-white p-3 rounded-xl border border-black/[0.06]">
                {isEn
                  ? 'Outside central hourly zones, standard municipal subscription parking applies.'
                  : 'За пределами центральных почасовых зон действует стандартный муниципальный абонемент.'}
              </div>
            </div>
          </div>

          {/* Tow Truck Warning */}
          <div className="bg-[#FFF5F5] border border-[#FF3B30]/25 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-[#FF3B30] mb-2 flex items-center gap-2">
              <span>🚨</span> {isEn ? 'Immediate Towing Warning' : 'Внимание: моментальная эвакуация на штрафстоянку'}
            </h3>
            <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed mb-2">
              {isEn
                ? 'Never park in disabled spots (blue signage with wheelchair icon) or dedicated bus lanes (BUS LANE / yellow zigzag lines). Municipal tow trucks in Tbilisi and Batumi take vehicles within 3–5 minutes!'
                : 'Никогда не паркуйтесь на местах для инвалидов (синяя разметка с пиктограммой коляски) и на автобусных полосах (BUS LANE / желтая зигзагообразная разметка). Эвакуаторы в Батуми и Тбилиси работают молниеносно — машину увозят за 3–5 минут!'}
            </p>
            <p className="text-xs text-[#FF3B30] font-bold">
              {isEn
                ? 'Towing fee + penalty starts from 150 GEL, plus time wasted recovering the vehicle.'
                : 'Штраф за эвакуатор и стоянку начинается от 150 лари плюс потерянные полдня на возврат машины.'}
            </p>
          </div>
        </section>

        {/* ========================================================
            CARD 6: FUEL & GAS STATIONS
           ======================================================== */}
        <section
          id="fuel"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.06] shadow-sm mb-8 scroll-mt-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] border border-[#22C55E]/20 flex items-center justify-center text-2xl shrink-0">
              ⛽
            </div>
            <div>
              <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider block mb-1">
                {isEn ? 'Fuel & Branded Stations' : 'Топливо и проверенные заправки'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn ? 'Which Fuel to Use & Where to Refuel' : 'Какой бензин заливать и где заправляться'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>🛢️</span> {isEn ? 'Recommended Fuel' : 'Рекомендуемое топливо'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-3">
                {isEn
                  ? '95% of our rental fleet (including Toyota hybrids, Ford, Lexus) operates on 95 Premium (Euro 5). Specific 4x4 SUVs also accept 92 Regular.'
                  : 'Для 95% автомобилей нашего автопарка (включая гибриды Toyota, Ford, Lexus) подходит качественный бензин 95 Premium (Евро-5). Некоторые внедорожники могут заправляться 92 Regular.'}
              </p>
              <div className="text-xs font-semibold text-[#1D1D1F] bg-white p-3 rounded-xl border border-black/[0.06]">
                {isEn
                  ? 'A fuel sticker is always placed on the fuel flap of your car.'
                  : 'На лючке бензобака каждого авто наклеена подсказка с точным типом бензина.'}
              </div>
            </div>

            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>🏪</span> {isEn ? 'Trusted Fuel Chains' : 'Проверенные брендовые АЗС'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-3">
                {isEn
                  ? 'Stick to reliable international & major chains with clean fuel: Gulf, Wissol, Rompetrol, Socar, Lukoil. Avoid unbranded small pumps in mountain villages.'
                  : 'Заправляйтесь на крупных сетевых станциях с гарантированным качеством: Gulf, Wissol, Rompetrol, Socar, Lukoil. Избегайте безымянных колонок в высокогорных селах.'}
              </p>
              <div className="text-xs font-semibold text-[#1D1D1F] bg-white p-3 rounded-xl border border-black/[0.06]">
                {isEn
                  ? 'Attendants pump fuel for you everywhere. Just tell them "Premium" and the amount or "Full".'
                  : 'На всех АЗС работают заправщики. Достаточно сказать «Премиум» и сумму (например «50 лари») или «Полный бак». Оплата прямо у колонки.'}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 7: ZERO ALCOHOL TOLERANCE (0.00 ‰)
           ======================================================== */}
        <section
          id="alcohol"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.06] shadow-sm mb-8 scroll-mt-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] border border-[#E11D48]/20 flex items-center justify-center text-2xl shrink-0">
              🍷
            </div>
            <div>
              <span className="text-xs font-bold text-[#E11D48] uppercase tracking-wider block mb-1">
                {isEn ? 'Zero Tolerance' : 'Абсолютный сухой закон'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn ? 'Alcohol Limit Behind the Wheel: 0.00 ‰' : 'Алкоголь за рулем: строго 0.00 ‰'}
              </h2>
            </div>
          </div>

          <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 rounded-2xl p-5 mb-4">
            <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed">
              {isEn
                ? 'Georgia maintains zero alcohol tolerance (0.00 ‰). Even a single glass of famous Georgian wine or chacha before driving leads to severe consequences: fine from 700 GEL, suspension of driving license for 6–12 months, and immediate complete voiding of all insurance coverage.'
                : 'В Грузии абсолютно нулевой допустимый порог алкоголя в крови (0.00 ‰). Даже один бокал знаменитого грузинского вина или рюмка чачи перед поездкой приведет к серьезным последствиям: штраф от 700 лари, лишение водительских прав на срок от 6 месяцев до года и полное аннулирование страховки КАСКО/ОСАГО.'}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
            {isEn
              ? 'Taxis in Georgia (Bolt, Yandex Go) are exceptionally affordable (often 3–8 GEL around town). Enjoy Georgian hospitality and wine culture safely without getting behind the wheel!'
              : 'Такси в городах Грузии (Bolt, Yandex Go) стоит очень дешево (поездка по городу обычно 3–8 лари). Наслаждайтесь грузинским гостеприимством и вином безопасно — вызовите такси!'}
          </p>
        </section>

        {/* ========================================================
            CARD 8: 24/7 SUPPORT & ASSISTANCE
           ======================================================== */}
        <section className="bg-[#1D1D1F] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-black/10 text-center sm:text-left mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#34C759] uppercase tracking-wider block mb-2">
                {isEn ? '24/7 VASILII RENT Support' : 'Круглосуточная поддержка VASILII RENT'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                {isEn ? 'Questions on the road? We are here 24/7' : 'Возник вопрос в дороге? Мы всегда на связи'}
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1A6] max-w-xl leading-relaxed">
                {isEn
                  ? 'If a fine notification arrives, a parking situation arises, or you need route advice — reach out to us directly anytime. In emergency cases: call 112 for national emergency services.'
                  : 'Если пришел штраф, возник вопрос по парковке или нужна консультация по маршруту — напишите нам в любое время. При аварии или экстренной ситуации: служба спасения 112.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={`https://wa.me/${EMERGENCY_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="h-12 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
              >
                <span>WhatsApp</span>
              </a>
              <Link
                href="/sos"
                className="h-12 px-6 rounded-full bg-[#FF3B30] hover:bg-[#E02D22] text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
              >
                <span>🚨 {isEn ? 'SOS / Accident' : 'При ДТП (SOS)'}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Return to Catalog CTA */}
        <div className="text-center pt-2">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
          >
            <span>← {isEn ? 'Back to Vehicle Fleet' : 'Вернуться к каталогу автомобилей'}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
