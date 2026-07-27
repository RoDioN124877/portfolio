const translations = {
  ru: {
    "nav.about": "О себе",
    "nav.experience": "Опыт",
    "nav.works": "Проекты",
    "nav.skills": "Навыки",
    "nav.contacts": "Контакты",
    "nav.resume": "Резюме (PDF)",
    "nav.viewResume": "Смотреть резюме",
    "nav.downloadResume": "Скачать резюме",

    "hero.title": "Чубаров Родион",
    "hero.subtitle": "Fullstack Developer",
    "hero.tagline1": "Веду фичи от архитектуры до production.",
    "hero.tagline2": "React / TypeScript / Node.js / NestJS.",
    "hero.tagline3": "Люблю музыку и дисциплину спорта.",
    "hero.location": "Астана, Казахстан",
    "hero.english": "English B2",
    "hero.birthdate": "12.12.2006",

    "about.title": "О себе",
    "about.text": `<strong>Fullstack-разработчик</strong> с фокусом на React / TypeScript (frontend)
                и Node.js / NestJS (backend), <strong>~2.5 года коммерческого опыта</strong>.
                Веду фичи от архитектуры и дизайна до production: real-time на WebSocket, очереди,
                фоновые задачи и транзакции на Redis / BullMQ, решение race conditions при
                конкурентном доступе. Силён в диагностике — нахожу и чиню баги, которые
                воспроизводятся только на конкретной платформе.
                <br />
                <br />
                Ключевые достижения: ускорил загрузку страницы <strong>в ~7 раз (с ~15 до ~2
                секунд)</strong>; в одиночку провёл <strong>эпик учёта активов</strong> от
                проектирования до production (frontend + backend); диагностировал и починил
                <strong>критический баг на iOS</strong>; разработал <strong>360°-viewer на
                WebGL / three.js</strong>.`,

    "experience.title": "Опыт работы",
    "experience.qazirgi.period": "Дек 2025 — наст. время · удалённо",
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
    "experience.saqr.period": "Май — Июль 2026 · офис, Астана (параллельно с Qazirgi)",
    "experience.saqr.role": "Software Engineer (Fullstack)",
    "experience.saqr.items": [
      "Вёл эпик учёта активов с нуля до production: спроектировал и реализовал функциональность целиком (frontend + backend), провёл через множество итераций багфиксов.",
      "Доработал интеграцию с приложением eGov (SIGX): возврат по BACKURL.",
      "Диагностировал и устранил критический баг на iOS: локализовал через логирование и системный troubleshooting, восстановил работу на всех платформах.",
      "Проектировал транзакции и фоновые задачи на Redis, BullMQ и cron; решал race conditions при конкурентном доступе.",
      "Провёл редизайн интерфейса и принимал UI/UX-решения, улучшившие ключевые пользовательские сценарии.",
      "Стек: TypeScript, NestJS, Node.js, SQL, Redis, BullMQ, React.",
    ],
    "experience.freelance.period": "Ноя 2023 — Ноя 2025 · удалённо",
    "experience.freelance.role": "Fullstack / Frontend Developer · фриланс/контракт",
    "experience.freelance.items": [
      "Verotour — разработал сайт турагентства с нуля: адаптивная вёрстка и интеграция внешних API поиска туров и билетов.",
      "DaftParty — мигрировал проект с HTML5 на Vue 3 (Composition API, 12+ компонентов), поднял Lighthouse на +15%.",
      "LST — собрал React SPA с нуля: компонентная архитектура, поиск с debounce/throttle, SEO-оптимизация.",
      "Вендинг-стартап — fullstack: сценарий «выбор товара → оплата → подтверждение», интеграция с backend/БД, админ-панель.",
      "Life Trend — сверстал адаптивный лендинг по макету Figma (BEM, SCSS), кроссбраузерность на 5+ типах устройств.",
    ],

    "works.title": "Проекты",
    "works.subtitle": "Ниже — подборка сайтов и проектов.",
    "works.cases.title": "Fullstack-кейсы",
    "works.cases.note":
      "Код под NDA — поэтому вместо ссылок здесь архитектура, стек и метрики.",
    "works.sites.title": "Сайты и лендинги",

    "works.case.sigx.title": "Эпик: учёт активов",
    "works.case.sigx.desc":
      "Saqr Innovations — эпик учёта активов целиком, frontend + backend, от проектирования до production.",
    "works.case.sigx.points": [
      "Транзакции и фоновые задачи: Redis, BullMQ, cron. Race conditions при конкурентном доступе.",
      "Доработал интеграцию с гос-приложением eGov (SIGX): возврат по BACKURL, потеря сессии на iOS решена пробросом сессии через backend.",
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
    "nav.resume": "CV (PDF)",
    "nav.viewResume": "View CV",
    "nav.downloadResume": "Download CV",

    "hero.title": "Rodion Chubarov",
    "hero.subtitle": "Fullstack Developer",
    "hero.tagline1": "Owning features from architecture to production.",
    "hero.tagline2": "React / TypeScript / Node.js / NestJS.",
    "hero.tagline3": "Love music and sports discipline.",
    "hero.location": "Astana, Kazakhstan",
    "hero.english": "English B2",
    "hero.birthdate": "12.12.2006",

    "about.title": "About Me",
    "about.text": `<strong>Fullstack developer</strong> focused on React / TypeScript (frontend)
and Node.js / NestJS (backend), with <strong>~2.5 years of commercial experience</strong>.
I own features from architecture and design to production: real-time over WebSocket, queues,
background jobs and transactions with Redis / BullMQ, and solving race conditions under
concurrent access. I'm strong at diagnostics — I find and fix bugs that reproduce on one
platform only.
<br />
<br />
Key achievements: cut page load time <strong>~7x (from ~15 to ~2 seconds)</strong>;
single-handedly drove an <strong>asset-accounting epic</strong> from design to production
(frontend + backend); diagnosed and fixed a <strong>critical iOS bug</strong>; built a
<strong>360° WebGL / three.js viewer</strong>.`,

    "experience.title": "Work Experience",
    "experience.qazirgi.period": "Dec 2025 — Present · Remote",
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
    "experience.saqr.period": "May — Jul 2026 · On-site, Astana (in parallel with Qazirgi)",
    "experience.saqr.role": "Software Engineer (Fullstack)",
    "experience.saqr.items": [
      "Owned an asset accounting epic from scratch to production: designed and implemented the entire feature (frontend + backend) through many iterations of bugfixes.",
      "Improved the eGov app integration (SIGX): BACKURL return flow.",
      "Diagnosed and fixed a critical iOS bug: localized it through logging and systematic troubleshooting, restored correct behavior on all platforms.",
      "Designed transactions and background jobs with Redis, BullMQ and cron; solved race conditions under concurrent access.",
      "Redesigned the UI and made UI/UX decisions that improved key user flows.",
      "Stack: TypeScript, NestJS, Node.js, SQL, Redis, BullMQ, React.",
    ],
    "experience.freelance.period": "Nov 2023 — Nov 2025 · Remote",
    "experience.freelance.role": "Fullstack / Frontend Developer · freelance/contract",
    "experience.freelance.items": [
      "Verotour — built a travel-agency website from scratch: responsive markup and integration of external tour/ticket search APIs.",
      "DaftParty — migrated the project from HTML5 to Vue 3 (Composition API, 12+ components), raised Lighthouse by +15%.",
      "LST — built a React SPA from scratch: component architecture, search with debounce/throttle, SEO optimization.",
      "Vending startup — fullstack: “select → pay → confirm” flow, backend/DB integration, admin panel.",
      "Life Trend — built a responsive landing from a Figma design (BEM, SCSS), cross-browser on 5+ device types.",
    ],

    "works.title": "Projects",
    "works.subtitle": "Below is a selection of websites and projects.",
    "works.cases.title": "Fullstack case studies",
    "works.cases.note":
      "The code is under NDA — so instead of links, here are the architecture, stack and metrics.",
    "works.sites.title": "Websites & landing pages",

    "works.case.sigx.title": "Epic: asset accounting",
    "works.case.sigx.desc":
      "Saqr Innovations — the entire asset accounting epic, frontend + backend, from design to production.",
    "works.case.sigx.points": [
      "Transactions and background jobs: Redis, BullMQ, cron. Race conditions under concurrent access.",
      "Improved the eGov (SIGX) government app integration: BACKURL return flow, iOS session loss solved by passing the session through the backend.",
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
