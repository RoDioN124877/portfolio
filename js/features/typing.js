// Печатающийся текст в hero
(function (App) {
  "use strict";

  App.initTyping = function () {
    const typedTextSpan = document.getElementById("typed-output");
    let phrases = [
      "Веду фичи от архитектуры до production.",
      "React / TypeScript / Node.js / NestJS.",
      "Люблю музыку и дисциплину спорта."
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function typeWriter() {
      if (!typedTextSpan) return;
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        delay = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 300;
      }
      setTimeout(typeWriter, delay);
    }
    typeWriter();

    return {
      setPhrases(next) {
        phrases = next;
        phraseIndex = 0; charIndex = 0; isDeleting = false;
      },
    };
  };
})(window.App = window.App || {});
