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
    "hero.subtitle": "Frontend Developer",
    "hero.tagline1": "Соединяю код с творчеством.",
    "hero.tagline2": "Создаю чистый и сбалансированный UI.",
    "hero.tagline3": "Люблю музыку и дисциплину спорта.",
    "hero.location": "Астана, Казахстан",
    "hero.english": "English B1",
    "hero.birthdate": "12.12.2006",

    "about.title": "О себе",
    "about.text": ` Я фронтенд-разработчик, но могу работать и в бэкенде. Меня всегда
                тянуло к разработке, и с 13 лет я увлекался написанием простых 2D-игр,
                разработкой на Arduino и т.д. Я участвовал в конкурсах по этим
                направлениям и даже побеждал в некоторых из них.
                <br />
                <br />
                Когда я решил изучить что-то углубленно, я долго не мог решить, что
                мне ближе — разработка или дизайн, и нашёл компромисс в виде
                фронтенд-разработки.
                <br />
                <br />
                Сегодня фокусируюсь на построении масштабируемых клиентских приложений,
                продуманной архитектуре и чистом UI. Уверенно работаю как в frontend,
                так и во взаимодействии с backend.
                <br />
                <br />
                Чем я могу быть вам полезен?: <br />
                • Фронтенд-разработка с использованием Next.js и React <br />
                • Бэкенд-разработка с использованием NestJS <br />
                • Проектирование и архитектура масштабируемых высоконагруженных систем
                <br />
                • Разработка инновационных решений <br />
                • У меня хорошее чувство юмора, и я легко общаюсь с людьми. <br />`,

    "experience.title": "Опыт работы",
    "experience.qazirgi.period": "Дек 2025 — настоящее время",
    "experience.qazirgi.role": "Frontend Developer",
    "experience.qazirgi.items": [
      "Разработал масштабируемый 360° viewer с управлением камерой (yaw/pitch) и интеграцией OrbitControls.",
      "Настроил ограничения движения камеры и логику первого вида, устранил конфликты управления состоянием.",
      "Оптимизировал жизненный цикл WebGL-сцены и обеспечил стабильную работу.",
      "Спроектировал клиентскую архитектуру OS-интерфейса.",
      "Реализовал управление экранами, состояниями и навигацией.",
      "Интегрировал WebSocket-протокол для real-time взаимодействия.",
      "Внедрил систему доступов и админ-режимы.",
      "Обеспечил модульность и масштабируемость клиентского решения.",
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
    "experience.startup.role": "Frontend Dev",
    "experience.startup.items": [
      "Работал над бизнес-стороной продукта: админ-панелью, внутренней логикой, управлением аппаратами.",
      "Использовал TypeScript и React, подключал API для получения и обработки данных.",
      "Участвовал в улучшении общей архитектуры проекта вместе с командой.",
      "Создавал интерфейсы для управления товарами, статистикой, устройствами, инвентаризацией.",
      "Реализовал сложную бизнес-логику (валидации, расчёты, синхронизации данных).",
      "Интерфейс пользовательской оплаты не разрабатывал, но был ответственен за всю функциональность админки.",
      "Работал по поставленным задачам, активно участвовал в технических обсуждениях и принятии решений.",
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
      "Мигрировал проект с ванильного HTML5 на Vue 3, переписал более 12 компонентов на Composition API.",
      "Оптимизировал сборку, уменьшил вес бандла и ускорил загрузку приложения.",
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
    "skills.technologies": "Технологии",
    "skills.frameworks": "Фреймворки",
    "skills.tools": "Инструменты",
    "skills.softskills": "Soft skills",

    "education.title": "Образование",
    "education.esil": "Esil University",
    "education.esil.desc": "Информационные системы (2024—2028)",
    "education.itstep": "IT Step Academy",
    "education.itstep.desc": "Frontend (2019—2024)",

    "contacts.title": "Контакты",
    "contacts.email": "Email:",
    "contacts.phone": "Phone:",
    "contacts.goal":
      "Цель: Стать частью команды профессионалов и развивать навыки UI.",

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
    "hero.subtitle": "Frontend Developer",
    "hero.tagline1": "Connecting code with creativity.",
    "hero.tagline2": "Creating clean and balanced UI.",
    "hero.tagline3": "Love music and sports discipline.",
    "hero.location": "Astana, Kazakhstan",
    "hero.english": "English B1",
    "hero.birthdate": "12.12.2006",

    "about.title": "About Me",
    "about.text": `I'm a front-end developer, but I can also work on the back-end. I've always been

drawn to development, and since I was 13, I've been interested in writing simple 2D games,

developing with Arduino, and so on. I've participated in competitions in these areas and even won some.

<br />
<br />
When I decided to study something in depth, I struggled for a long time to decide whether

development or design was closer to me, and I found a compromise in the form of

front-end development.

<br />
<br />
Today, I focus on building scalable client-side applications,

well-thought-out architecture, and a clean UI. I'm confident working both on the front-end

and interacting with the back-end. <br />
<br />
How can I help you? <br />
• Front-end development using Next.js and React <br />
• Back-end development using NestJS <br />
• Design and architecture of scalable, high-load systems
<br />
• Development of innovative solutions <br />
• I have a good sense of humor and am easy to communicate with. <br />`,

    "experience.title": "Work Experience",
    "experience.qazirgi.period": "Dec 2025 — Present",
    "experience.qazirgi.role": "Frontend Developer",
    "experience.qazirgi.items": [
      "Developed a scalable 360° panorama viewer with camera control (yaw/pitch) and OrbitControls integration.",
      "Implemented camera movement constraints and initial view logic, resolving state and control conflicts.",
      "Optimized the WebGL scene lifecycle for stable performance.",
      "Designed the client-side architecture of the OS interface module.",
      "Implemented screen management, state handling, and navigation logic.",
      "Integrated WebSocket protocol for real-time communication.",
      "Configured access control system and admin modes.",
      "Ensured modularity and scalability of the client application.",
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
    "experience.startup.role": "Frontend Dev",
    "experience.startup.items": [
      "Worked on the business side of the product: admin panel, internal logic, device management.",
      "Used TypeScript and React, connected APIs for data retrieval and processing.",
      "Participated in improving the overall project architecture with the team.",
      "Created interfaces for managing products, statistics, devices, inventory.",
      "Implemented complex business logic (validations, calculations, data synchronization).",
      "Did not develop the user payment interface, but was responsible for all admin functionality.",
      "Worked on assigned tasks, actively participated in technical discussions and decision making.",
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
      "Migrated project from vanilla HTML5 to Vue 3, rewrote over 12 components to Composition API.",
      "Optimized build, reduced bundle size and accelerated application loading.",
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
    "skills.technologies": "Technologies",
    "skills.frameworks": "Frameworks",
    "skills.tools": "Tools",
    "skills.softskills": "Soft skills",

    "education.title": "Education",
    "education.esil": "Esil University",
    "education.esil.desc": "Information Systems (2024—2028)",
    "education.itstep": "IT Step Academy",
    "education.itstep.desc": "Frontend (2019—2024)",

    "contacts.title": "Contacts",
    "contacts.email": "Email:",
    "contacts.phone": "Phone:",
    "contacts.goal":
      "Goal: To become part of a professional team and develop UI skills.",

    "footer.copyright": "© [year] Rodion Chubarov",

    "ladder.start": "Start",
    "ladder.about": "About",
    "ladder.experience": "Experience",
    "ladder.projects": "Projects",
    "ladder.skills": "Skills/Education/Contacts",
  },
};
