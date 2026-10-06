'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useApp, PHONE_NUMBER, EMERGENCY_PHONE, EMERGENCY_WHATSAPP } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export default function GuidePageClient() {
  const { lang, t } = useApp()
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
            <span>🅿️</span> {isEn ? 'Parking & Towing Rules' : 'Парковка и эвакуация'}
          </a>
          <a
            href="#fuel"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>⛽</span> {isEn ? 'Fuel & Gas Stations' : 'Топливо и АЗС'}
          </a>
          <a
            href="#patrol-control"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FFEBEA] hover:border-[#FF3B30]/30 border border-black/[0.08] text-xs font-bold text-[#FF3B30] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>📱</span> {isEn ? 'Phone, Belts & Turn Signals' : 'Телефон, ремни и поворотники'}
          </a>
          <a
            href="#alcohol"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FFEBEA] hover:border-[#FF3B30]/30 border border-black/[0.08] text-xs font-bold text-[#FF3B30] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>🍷</span> {isEn ? 'Alcohol: Limit 0.3 ‰ & Raids' : 'Алкоголь: порог 0.3 ‰ и продувки'}
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
                ? '⚡ Cascading fines: These sectors are often chained back-to-back without gaps! If you cruise with excessive speed, you will trigger multiple sectors in a row, receiving 3–4 separate fines (50–300 GEL each) within just 5 to 7 minutes of driving!'
                : '⚡ Каскадные штрафы: Такие сектора часто установлены цепочкой друг за другом без перерывов! Если ехать быстрее разрешенного, вы нарушите правила на каждом отрезке пути и получите 3–4 штрафа подряд (по 50–300 лари каждый) всего за 5–7 минут быстрой езды!'}
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
                  : 'Строго физический оригинал прав: фото и электронные права не действуют'}
              </h2>
            </div>
          </div>

          <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 rounded-2xl p-5 sm:p-6 mb-6">
            <p className="text-sm sm:text-base font-semibold text-[#1D1D1F] leading-relaxed mb-3">
              {isEn ? (
                <>
                  <strong className="text-[#FF3B30]">No digital or electronic licenses accepted:</strong> The Georgian Patrol Police <strong>categorically rejects</strong> digital driver’s licenses in government mobile applications, smartphone photos, or scans. Foreign visitors must have their <strong>physical original license (plastic card or official paper document)</strong> physically present with them.
                </>
              ) : (
                <>
                  <strong className="text-[#FF3B30]">Электронные права и фото не принимаются:</strong> Патрульная полиция Грузии <strong>категорически не принимает</strong> у иностранных граждан цифровые водительские удостоверения в государственных приложениях, фото на телефоне, сканы или скриншоты. При себе обязан быть исключительно <strong>физический оригинал документа (пластик или бумага)</strong>!
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
              ? 'In Georgia, the non-penalized speed tolerance is strictly +15 km/h above the posted sign. Any speed at +15 km/h or higher triggers an automatic video fine (from 50 to 300 GEL depending on speed excess). Notice: the non-penalized tolerance is strictly +15 km/h — exceeding by 15 km/h already triggers a fine!'
              : 'В Грузии нештрафуемый порог превышения составляет ровно +15 км/ч к знаку. Начиная с +15 км/ч и выше автоматически выписывается штраф (от 50 до 300 лари в зависимости от превышения). Обратите внимание: нештрафуемый лимит строго +15 км/ч — превышение уже на 15 км/ч наказывается штрафом!'}
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
                  {isEn ? 'From 75 km/h: fine from 50 ₾' : 'С 75 км/ч: штраф от 50 ₾'}
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
                  {isEn ? 'From 105 km/h: fine from 50 ₾' : 'со 105 км/ч: штраф от 50 ₾'}
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
                  {isEn ? 'From 125 km/h: fine from 50 ₾' : 'со 125 км/ч: штраф от 50 ₾'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04] space-y-2.5 text-xs sm:text-sm text-[#48484A]">
            <p className="flex items-start gap-2">
              <span className="text-[#FF3B30] font-bold">⚡</span>
              <span>
                <strong>{isEn ? 'Speeding fines in Georgia:' : 'Размер штрафов за превышение скорости:'}</strong>{' '}
                {isEn
                  ? 'From 50 to 300 GEL depending on how much the limit is exceeded (50 GEL for moderate speeding, up to 300 GEL for heavy speeding).'
                  : 'От 50 до 300 лари в зависимости от величины превышения (50 лари за стандартное превышение, до 300 лари при сильном превышении скорости).'}
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
              ? 'In Georgia, the fastest and most convenient portal to check administrative protocols and video fines is protocols.ge (also available via police.ge). Directly on the site, you can view the fine itself along with attached photo and video evidence, verify the exact location and timestamp, and immediately pay online with a bank card with an automatic 20% discount.'
              : 'В Грузии удобнее и быстрее всего проверять видеоштрафы и протоколы патрульной полиции на специализированном государственном портале protocols.ge (также база доступна на police.ge). Прямо на сайте можно посмотреть сам штраф, привязанные к нему фото- и видеоматериалы нарушения, точное время и место, а также сразу оплатить банковской картой со скидкой 20%.'}
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
                💳
              </span>
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-1">
                {isEn ? 'View & Pay by Card (-20%)' : 'Просмотр и оплата картой (-20%)'}
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'View the fine details, inspect the attached photo and video footage, and pay directly on the site with a bank card. During the first 10 days, an automatic 20% discount applies!'
                  : 'Смотрите сам штраф, привязанные фото- и видеоматериалы и оплачивайте прямо на сайте банковской картой. В первые 10 дней действует скидка 20% (например, 50 лари оплачивается как 40 лари)!'}
              </p>
            </div>
          </div>

          {/* Visual Diagram: Georgian Registration Certificate (Tech Passport) */}
          <div className="bg-[#F5F5F7] rounded-3xl p-6 sm:p-8 border border-black/[0.06] mb-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <span className="text-[11px] font-bold text-[#0071E3] uppercase tracking-wider block mb-0.5">
                  {isEn ? 'Visual Field Guide' : 'Наглядная схема техпаспорта'}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1D1D1F]">
                  {isEn
                    ? 'Where to find Vehicle Number & Tech Passport Number'
                    : 'Откуда брать номер машины и номер техпаспорта'}
                </h3>
              </div>
              <span className="text-xs text-[#86868B] bg-white px-3 py-1 rounded-full border border-black/[0.06] font-semibold">
                {isEn ? 'Registration Certificate' : 'Свидетельство о регистрации ТС'}
              </span>
            </div>

            {/* Authentic Processed Registration Certificate (Tech Passport) */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-black/[0.08] mb-6 bg-white p-3 sm:p-5 text-[#1D1D1F]">
              <div className="relative w-full rounded-xl overflow-hidden bg-[#F5F5F7] border border-black/[0.06]">
                <Image
                  src="/images/georgia-tech-passport-sample.png"
                  alt={isEn ? "Georgian Vehicle Registration Certificate with highlighted check fields" : "Свидетельство о регистрации ТС Грузии с выделенными полями для проверки штрафов"}
                  width={1540}
                  height={924}
                  className="w-full h-auto object-contain rounded-xl"
                  priority
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#6E6E73]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]"></span>
                  {isEn ? 'Official Georgian MIA Registration Certificate' : 'Оригинальный техпаспорт (Service Agency of MIA Georgia)'}
                </span>
                <span className="text-[11px] bg-[#F5F5F7] px-2.5 py-1 rounded-md border border-black/[0.04]">
                  🔒 {isEn ? 'Personal data blurred for privacy' : 'Персональные данные владельца надежно заблюрены'}
                </span>
              </div>
            </div>

            {/* Explanation of the two highlighted fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Field 1: Plate Number */}
              <div className="bg-white p-5 rounded-2xl border-2 border-[#FF9500]/30 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFF4E5] border border-[#FF9500]/30 text-[#FF9500] font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-sm font-bold text-[#1D1D1F]">
                    {isEn ? '1. Vehicle Plate Number (Car No.)' : '1. Номер машины (Госномер)'}
                  </h4>
                </div>
                <div className="space-y-1.5 text-xs text-[#6E6E73]">
                  <p>
                    <strong className="text-[#1D1D1F]">{isEn ? 'Where on certificate:' : 'Где в техпаспорте:'}</strong>{' '}
                    {isEn
                      ? 'Row (A) / "სარეგისტრაციო ნომერი / Registration number"'
                      : 'Строка (A) сверху / «სარეგისტრაციო ნომერი / Registration number»'}
                  </p>
                  <p>
                    <strong className="text-[#1D1D1F]">{isEn ? 'Example on card:' : 'На примере на фото:'}</strong>{' '}
                    <span className="font-mono font-bold text-[#FF9500] bg-[#FFF4E5] px-1.5 py-0.5 rounded">BO090OK</span>
                  </p>
                  <p>
                    <strong className="text-[#1D1D1F]">{isEn ? 'Field on protocols.ge:' : 'Поле на protocols.ge:'}</strong>{' '}
                    <span className="text-[#1D1D1F] font-semibold">«ავტომობილის ნომერი / Car No.»</span>
                  </p>
                </div>
              </div>

              {/* Field 2: Certificate Number */}
              <div className="bg-white p-5 rounded-2xl border-2 border-[#00C7BE]/30 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#E5FBF9] border border-[#00C7BE]/30 text-[#00A39B] font-black text-xs flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-sm font-bold text-[#1D1D1F]">
                    {isEn ? '2. Tech Passport Number' : '2. Номер техпаспорта'}
                  </h4>
                </div>
                <div className="space-y-1.5 text-xs text-[#6E6E73]">
                  <p>
                    <strong className="text-[#1D1D1F]">{isEn ? 'Where on certificate:' : 'Где в техпаспорте:'}</strong>{' '}
                    {isEn
                      ? 'Bottom-left corner above MIA issuance text'
                      : 'Левый нижний угол, прямо над текстом «მოწმობა გაცემულია...»'}
                  </p>
                  <p>
                    <strong className="text-[#1D1D1F]">{isEn ? 'Example on card:' : 'На примере на фото:'}</strong>{' '}
                    <span className="font-mono font-bold text-[#00A39B] bg-[#E5FBF9] px-1.5 py-0.5 rounded">AJA10131235</span>
                  </p>
                  <p>
                    <strong className="text-[#1D1D1F]">{isEn ? 'Field on protocols.ge:' : 'Поле на protocols.ge:'}</strong>{' '}
                    <span className="text-[#1D1D1F] font-semibold">«ტექ.პასპორტის ნომერი / Tech Passport»</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick search tip */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-black/[0.04] text-xs text-[#48484A] flex items-start gap-2.5">
              <span className="text-[#34C759] text-base shrink-0">💡</span>
              <p className="leading-relaxed">
                {isEn ? (
                  <>
                    <strong>Step-by-step on protocols.ge:</strong> Select tab <em>«Vehicle»</em> (ავტოსატრანსპორტო საშუალება) → check <em>«Without receipt no.»</em> (ქვითრის ნომრის გარეშე) → enter Car No. and Tech Passport No. → click <em>«Search» (ძებნა)</em>.
                  </>
                ) : (
                  <>
                    <strong>Как заполнять на protocols.ge:</strong> Выберите вкладку <em>«Транспортное средство» (Vehicle)</em> → переключите на <em>«Без номера квитанции» (Without receipt no.)</em> → вставьте номер машины и номер техпаспорта → нажмите кнопку <em>«Поиск» (Search / ძებნა)</em>.
                  </>
                )}
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
                {isEn ? 'Municipal Parking & Towing' : 'Правила парковки в городах'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn ? 'Parking in Batumi, Tbilisi & Strict Towing Rules' : 'Парковка в Батуми, Тбилиси и правила эвакуации'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Batumi Parking */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#1D1D1F] flex items-center gap-2">
                    <span>🌊</span> {isEn ? 'Batumi Parking' : 'Парковка в Батуми'}
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#E8FAF0] text-[#248A3D] border border-[#34C759]/20">
                    {isEn ? 'Included with Fleet' : 'Оплачена нами'}
                  </span>
                </div>
                <div className="space-y-3 text-xs text-[#48484A] leading-relaxed">
                  <p>
                    {isEn ? (
                      <>
                        <strong className="text-[#1D1D1F]">Municipal street parking is already paid:</strong> all marked street bays (white road markings) throughout Batumi are fully covered and paid by us for our entire rental fleet. You do <strong>not</strong> need to pay anything extra for municipal street parking!
                      </>
                    ) : (
                      <>
                        <strong className="text-[#1D1D1F]">Муниципальные парковки уже оплачены:</strong> все размеченные уличные карманы (белая разметка вдоль улиц) по всему Батуми для наших автомобилей <strong>уже оплачены нами</strong>. Вам дополнительно ничего оплачивать не нужно!
                      </>
                    )}
                  </p>
                  <p>
                    {isEn ? (
                      <>
                        <strong className="text-[#1D1D1F]">Private barrier-gate lots:</strong> parking areas behind boom barriers (shopping malls, private commercial lots, hotels) are paid, and drivers pay them independently on-site upon entry/exit.
                      </>
                    ) : (
                      <>
                        <strong className="text-[#1D1D1F]">Парковки со шлагбаумами:</strong> стоянки под шлагбаумами (у торговых центров, отелей или на закрытых частных территориях) являются платными — их водитель оплачивает самостоятельно при въезде или выезде.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Street Attendants Notice */}
              <div className="mt-4 p-3.5 bg-white rounded-xl border border-black/[0.06] text-xs">
                <div className="font-bold text-[#1D1D1F] mb-1 flex items-center gap-1.5">
                  <span>🪙</span> {isEn ? 'Street Parking Attendants' : 'Уличные парковщики в городе'}
                </div>
                <p className="text-[#6E6E73] leading-relaxed">
                  {isEn
                    ? 'In the city, you will often encounter street attendants (with vests/whistles) collecting cash, even on public municipal spots. While technically unofficial, a local custom has long developed not to dispute or argue with them: it is standard to give 1–2 GEL for directing you into a spot or helping you merge into traffic. It keeps things calm and saves your nerves.'
                    : 'В городе (даже на муниципальных бесплатных для вас парковках) часто стоят уличные регулировщики со свистками и собирают деньги. Формально эта деятельность не является официальной, но в городе давно сложилась традиция не спорить и не конфликтовать с ними, а дать 1–2 лари за помощь при заезде или выезде. Спорить не стоит — это обычная местная специфика, которая сохранит ваше спокойствие.'}
                </p>
              </div>
            </div>

            {/* Tbilisi Parking */}
            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
                  <span>🏛️</span> {isEn ? 'Parking in Tbilisi' : 'Парковка в Тбилиси'}
                </h3>
                <div className="space-y-3 text-xs text-[#48484A] leading-relaxed">
                  <p>
                    {isEn ? (
                      <>
                        <strong className="text-[#1D1D1F]">Tbilisi Central Hourly Zones:</strong> in the historic center and main avenues (Zones A, B, C), parking costs 1–3 GEL per hour.
                      </>
                    ) : (
                      <>
                        <strong className="text-[#1D1D1F]">Тбилиси (почасовые зоны):</strong> в историческом центре и на ключевых проспектах действует зональная почасовая оплата (зоны A, B, C: 1–3 лари в час).
                      </>
                    )}
                  </p>
                  <p>
                    {isEn ? (
                      <>
                        <strong className="text-[#1D1D1F]">Outside Hourly Zones:</strong> outside central zones in Tbilisi, standard municipal subscription rules apply.
                      </>
                    ) : (
                      <>
                        <strong className="text-[#1D1D1F]">Вне почасовых зон Тбилиси:</strong> за пределами зон A, B, C действует стандартный городской муниципальный абонемент.
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3.5 bg-white rounded-xl border border-black/[0.06] text-xs text-[#1D1D1F]">
                <div className="font-bold text-[#1D1D1F] mb-1.5 flex items-center gap-1.5">
                  <span>ℹ️</span> {isEn ? 'Important for Tourists in Tbilisi' : 'Важно для туристов в Тбилиси'}
                </div>
                <div className="text-[#6E6E73] leading-relaxed space-y-1.5">
                  <p>
                    {isEn ? (
                      <>
                        <strong className="text-[#1D1D1F]">App limitation:</strong> In the <em>Tbilisi Parking</em> app, registration is only possible if you hold a <strong>Georgian personal ID</strong>. For international tourists without a local ID, the app will not work.
                      </>
                    ) : (
                      <>
                        <strong className="text-[#1D1D1F]">Нюанс приложения:</strong> В мобильном приложении <em>Tbilisi Parking</em> можно зарегистрироваться только при наличии <strong>грузинского личного номера (ID)</strong>. Туристам без местного ID это приложение не поможет.
                      </>
                    )}
                  </p>
                  <p>
                    {isEn ? (
                      <>
                        <strong className="text-[#1D1D1F]">Website payment:</strong> You can pay online via the official municipal portal{' '}
                        <a
                          href="https://parking.tbilisi.gov.ge"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071E3] font-semibold underline hover:text-[#0051A8]"
                        >
                          parking.tbilisi.gov.ge
                        </a>
                        . The site is in Georgian, but you can easily translate it using your browser&apos;s auto-translator (Chrome or Safari). To pay, you need to enter 3 details: <strong>the parking zone number</strong> (displayed on the street parking sign), <strong>the parking duration</strong> (how long you want to park), and <strong>the vehicle plate number</strong>, then pay by bank card.
                      </>
                    ) : (
                      <>
                        <strong className="text-[#1D1D1F]">Оплата через сайт:</strong> Оплатить парковку можно онлайн на официальном портале{' '}
                        <a
                          href="https://parking.tbilisi.gov.ge"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071E3] font-semibold underline hover:text-[#0051A8]"
                        >
                          parking.tbilisi.gov.ge
                        </a>
                        . Сайт работает на грузинском языке, но страницу можно легко перевести встроенным автопереводчиком браузера (в Google Chrome, Safari или Яндекс). Для оплаты нужно указать три параметра: <strong>номер парковки</strong> (указан на знаке/табличке у дороги), <strong>время парковки</strong> (на сколько вы хотите оставить машину) и <strong>госномер автомобиля</strong>, после чего оплатить банковской картой.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kutaisi Parking Block */}
          <div className="bg-[#F5F5F7] p-5 sm:p-6 rounded-2xl border border-black/[0.04] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-bold text-[#1D1D1F] flex items-center gap-2">
                <span>🏰</span> {isEn ? 'Parking in Kutaisi' : 'Парковка в Кутаиси'}
              </h3>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#E8FAF0] text-[#248A3D] border border-[#34C759]/20">
                {isEn ? 'Mostly Free' : 'В основном бесплатно'}
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-[#48484A] leading-relaxed mb-4">
              <p>
                {isEn ? (
                  <>
                    <strong className="text-[#1D1D1F]">Easy free parking:</strong> In Kutaisi, parking is significantly more relaxed than in Tbilisi or Batumi. Along the vast majority of streets, residential neighborhoods, and near most hotels, you can easily find <strong>free parking spots</strong> without paying municipal fees.
                  </>
                ) : (
                  <>
                    <strong className="text-[#1D1D1F]">Легко найти бесплатные места:</strong> В Кутаиси ситуация с парковкой намного проще и спокойнее, чем в Тбилиси или Батуми. На подавляющем большинстве городских улиц, в кварталах и у отелей парковка <strong>абсолютно бесплатная</strong> — можно спокойно оставлять машину без оплаты.
                  </>
                )}
              </p>
              <p>
                {isEn ? (
                  <>
                    <strong className="text-[#1D1D1F]">Central paid zones & low tariffs:</strong> Municipal paid parking applies only on key central streets (around the Colchis Fountain, central square, and bazaar). Tariffs are very affordable: <strong>~2 GEL per day</strong> or <strong>~5 GEL for 1 week</strong>.
                  </>
                ) : (
                  <>
                    <strong className="text-[#1D1D1F]">Где действует платная парковка и тарифы:</strong> Платная муниципальная разметка есть только на ключевых центральных улицах (район Колхидского фонтана, центральной площади, рынка). Тарифы символические: <strong>2 ₾ в день</strong> или <strong>5 ₾ на неделю</strong>.
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Option 1: Bank app */}
              <div className="bg-white p-3.5 rounded-xl border border-black/[0.06] text-xs">
                <div className="font-bold text-[#1D1D1F] mb-1.5 flex items-center gap-1.5">
                  <span>📱</span> {isEn ? '1. Via Georgian Bank App (Day / Week Pass)' : '1. Через банковское приложение (на день или неделю)'}
                </div>
                <p className="text-[#6E6E73] leading-relaxed">
                  {isEn
                    ? 'If you have an account with Bank of Georgia or TBC Bank, open the mobile app: go to Payments → Transport / Parking → "Kutaisi Parking" (Parking Service), enter the car plate number, and pay for 1 day (2 GEL) or 1 week (5 GEL) in two clicks.'
                    : 'Если у вас есть карта грузинского банка (Bank of Georgia или TBC), откройте приложение: раздел «Платежи» → «Транспорт / Парковка» → «Kutaisi Parking» (Parking Service), введите номер машины и оплатите парковку на день (2 ₾) или на неделю (5 ₾) в пару кликов.'}
                </p>
              </div>

              {/* Option 2: PayBox terminals for tourists */}
              <div className="bg-white p-3.5 rounded-xl border border-black/[0.06] text-xs">
                <div className="font-bold text-[#1D1D1F] mb-1.5 flex items-center gap-1.5">
                  <span>🪙</span> {isEn ? '2. Street PayBox Terminals (No local bank needed)' : '2. Уличные терминалы PayBox (без местного банка)'}
                </div>
                <p className="text-[#6E6E73] leading-relaxed">
                  {isEn
                    ? 'Tourists without a local bank account can pay cash in GEL at any orange or blue PayBox / TBC Pay terminal on the street. Select "Kutaisi Parking", enter the license plate, and insert cash GEL. No Georgian ID or local account needed!'
                    : 'Если у вас нет счета в местном банке, оплатить можно наличными через любой оранжевый или синий терминал PayBox / TBC Pay на улицах города. Выберите «Парковка Кутаиси», введите номер авто и внесите наличные лари. Местный банк и грузинский ID не требуются!'}
                </p>
              </div>
            </div>
          </div>

          {/* Tow Truck Warning & Crucial Rules */}
          <div className="bg-[#FFF5F5] border-2 border-[#FF3B30]/30 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🚨</span>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#D70015]">
                  {isEn
                    ? 'Critical Warning: Immediate Towing, Impound Lots & Weekend Risk'
                    : 'Важнейшее предупреждение: эвакуация, штрафстоянка и правила парковки'}
                </h3>
                <p className="text-xs text-[#6E6E73]">
                  {isEn
                    ? 'Please read carefully to avoid major financial and time losses'
                    : 'Пожалуйста, прочитайте внимательно, чтобы избежать крупных финансовых потерь и сорванного отдыха'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              {/* Bus Stops & Disabled */}
              <div className="bg-white rounded-xl p-4 border border-[#FF3B30]/15 shadow-2xs space-y-1.5">
                <div className="text-xs font-bold text-[#D70015] flex items-center gap-1.5">
                  <span>⛔</span> {isEn ? 'Bus Stops — Highest Tow Priority' : 'Автобусные остановки — строжайший запрет'}
                </div>
                <p className="text-xs text-[#48484A] leading-relaxed">
                  {isEn
                    ? 'Never park in bus stops (BUS LANE, yellow zigzag road lines) or blue wheelchair disabled spaces. Towing services at bus stops operate with zero tolerance — vehicles are removed in 2–3 minutes flat!'
                    : 'Категорически запрещено парковаться на автобусных остановках (желтая зигзагообразная разметка, полосы BUS LANE) и на синих местах для инвалидов. На автобусных остановках эвакуаторы работают особенно жестко и молниеносно — машину увозят буквально за 2–3 минуты!'}
                </p>
              </div>

              {/* Herd Mentality Warning */}
              <div className="bg-white rounded-xl p-4 border border-[#FF3B30]/15 shadow-2xs space-y-1.5">
                <div className="text-xs font-bold text-[#D70015] flex items-center gap-1.5">
                  <span>👥</span> {isEn ? '"Everyone is parked here" is a dangerous trap!' : 'Ловушка «все стоят, и я встал»'}
                </div>
                <p className="text-xs text-[#48484A] leading-relaxed">
                  {isEn
                    ? 'If you see many cars lined up in an unauthorized area, it does NOT mean it is permitted. Tow trucks in Georgia frequently arrive in teams and tow away every single vehicle in that line one by one in a single sweep.'
                    : 'Если вы видите, что в неположенном месте припарковано много других автомобилей, это НЕ значит, что они припаркованы правильно. Эвакуаторы регулярно приезжают целой колонной и увозят сразу всех нарушителей разом за один приезд.'}
                </p>
              </div>

              {/* Weekend Impound Risk */}
              <div className="bg-white rounded-xl p-4 border border-[#FF3B30]/15 shadow-2xs space-y-1.5">
                <div className="text-xs font-bold text-[#D70015] flex items-center gap-1.5">
                  <span>⏳</span> {isEn ? 'Weekend Impound: Multi-day rental loss + costs' : 'Эвакуация на выходные — потеря времени и денег'}
                </div>
                <p className="text-xs text-[#48484A] leading-relaxed">
                  {isEn
                    ? 'If an improperly parked car is towed on Friday evening, impound facilities often do not release cars until Monday! In this scenario, you will be liable for the fine, towing/impound fees, AND all extra rental days over the weekend. Check signs carefully: properly parked cars are NEVER towed.'
                    : 'Если машина уедет на штрафстоянку в пятницу вечером, забрать её часто удается только в понедельник! В этом случае водитель попадает не только на штраф и эвакуатор, но и на оплату лишних дней аренды автомобиля за все выходные. Паркуйтесь только по правилам — правильно припаркованную машину никто никуда не увезет.'}
                </p>
              </div>

              {/* Always Stay Reachable */}
              <div className="bg-white rounded-xl p-4 border border-[#FF3B30]/15 shadow-2xs space-y-1.5">
                <div className="text-xs font-bold text-[#D70015] flex items-center gap-1.5">
                  <span>📞</span> {isEn ? 'Always stay reachable on phone & WhatsApp!' : 'Всегда оставайтесь на связи (телефон и WhatsApp)'}
                </div>
                <p className="text-xs text-[#48484A] leading-relaxed">
                  {isEn
                    ? 'Please keep your phone active! When a parked car causes a minor obstruction, police often call the vehicle owner (our rental office) asking us to contact the driver to move it. If you answer our call, the situation is resolved in 2 minutes without towing or fines. But if you are unreachable, police immediately dispatch a tow truck after unsuccessful attempts.'
                    : 'Пожалуйста, всегда будьте на связи! Когда машина кому-то мешает, полиция обычно сначала звонит владельцу (в наш прокат) и просит связаться с водителем, чтобы переставить авто. Мы сразу набираем вам. Если вы на связи — вопрос решается за 2 минуты без эвакуации и без штрафа. Но если до клиента невозможно дозвониться, после пары звонков полицейские вызывают эвакуатор на штрафстоянку.'}
                </p>
              </div>
            </div>
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
                <span>🛢️</span> {isEn ? 'Fuel Type' : 'Тип топлива'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-3">
                {isEn
                  ? 'Depending on the vehicle model, cars run on petrol (95, 98, or 100) or diesel on specific models. We never use 92 Regular. Please always confirm the exact fuel type for your car with the manager upon pickup.'
                  : 'В зависимости от модели автомобиля используется бензин (95, 98 или 100) либо дизельное топливо на отдельных машинах. Топливо 92 Regular мы нигде не используем. Точный тип топлива для вашего автомобиля обязательно уточняйте у менеджера при получении.'}
              </p>
              <div className="text-xs font-semibold text-[#1D1D1F] bg-white p-3 rounded-xl border border-black/[0.06]">
                {isEn
                  ? 'The fuel type is also indicated on the sticker inside the fuel filler flap.'
                  : 'Также напоминание с точным типом топлива наклеено на внутренней стороне лючка бензобака.'}
              </div>
            </div>

            <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-2">
                <span>🏪</span> {isEn ? 'Trusted Fuel Chains' : 'Проверенные брендовые АЗС'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-3">
                {isEn
                  ? 'Refuel only at major reliable chain stations with quality fuel: Gulf, Wissol, Rompetrol, Socar, Connect. Avoid unbranded small pumps in mountain villages.'
                  : 'Заправляйтесь на крупных сетевых станциях с гарантированным качеством: Gulf, Wissol, Rompetrol, Socar, Connect. Избегайте безымянных колонок в высокогорных селах.'}
              </p>
              <div className="text-xs font-semibold text-[#1D1D1F] bg-white p-3 rounded-xl border border-black/[0.06]">
                {isEn
                  ? 'Attendants pump fuel for you everywhere. Just tell them the fuel type and amount or "Full".'
                  : 'На всех АЗС работают заправщики. Достаточно назвать нужный вид топлива и сумму (или «Полный бак»). Оплата картой или наличными у колонки.'}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 7: PATROL SURVEILLANCE — PHONE, SEATBELTS & TURN SIGNALS
           ======================================================== */}
        <section
          id="patrol-control"
          className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#FF3B30]/25 shadow-sm mb-8 scroll-mt-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF5F5] border border-[#FF3B30]/20 flex items-center justify-center text-2xl shrink-0">
              📱
            </div>
            <div>
              <span className="text-xs font-bold text-[#FF3B30] uppercase tracking-wider block mb-1">
                {isEn ? 'Strict Patrol Enforcement' : 'Жесткий контроль патрульной полиции'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn
                  ? 'Phone in Hand, Seatbelts & Turn Signals'
                  : 'Телефон в руке, ремни безопасности и поворотники'}
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed mb-6">
            {isEn
              ? 'Georgian police patrol cars actively monitor moving traffic in cities and on highways. Officers pay extraordinary attention to three infractions that frequently catch foreign tourists by surprise:'
              : 'Экипажи патрульной полиции в Грузии ведут непрерывное наблюдение в транспортном потоке. Есть три частых нарушения, за которые патрули останавливают и штрафуют безоговорочно:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Phone */}
            <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 p-5 rounded-2xl">
              <span className="text-xs font-extrabold text-[#FF3B30] uppercase tracking-wider block mb-1">
                {isEn ? 'Fine 50 GEL' : 'Штраф 50 лари'}
              </span>
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-1.5">
                <span>📵</span> {isEn ? 'Phone in Hand' : 'Телефон в руке'}
              </h3>
              <p className="text-xs text-[#48484A] leading-relaxed">
                {isEn
                  ? 'Holding a phone while driving (even when stationary at a traffic light or in a jam) is strictly prohibited. You may only use hands-free, Bluetooth, Apple CarPlay/Android Auto, or a dash mount.'
                  : 'Патрули высматривают водителей с телефоном в руке. Запрещено не только говорить, но даже держать смартфон в руке или смотреть в навигатор на светофоре. Разрешены только громкая связь (Hands-free), CarPlay или держатель на панели.'}
              </p>
            </div>

            {/* Seatbelt */}
            <div className="bg-[#F5F5F7] border border-black/[0.04] p-5 rounded-2xl">
              <span className="text-xs font-bold text-[#FF3B30] uppercase tracking-wider block mb-1">
                {isEn ? 'Fine 50 GEL • 10 Points' : 'Штраф 50 лари • 10 баллов'}
              </span>
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-1.5">
                <span>💺</span> {isEn ? 'Seatbelt Required' : 'Ремень безопасности'}
              </h3>
              <p className="text-xs text-[#48484A] leading-relaxed">
                {isEn
                  ? 'Mandatory for both driver and front-seat passenger. Controlled by officers in unmarked/marked patrol cruisers and high-resolution overhead smart cameras.'
                  : 'Обязательно пристегиваться водителю и переднему пассажиру. Нарушение фиксируется как инспекторами патруля, так и умными камерами высокого разрешения на перекрестках.'}
              </p>
            </div>

            {/* Turn Signals */}
            <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 p-5 rounded-2xl">
              <span className="text-xs font-extrabold text-[#FF3B30] uppercase tracking-wider block mb-1">
                {isEn ? 'Fine 100 GEL • 20 Points' : 'Штраф 100 лари • 20 баллов'}
              </span>
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-2 flex items-center gap-1.5">
                <span>💡</span> {isEn ? 'Turn Signals' : 'Поворотники при маневре'}
              </h3>
              <p className="text-xs text-[#48484A] leading-relaxed">
                {isEn
                  ? 'Failure to signal before lane changes, roundabout exits, or turns. Patrol cars trailing behind in traffic immediately flash emergency lights and issue a 100 GEL ticket.'
                  : 'Перестроение, поворот или съезд с кольца без включенного указателя поворота квалифицируется как опасное маневрирование. Патрули едут сзади в потоке и моментально включают мигалки.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 8: ALCOHOL LIMIT (0.3 ‰) & POLICE BREATHALYZER RAIDS
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
                {isEn ? 'Legal Limit: 0.3 ‰ & Police Raids' : 'Статья 116 КоАП Грузии: лимит 0,3 ‰ и рейды'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                {isEn
                  ? 'Alcohol Behind the Wheel: 0.3 ‰ Limit & Breathalyzers'
                  : 'Алкоголь за рулем: допустимый лимит 0,3 ‰ и частые продувки'}
              </h2>
            </div>
          </div>

          <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 rounded-2xl p-5 mb-5">
            <h3 className="text-sm font-bold text-[#FF3B30] mb-2 flex items-center gap-2">
              <span>🚨</span> {isEn ? 'Frequent Police Breathalyzer Raids' : 'Внимание: участились массовые ночные продувки!'}
            </h3>
            <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed">
              {isEn
                ? 'Patrol police in Georgia frequently conduct massive anti-drink-driving raids. Officers block lanes and systematically test all drivers with breathalyzers — especially during evenings, weekends, on Batumi/Tbilisi seaside boulevards, near restaurant zones, and at city exits.'
                : 'Патрульная полиция Грузии в последнее время регулярно устраивает рейды с повальной проверкой на алкотестерах. Патрули перекрывают полосы и продувают всех водителей подряд — особенно по вечерам, в выходные дни, на набережных Батуми и Тбилиси, у ресторанов и на выездах из городов.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-[#E8FAF0] border border-[#34C759]/20 p-5 rounded-2xl">
              <span className="text-xs font-bold text-[#248A3D] uppercase tracking-wider block mb-1">
                {isEn ? 'Legal Tolerance' : 'Законная норма'}
              </span>
              <h4 className="text-base font-extrabold text-[#1D1D1F] mb-1">
                {isEn ? 'Up to 0.30 ‰' : 'До 0,30 промилле'}
              </h4>
              <p className="text-xs text-[#248A3D] font-semibold mb-1">
                {isEn ? '0 GEL • No penalty' : '0 ₾ • Без штрафа'}
              </p>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Up to 0.30 per mille in breath/blood is considered within the permissible physiological margin under Article 116 of the Code of Administrative Offenses.'
                  : 'Показатель до 0,3 промилле является допустимой погрешностью по ст. 116 КоАП Грузии и не считается правонарушением.'}
              </p>
            </div>

            <div className="bg-[#F5F5F7] border border-black/[0.04] p-5 rounded-2xl">
              <span className="text-xs font-bold text-[#FF9500] uppercase tracking-wider block mb-1">
                {isEn ? 'Moderate Intoxication' : 'Превышение нормы'}
              </span>
              <h4 className="text-base font-extrabold text-[#1D1D1F] mb-1">
                {isEn ? 'From 0.30 to 0.70 ‰' : 'От 0,30 до 0,70 ‰'}
              </h4>
              <p className="text-xs text-[#FF3B30] font-semibold mb-1">
                {isEn ? '6-month license suspension' : 'Лишение прав на 6 месяцев'}
              </p>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Suspension of driving privileges for 6 months (or replacement penalty), plus complete forfeiture of insurance.'
                  : 'Приостановление действия водительских прав на 6 месяцев и аннулирование страхового покрытия.'}
              </p>
            </div>

            <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 p-5 rounded-2xl">
              <span className="text-xs font-bold text-[#FF3B30] uppercase tracking-wider block mb-1">
                {isEn ? 'Heavy / Refusal' : 'Тяжелое / Отказ'}
              </span>
              <h4 className="text-base font-extrabold text-[#1D1D1F] mb-1">
                {isEn ? 'Over 0.70 ‰ or Refusal' : 'Свыше 0,70 ‰ или отказ'}
              </h4>
              <p className="text-xs text-[#FF3B30] font-bold mb-1">
                {isEn ? '1-year suspension + fine/arrest' : 'Лишение на 1 год + арест/штраф'}
              </p>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {isEn
                  ? 'Refusing the breathalyzer test automatically equates to severe intoxication (1-year license ban + up to 3,000 GEL fine or administrative arrest).'
                  : 'Отказ от продувки в алкотестер приравнивается к опьянению: лишение прав на 1 год плюс штраф до 3 000 лари или административный арест.'}
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F7] p-4 rounded-xl border border-black/[0.04] text-xs text-[#48484A] flex items-start gap-2.5">
            <span className="text-[#0071E3] text-base shrink-0">💡</span>
            <p className="leading-relaxed">
              {isEn ? (
                <>
                  <strong>Practical recommendation:</strong> 0.3 per mille is a very narrow threshold that a single glass of wine can easily exceed. In case of any alcohol-related accident, insurance (CDW/TPL) is completely voided. City taxis (Bolt, Yandex Go) cost only 3–8 GEL — don&apos;t risk your vacation!
                </>
              ) : (
                <>
                  <strong>Совет от VASILII RENT:</strong> 0,3 промилле — очень тонкая граница, которую легко превысить даже бокалом домашнего вина или чачи. При показаниях выше 0,3 ‰ страховка КАСКО полностью сгорает. Такси в городах Грузии (Bolt, Yandex Go) стоит копейки (3–8 лари) — наслаждайтесь грузинским вином и заказывайте такси!
                </>
              )}
            </p>
          </div>
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

        {/* Navigation to FAQ & Fleet */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/[0.06]">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
          >
            <span>← {isEn ? 'Back to Vehicle Fleet' : 'Вернуться к каталогу автомобилей'}</span>
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071E3] hover:underline"
          >
            <span>{isEn ? 'Frequently Asked Questions (FAQ)' : 'Часто задаваемые вопросы (FAQ)'} →</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
