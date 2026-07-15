const translations = {
  ru: {
    "nav.about": "О себе",
    "nav.experience": "Опыт",
    "nav.works": "Проекты",
    "nav.skills": "Навыки",
    "nav.contacts": "Контакты",
    "nav.resume": "Резюме (PDF)",
    "nav.downloadResume": "Скачать Резюме",

    "hero.title": "Чубаров Родион",
    "hero.subtitle": "Fullstack Developer",
    "hero.tagline1": "Веду фичи от архитектуры до production.",
    "hero.tagline2": "React / TypeScript / Node.js / NestJS.",
    "hero.tagline3": "Люблю музыку и дисциплину спорта.",
    "hero.location": "Астана, Казахстан",
    "hero.english": "English B1",
    "hero.birthdate": "12.12.2006",

    "about.title": "О себе",
    "about.text": `<strong>Fullstack-разработчик:</strong> React / TypeScript на фронте,
                Node.js / NestJS на бэке. Беру фичу на этапе идеи и довожу до production:
                архитектура, дизайн, код, багфиксы, релиз.
                <br />
                <br />
                Цифры и факты вместо слов: <br />
                • Ускорил загрузку страницы <strong>с ~15 до ~2 секунд (в ~7 раз)</strong>,
                перестроив логику получения данных. <br />
                • В одиночку провёл эпик с платёжной интеграцией (SIGX) от проектирования
                до production. <br />
                • Чинил баги, которые воспроизводились только на одной платформе: потеря
                сессии на iOS — локализовал через логирование и решил пробросом сессии
                через backend. <br />
                • Разработал 360°-viewer на WebGL / three.js и киоск-приложение на Kotlin
                с авторизацией по Face ID. <br />
                <br />
                <strong>Backend:</strong> транзакции и фоновые задачи на Redis / BullMQ /
                cron, SQL, real-time на WebSocket, решение race conditions при
                конкурентном доступе.
                <br />
                <br />
                <strong>Frontend:</strong> React, Next.js, Zustand, сложный интерактив
                вплоть до WebGL. Могу сам отрисовать макеты в Figma и собрать
                дизайн-систему — когда-то выбирал между дизайном и разработкой, в итоге
                делаю и то, и другое.
                <br />
                <br />
                В коде с 13 лет: начинал с 2D-игр и Arduino, участвовал в конкурсах и
                побеждал. Легко общаюсь, быстро включаюсь в продукт и не боюсь чужого
                legacy.`,

    "experience.title": "Опыт работы",
    "experience.qazirgi.period": "Дек 2025 — настоящее время",
    "experience.qazirgi.role": "Frontend Developer (React + TypeScript)",
    "experience.qazirgi.items": [
      "Рефакторил legacy-фронтенд: выявлял и устранял баги, повышал стабильность и поддерживаемость кода.",
      "Разработал модуль просмотра 360°-панорам на WebGL / three.js: управление камерой (yaw/pitch), кастомная логика взаимодействия и ограничения движения.",
      "Оптимизировал жизненный цикл WebGL-сцены, повысив стабильность рендеринга.",
      "Спроектировал клиентскую архитектуру системы учёта (OS-модуль): экраны, навигация, управление состоянием на Zustand.",
      "Интегрировал WebSocket для работы в реальном времени, реализовал систему ролей и доступов, включая админ-режим.",
      "Разработал лендинг-каталог для продажи аккумуляторов: фильтрация, форма заявок, адаптация под мобильные устройства.",
      "Ускорил загрузку страницы с ~15 до ~2 секунд, перестроив логику получения данных на высокоуровневый polling.",
      "Разработал киоск-приложение на Kotlin для авторизации гостей по Face ID.",
    ],
    "experience.saqr.period": "Май 2026 — Июль 2026",
    "experience.saqr.role": "Software Engineer (Fullstack)",
    "experience.saqr.items": [
      "Вёл эпик с нуля до production: спроектировал и реализовал функциональность целиком (frontend + backend), провёл через множество итераций багфиксов.",
      "Интегрировал возврат по BACKURL через SIGX — интеграция с приложением eGov.",
      "Диагностировал и устранил критический баг на iOS: локализовал через логирование и системный troubleshooting, восстановил работу на всех платформах.",
      "Проектировал транзакции и фоновые задачи на Redis, BullMQ и cron; решал race conditions при конкурентном доступе.",
      "Провёл редизайн интерфейса и принимал UI/UX-решения, улучшившие ключевые пользовательские сценарии.",
      "Стек: TypeScript, NestJS, Node.js, SQL, Redis, BullMQ, React.",
    ],
    "experience.lst.period": "Окт 2025 — Ноя 2025",
    "experience.lst.role": "Frontend Dev",
    "experience.lst.items": [
      "Разработал React-приложение с нуля: спроектировал компонентную архитектуру, структуру проекта и UI-логику.",
      "Использовал TypeScript для строгой типизации, повышения стабильности и удобства сопровождения кода.",
      "Реализовал интерактивную карусель и мощный поисковой компонент с debounce/throttle для оптимизации запросов.",
      "Внедрил SEO-улучшения: оптимизировал DOM-структуру, метатеги, микроразметку, что улучшило индексируемость.",
      "Создал простую JSON-базу данных и полностью реализовал логику взаимодействия с ней.",
      "Разработал адаптивный интерфейс для всех основных устройств.",
      "Выполнил весь проект самостоятельно: дизайн, архитектура, логика, интеграции и финальный релиз.",
    ],

    "experience.startup.period": "Июн 2025 — Авг 2025",
    "experience.startup.role": "Frontend Dev (React)",
    "experience.startup.items": [
      "Разработал frontend вендингового аппарата: полный сценарий «выбор товара — оплата — подтверждение».",
      "Интегрировал взаимодействие с backend и базой данных, реализовал админ-панель и стабильную работу интерфейса в реальном времени.",
    ],

    "experience.lifetrend.period": "Авг 2025",
    "experience.lifetrend.items": [
      "Разработал адаптивный лендинг с нуля по макету Figma.",
      "Использовал BEM, SCSS-модули и гибкую сетку для корректного отображения на 5+ типах устройств.",
      "Реализовал анимации интерфейса, улучшив визуальное восприятие и вовлечённость.",
      "Проект выполнял самостоятельно: от структуры до финальной оптимизации.",
    ],

    "experience.daft.period": "Фев 2024 — Апр 2024",
    "experience.daft.items": [
      "С нуля спроектировал визуальный стиль и UI/UX: макеты в Figma, дизайн-система (кнопки, формы, карточки, модалки).",
      "Мигрировал проект с HTML5 на Vue 3, переписал 12+ компонентов на Composition API.",
      "Повысил производительность на +15% по Lighthouse, улучшил структуру и переиспользуемость кода.",
    ],

    "experience.verotour.period": "Ноя 2023 — Янв 2024",
    "experience.verotour.items": [
      "Полностью разработал многостраничный сайт турагентства: дизайн, вёрстка, структура, UI-логика.",
      "Реализовал интеграцию внешних API для поиска туров, авиабилетов и спец-предложений.",
      "Создал несколько разделов: страны, акции, туры, покупка билетов и др.",
      "Рабочий процесс включал самостоятельный дизайн и реализацию с нуля — опыт, который сильно прокачал навыки.",
    ],

    "works.title": "Проекты",
    "works.subtitle": "Ниже — подборка сайтов и проектов.",
    "works.cases.title": "Fullstack-кейсы",
    "works.cases.note":
      "Код под NDA — поэтому вместо ссылок здесь архитектура, стек и метрики.",
    "works.sites.title": "Сайты и лендинги",

    "works.case.sigx.title": "Эпик с интеграцией eGov (SIGX)",
    "works.case.sigx.desc":
      "Saqr Innovations — фича целиком, frontend + backend, от проектирования до production. Интеграция с гос-приложением eGov через SIGX.",
    "works.case.sigx.points": [
      "Возврат в приложение по BACKURL из eGov; потеря сессии на iOS решена пробросом сессии через backend.",
      "Транзакции и фоновые задачи: Redis, BullMQ, cron. Race conditions при конкурентном доступе.",
      "Множество итераций багфиксов и технических решений уже в production.",
    ],

    "works.case.os.title": "OS-модуль: real-time система учёта",
    "works.case.os.desc":
      "Qazirgi — клиентская архитектура с нуля: экраны, навигация, состояние, роли и доступы.",
    "works.case.os.points": [
      "Спроектировал клиентскую архитектуру целиком: экраны, навигация, состояние на Zustand.",
      "Real-time на WebSocket, система ролей и доступов с админ-режимом.",
      "Модульная структура под масштабирование, параллельно — рефакторинг legacy-кода.",
    ],

    "works.case.perf.title": "Ускорение загрузки: с ~15 до ~2 секунд",
    "works.case.perf.desc":
      "Qazirgi — страница в худшем кейсе грузилась ~15 секунд. Стало ~2 секунды — в ~7 раз быстрее.",
    "works.case.perf.points": [
      "Продиагностировал узкие места в цепочке получения данных.",
      "Перестроил логику на высокоуровневый polling вместо каскада запросов.",
      "Результат стабилен и на медленной сети.",
    ],

    "works.case.kiosk.title": "Киоск: авторизация гостей по Face ID",
    "works.case.kiosk.desc":
      "Qazirgi — нативное киоск-приложение на Kotlin для биометрической идентификации гостей.",
    "works.case.kiosk.points": [
      "Kotlin-приложение, работающее в режиме киоска без оператора.",
      "Авторизация гостей по Face ID — биометрическая идентификация.",
      "Часть той же системы учёта, что и OS-модуль.",
    ],

    "works.case.pano.title": "360°-viewer на WebGL",
    "works.case.pano.desc":
      "Qazirgi — модуль просмотра панорам: управление камерой (yaw/pitch), ограничения движения, оптимизация жизненного цикла сцены. Демо ниже написано с нуля для этого сайта — та же логика камеры, что и в рабочем проекте.",

    "works.verotour.title": "VeroTour",
    "works.verotour.desc": "Travel agency — сайт с нуля.",
    "works.snxrs.title": "Snxrs",
    "works.snxrs.desc": "Онлайн-каталог (unreleased).",
    "works.daft.title": "Daft Party",
    "works.daft.desc": "Миграция на Vue 3.",
    "works.lst.title": "LST тюнинг",
    "works.lst.desc": "Business-card сайт.",
    "works.boxmashin.title": "Box Mashin",
    "works.boxmashin.desc": "Landing page.",

    "skills.title": "Навыки",
    "skills.languages": "Языки и базы данных",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Инструменты и DevOps",

    "education.title": "Образование",
    "education.esil": "Esil University",
    "education.esil.desc": "Информационные системы (2024—2028)",
    "education.itstep": "IT Step Academy",
    "education.itstep.desc": "Frontend (2019—2024)",

    "contacts.title": "Контакты",
    "contacts.email": "Email:",
    "contacts.phone": "Phone:",
    "contacts.goal":
      "Цель: расти как fullstack-инженер и вести фичи от архитектуры до production.",
    "contacts.cta.telegram": "Написать в Telegram",
    "contacts.cta.email": "Отправить email",

    "footer.copyright": "© [year] Чубаров Родион",

    "ladder.start": "Начало",
    "ladder.about": "О себе",
    "ladder.experience": "Опыт",
    "ladder.projects": "Проекты",
    "ladder.skills": "Навыки/Учеба/Связь",
  },

  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.works": "Projects",
    "nav.skills": "Skills",
    "nav.contacts": "Contacts",
    "nav.resume": "Resume (PDF)",
    "nav.downloadResume": "Download Resume",

    "hero.title": "Rodion Chubarov",
    "hero.subtitle": "Fullstack Developer",
    "hero.tagline1": "Owning features from architecture to production.",
    "hero.tagline2": "React / TypeScript / Node.js / NestJS.",
    "hero.tagline3": "Love music and sports discipline.",
    "hero.location": "Astana, Kazakhstan",
    "hero.english": "English B1",
    "hero.birthdate": "12.12.2006",

    "about.title": "About Me",
    "about.text": `<strong>Fullstack developer:</strong> React / TypeScript on the front,
Node.js / NestJS on the back. I take a feature from idea to production: architecture,
design, code, bugfixes, release.
<br />
<br />
Numbers and facts instead of words: <br />
• Cut page load time <strong>from ~15 to ~2 seconds (~7x)</strong> by restructuring
the data fetching logic. <br />
• Single-handedly drove an epic with a payment integration (SIGX) from design to
production. <br />
• Fixed bugs that reproduced on one platform only: session loss on iOS — localized
it through logging and solved it by passing the session through the backend. <br />
• Built a 360° WebGL / three.js viewer and a Kotlin kiosk app with Face ID
authorization. <br />
<br />
<strong>Backend:</strong> transactions and background jobs with Redis / BullMQ / cron,
SQL, real-time with WebSocket, solving race conditions under concurrent access.
<br />
<br />
<strong>Frontend:</strong> React, Next.js, Zustand, complex interactivity up to WebGL.
I can design layouts in Figma and build a design system myself — I once had to choose
between design and development, and ended up doing both.
<br />
<br />
Coding since I was 13: started with 2D games and Arduino, competed and won contests.
Easy to communicate with, quick to dive into a product, and not afraid of someone
else's legacy code.`,

    "experience.title": "Work Experience",
    "experience.qazirgi.period": "Dec 2025 — Present",
    "experience.qazirgi.role": "Frontend Developer (React + TypeScript)",
    "experience.qazirgi.items": [
      "Refactored a legacy frontend: identified and fixed bugs, improved stability and maintainability.",
      "Built a 360° panorama viewer module with WebGL / three.js: camera control (yaw/pitch), custom interaction logic and movement constraints.",
      "Optimized the WebGL scene lifecycle, improving rendering stability.",
      "Designed the client-side architecture of an inventory system (OS module): screens, navigation, state management with Zustand.",
      "Integrated WebSocket for real-time functionality, implemented a roles and access system including an admin mode.",
      "Developed a landing catalog for selling batteries: filtering, request form, mobile adaptation.",
      "Cut page load time from ~15 to ~2 seconds by restructuring data fetching into high-level polling.",
      "Built a Kotlin kiosk app for guest authorization via Face ID.",
    ],
    "experience.saqr.period": "May 2026 — Jul 2026",
    "experience.saqr.role": "Software Engineer (Fullstack)",
    "experience.saqr.items": [
      "Owned an epic from scratch to production: designed and implemented the entire feature (frontend + backend) through many iterations of bugfixes.",
      "Integrated BACKURL return flow via SIGX — integration with the eGov app.",
      "Diagnosed and fixed a critical iOS bug: localized it through logging and systematic troubleshooting, restored correct behavior on all platforms.",
      "Designed transactions and background jobs with Redis, BullMQ and cron; solved race conditions under concurrent access.",
      "Redesigned the UI and made UI/UX decisions that improved key user flows.",
      "Stack: TypeScript, NestJS, Node.js, SQL, Redis, BullMQ, React.",
    ],
    "experience.lst.period": "Oct 2025 — Nov 2025",
    "experience.lst.role": "Frontend Dev",
    "experience.lst.items": [
      "Developed a React application from scratch: designed component architecture, project structure and UI logic.",
      "Used TypeScript for strict typing, improving code stability and maintainability.",
      "Implemented interactive carousel and powerful search component with debounce/throttle for request optimization.",
      "Implemented SEO improvements: optimized DOM structure, meta tags, microdata, which improved indexability.",
      "Created a simple JSON database and fully implemented interaction logic with it.",
      "Developed responsive interface for all major devices.",
      "Completed the entire project independently: design, architecture, logic, integrations and final release.",
    ],

    "experience.startup.period": "Jun 2025 — Aug 2025",
    "experience.startup.role": "Frontend Dev (React)",
    "experience.startup.items": [
      "Developed the frontend for a vending machine: full flow of product selection — payment — confirmation.",
      "Integrated with the backend and database, implemented an admin panel and stable real-time interface operation.",
    ],

    "experience.lifetrend.period": "Aug 2025",
    "experience.lifetrend.items": [
      "Developed a responsive landing page from scratch using Figma design.",
      "Used BEM, SCSS modules and flexible grid for correct display on 5+ device types.",
      "Implemented interface animations, improving visual perception and engagement.",
      "Completed the project independently: from structure to final optimization.",
    ],

    "experience.daft.period": "Feb 2024 — Apr 2024",
    "experience.daft.items": [
      "Designed the visual style and UI/UX from scratch: Figma layouts, a design system (buttons, forms, cards, modals).",
      "Migrated the project from HTML5 to Vue 3, rewrote 12+ components to Composition API.",
      "Improved performance by +15% in Lighthouse, improved code structure and reusability.",
    ],

    "experience.verotour.period": "Nov 2023 — Jan 2024",
    "experience.verotour.items": [
      "Completely developed a multi-page travel agency website: design, layout, structure, UI logic.",
      "Implemented integration of external APIs for searching tours, flights and special offers.",
      "Created several sections: countries, promotions, tours, ticket purchase, etc.",
      "The workflow included independent design and implementation from scratch - experience that greatly improved skills.",
    ],

    "works.title": "Projects",
    "works.subtitle": "Below is a selection of websites and projects.",
    "works.cases.title": "Fullstack case studies",
    "works.cases.note":
      "The code is under NDA — so instead of links, here are the architecture, stack and metrics.",
    "works.sites.title": "Websites & landing pages",

    "works.case.sigx.title": "Epic with eGov (SIGX) integration",
    "works.case.sigx.desc":
      "Saqr Innovations — the entire feature, frontend + backend, from design to production. Integration with the eGov government app via SIGX.",
    "works.case.sigx.points": [
      "BACKURL return flow from the eGov app; iOS session loss solved by passing the session through the backend.",
      "Transactions and background jobs: Redis, BullMQ, cron. Race conditions under concurrent access.",
      "Many iterations of bugfixes and technical decisions in production.",
    ],

    "works.case.os.title": "OS module: real-time inventory system",
    "works.case.os.desc":
      "Qazirgi — client architecture from scratch: screens, navigation, state, roles and access control.",
    "works.case.os.points": [
      "Designed the entire client architecture: screens, navigation, state with Zustand.",
      "Real-time with WebSocket, roles and access system with an admin mode.",
      "Modular structure built for scaling, alongside legacy code refactoring.",
    ],

    "works.case.perf.title": "Page load: from ~15 down to ~2 seconds",
    "works.case.perf.desc":
      "Qazirgi — in the worst case the page took ~15 seconds to load. Now it's ~2 seconds — ~7x faster.",
    "works.case.perf.points": [
      "Diagnosed the bottlenecks in the data fetching chain.",
      "Restructured the logic into high-level polling instead of a cascade of requests.",
      "The result is stable even on slow networks.",
    ],

    "works.case.kiosk.title": "Kiosk: guest authorization via Face ID",
    "works.case.kiosk.desc":
      "Qazirgi — a native Kotlin kiosk app for biometric guest identification.",
    "works.case.kiosk.points": [
      "A Kotlin app running in kiosk mode without an operator.",
      "Guest authorization via Face ID — biometric identification.",
      "Part of the same inventory system as the OS module.",
    ],

    "works.case.pano.title": "360° viewer with WebGL",
    "works.case.pano.desc":
      "Qazirgi — a panorama viewer module: camera control (yaw/pitch), movement constraints, scene lifecycle optimization. The demo below was written from scratch for this site — the same camera logic as in the production project.",

    "works.verotour.title": "VeroTour",
    "works.verotour.desc": "Travel agency — website from scratch.",
    "works.snxrs.title": "Snxrs",
    "works.snxrs.desc": "Online catalog (unreleased).",
    "works.daft.title": "Daft Party",
    "works.daft.desc": "Migration to Vue 3.",
    "works.lst.title": "LST tuning",
    "works.lst.desc": "Business-card website.",
    "works.boxmashin.title": "Box Mashin",
    "works.boxmashin.desc": "Landing page.",

    "skills.title": "Skills",
    "skills.languages": "Languages & Databases",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools & DevOps",

    "education.title": "Education",
    "education.esil": "Esil University",
    "education.esil.desc": "Information Systems (2024—2028)",
    "education.itstep": "IT Step Academy",
    "education.itstep.desc": "Frontend (2019—2024)",

    "contacts.title": "Contacts",
    "contacts.email": "Email:",
    "contacts.phone": "Phone:",
    "contacts.goal":
      "Goal: to grow as a fullstack engineer and own features from architecture to production.",
    "contacts.cta.telegram": "Message on Telegram",
    "contacts.cta.email": "Send an email",

    "footer.copyright": "© [year] Rodion Chubarov",

    "ladder.start": "Start",
    "ladder.about": "About",
    "ladder.experience": "Experience",
    "ladder.projects": "Projects",
    "ladder.skills": "Skills/Education/Contacts",
  },
};
