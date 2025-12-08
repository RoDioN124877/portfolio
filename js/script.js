 document.addEventListener("DOMContentLoaded", () => {
            // 1. Current Year
            document.getElementById("year").textContent = new Date().getFullYear();

            // 2. Burger Menu Logic
            const burger = document.getElementById("burgerBtn");
            const mobileMenu = document.getElementById("mobileMenu");
            const closeBtn = document.getElementById("closeBtn");
            const menuLinks = mobileMenu.querySelectorAll("a");

            function toggleMenu() {
                const isExpanded = burger.getAttribute("aria-expanded") === "true";
                burger.setAttribute("aria-expanded", !isExpanded);
                mobileMenu.classList.toggle("active");
                document.body.style.overflow = !isExpanded ? "hidden" : "";
            }

            burger.addEventListener("click", toggleMenu);
            closeBtn.addEventListener("click", toggleMenu);

            menuLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    if (mobileMenu.classList.contains("active")) toggleMenu();
                });
            });

            // 3. Typed Text Animation Variables
            let typedTextSpan = document.getElementById("typed-output");
            let phrases = [
                "Соединяю код с творчеством.",
                "Создаю чистый и сбалансированный UI.",
                "Люблю музыку и дисциплину спорта.",
            ];
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typeSpeed = 100;

            function typeWriter() {
                const currentPhrase = phrases[phraseIndex];

                if (isDeleting) {
                    typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                    typeSpeed = 50;
                } else {
                    typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                    typeSpeed = 100;
                }

                if (!isDeleting && charIndex === currentPhrase.length) {
                    isDeleting = true;
                    typeSpeed = 2000;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typeSpeed = 500;
                }

                setTimeout(typeWriter, typeSpeed);
            }
            
            // Start typed animation initially
            typeWriter();

            // 4. Scroll Reveal
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.15 });
            
            document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

            // 5. Ladder Progress Logic
            const sections = document.querySelectorAll(".section-track");
            const ladderSteps = document.querySelectorAll(".ladder-steps li");
            const charContainer = document.querySelector(".ladder-character");
            
            const sectionMap = [
                "hero",
                "about",
                "experience",
                "works",
                "skills",
                "education",
                "contacts",
            ];

            let lastScrollTop = 0;
            let scrollTimeout;

            window.addEventListener("scroll", () => {
                let currentSectionId = "";
                const scrollY = window.scrollY;

                sections.forEach((sec) => {
                    if (scrollY >= (sec.offsetTop - window.innerHeight / 2.5)) {
                        currentSectionId = sec.getAttribute("id");
                    }
                });

                // Update Dots
                ladderSteps.forEach((li) => {
                    li.classList.remove("active");
                    if (li.dataset.target === currentSectionId) {
                        li.classList.add("active");
                    }
                });

                // Move Character
                const index = sectionMap.indexOf(currentSectionId);
                if (index !== -1 && ladderSteps.length > 1) {
                    const stepHeight = 100 / (ladderSteps.length - 1);
                    const finalTop = Math.min(Math.max(index * stepHeight, 0), 100);
                    charContainer.style.top = `${finalTop}%`;
                }

                // Character Animations
                charContainer.classList.add('walking');
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    charContainer.classList.remove('walking');
                }, 100);

                if (scrollY > lastScrollTop) {
                    charContainer.classList.remove('up');
                }
                lastScrollTop = scrollY;
            });

            // Handle Click on Ladder Steps
            ladderSteps.forEach((li) => {
                li.addEventListener("click", () => {
                    const targetSec = document.getElementById(li.dataset.target);
                    if (targetSec) {
                        targetSec.scrollIntoView({ behavior: "smooth" });
                    }
                });
            });

            // 6. Spotlight Effect
            const spotlightCards = document.querySelectorAll(".spotlight-card");
            spotlightCards.forEach((card) => {
                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                });
            });

            // 7. Language Switcher Logic
            let currentLang = localStorage.getItem('language') || 'ru';

            // Function to set language
            function setLanguage(lang) {
                currentLang = lang;
                localStorage.setItem('language', lang);
                document.documentElement.lang = lang;
                
                // Update button text
                document.querySelectorAll('.lang-text').forEach(el => {
                    el.textContent = lang === 'ru' ? 'EN' : 'RU';
                });
                
                document.querySelectorAll('.lang-text-mobile').forEach(el => {
                    el.textContent = lang === 'ru' ? 'English' : 'Русский';
                });
                
                // Apply translations
                applyTranslations(lang);
                
                // Update typed animation
                updateTypedAnimation(lang);
            }

            // Function to apply translations
            function applyTranslations(lang) {
                const t = translations[lang];
                
                // Navigation
                document.querySelectorAll('.main-nav a').forEach((link, index) => {
                    const keys = ['nav.about', 'nav.experience', 'nav.works', 'nav.skills', 'nav.contacts'];
                    if (keys[index]) link.textContent = t[keys[index]];
                });
                
                // Mobile menu
                document.querySelectorAll('#mobileMenu a').forEach((link, index) => {
                    const keys = ['nav.about', 'nav.experience', 'nav.works', 'nav.skills', 'nav.contacts', 'nav.downloadResume'];
                    if (t[keys[index]]) link.textContent = t[keys[index]];
                });
                
                // Resume button in header
                const resumeBtn = document.querySelector('.btn-cv');
                if (resumeBtn) {
                    if (resumeBtn.textContent.includes('Резюме') || resumeBtn.textContent.includes('Resume')) {
                        resumeBtn.textContent = t['nav.resume'];
                    }
                }
                
                // Hero section
                const nameElement = document.querySelector('.name');
                if (nameElement) {
                    const spans = nameElement.querySelectorAll('span');
                    nameElement.childNodes[0].textContent = t['hero.title'];
                    if (spans[0]) spans[0].textContent = t['hero.subtitle'];
                }
                
                // Meta info
                const metaSpans = document.querySelectorAll('.meta span');
                if (metaSpans.length >= 3) {
                    metaSpans[0].textContent = t['hero.location'];
                    metaSpans[1].textContent = t['hero.english'];
                    metaSpans[2].textContent = t['hero.birthdate'];
                }
                
                // Section titles
                document.querySelectorAll('.section-title').forEach(title => {
                    const sectionId = title.closest('section').id;
                    switch(sectionId) {
                        case 'about':
                            title.textContent = t['about.title'];
                            break;
                        case 'experience':
                            title.textContent = t['experience.title'];
                            break;
                        case 'works':
                            title.textContent = t['works.title'];
                            break;
                        case 'skills':
                            title.textContent = t['skills.title'];
                            break;
                        case 'education':
                            title.textContent = t['education.title'];
                            break;
                        case 'contacts':
                            title.textContent = t['contacts.title'];
                            break;
                    }
                });
                
                // About section
                const aboutSection = document.querySelector('#about .lead');
                if (aboutSection) aboutSection.innerHTML = t['about.text'];
                
                // Works subtitle
                const worksSubtitle = document.querySelector('#works .lead');
                if (worksSubtitle) worksSubtitle.textContent = t['works.subtitle'];
                
                // Project titles and descriptions
                const projectTitles = document.querySelectorAll('.pc-body h4');
                const projectDescs = document.querySelectorAll('.pc-body p');
                
                projectTitles.forEach((title, index) => {
                    const keys = ['works.verotour.title', 'works.snxrs.title', 'works.daft.title', 'works.lst.title', 'works.boxmashin.title'];
                    if (t[keys[index]]) title.textContent = t[keys[index]];
                });
                
                projectDescs.forEach((desc, index) => {
                    const keys = ['works.verotour.desc', 'works.snxrs.desc', 'works.daft.desc', 'works.lst.desc', 'works.boxmashin.desc'];
                    if (t[keys[index]]) desc.textContent = t[keys[index]];
                });
                
                // Skills section
                const skillHeaders = document.querySelectorAll('.skill-block h5');
                if (skillHeaders.length >= 4) {
                    skillHeaders[0].textContent = t['skills.technologies'];
                    skillHeaders[1].textContent = t['skills.frameworks'];
                    skillHeaders[2].textContent = t['skills.tools'];
                    skillHeaders[3].textContent = t['skills.softskills'];
                }
                
                // Education section
                const eduTitles = document.querySelectorAll('.edu-item h4');
                const eduDescs = document.querySelectorAll('.edu-item p');
                
                if (eduTitles.length >= 2) {
                    eduTitles[0].textContent = t['education.esil'];
                    eduTitles[1].textContent = t['education.itstep'];
                }
                
                if (eduDescs.length >= 2) {
                    eduDescs[0].textContent = t['education.esil.desc'];
                    eduDescs[1].textContent = t['education.itstep.desc'];
                }
                
                // Contacts section
                const contactsContent = document.querySelector('#contacts > div');
                if (contactsContent) {
                    const paragraphs = contactsContent.querySelectorAll('p');
                    if (paragraphs.length >= 3) {
                        paragraphs[0].innerHTML = `
                            <strong>${t['contacts.email']}</strong>
                            <a href="mailto:rodion.ch06@gmail.com" style="color: var(--accent)">rodion.ch06@gmail.com</a>
                        `;
                        
                        paragraphs[1].innerHTML = `
                            <strong>${t['contacts.phone']}</strong>
                            <a href="tel:+77052940884" style="color: var(--accent)">+7 705 294 0884</a>
                        `;
                        
                        paragraphs[2].textContent = t['contacts.goal'];
                    }
                }
                
                // Ladder steps
                const ladderSteps = document.querySelectorAll('.ladder-steps li');
                const ladderLabels = ['ladder.start', 'ladder.about', 'ladder.experience', 'ladder.projects', 'ladder.skills'];
                
                ladderSteps.forEach((step, index) => {
                    if (t[ladderLabels[index]]) {
                        step.setAttribute('data-label', t[ladderLabels[index]]);
                    }
                });
                
                // Footer
                const footerText = document.querySelector('.site-footer > .container > div:first-child');
                if (footerText) {
                    const year = new Date().getFullYear();
                    footerText.innerHTML = t['footer.copyright'].replace('[year]', year);
                }
                
                // Update experience section
                updateExperienceSection(lang);
            }

            // Function to update experience section
            function updateExperienceSection(lang) {
                const t = translations[lang];
                const timelineItems = document.querySelectorAll('.timeline-item');
                
                timelineItems.forEach((item, index) => {
                    const leftDiv = item.querySelector('.ti-left');
                    if (leftDiv) {
                        const time = leftDiv.querySelector('time');
                        const role = leftDiv.querySelector('.role');
                        
                        switch(index) {
                            case 0:
                                if (time) time.textContent = t['experience.lst.period'];
                                if (role) role.textContent = t['experience.lst.role'];
                                break;
                            case 1:
                                if (time) time.textContent = t['experience.startup.period'];
                                if (role) role.textContent = t['experience.startup.role'];
                                break;
                            case 2:
                                if (time) time.textContent = t['experience.lifetrend.period'];
                                break;
                            case 3:
                                if (time) time.textContent = t['experience.daft.period'];
                                break;
                            case 4:
                                if (time) time.textContent = t['experience.verotour.period'];
                                break;
                        }
                    }
                    
                    // Update list items
                    const listItems = item.querySelectorAll('.ti-right li');
                    if (listItems.length > 0) {
                        let itemsArray = [];
                        switch(index) {
                            case 0: itemsArray = t['experience.lst.items']; break;
                            case 1: itemsArray = t['experience.startup.items']; break;
                            case 2: itemsArray = t['experience.lifetrend.items']; break;
                            case 3: itemsArray = t['experience.daft.items']; break;
                            case 4: itemsArray = t['experience.verotour.items']; break;
                        }
                        
                        listItems.forEach((li, liIndex) => {
                            if (itemsArray && itemsArray[liIndex]) {
                                li.textContent = itemsArray[liIndex];
                            }
                        });
                    }
                });
            }

            // Function to update typed animation
            function updateTypedAnimation(lang) {
                const t = translations[lang];
                phrases = [
                    t['hero.tagline1'],
                    t['hero.tagline2'],
                    t['hero.tagline3']
                ];
                
                // Reset typed animation state
                phraseIndex = 0;
                charIndex = 0;
                isDeleting = false;
            }

            // Initialize language
            setLanguage(currentLang);

            // Language toggle handlers
            const langToggle = document.getElementById('langToggle');
            const langToggleMobile = document.getElementById('langToggleMobile');
            
            if (langToggle) {
                langToggle.addEventListener('click', () => {
                    const newLang = currentLang === 'ru' ? 'en' : 'ru';
                    setLanguage(newLang);
                });
            }
            
            if (langToggleMobile) {
                langToggleMobile.addEventListener('click', () => {
                    const newLang = currentLang === 'ru' ? 'en' : 'ru';
                    setLanguage(newLang);
                    // Close mobile menu after language change
                    if (mobileMenu.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            }
        });