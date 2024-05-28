(function () {
  "use stict"; // pour la gestion des erreurs

  // Duree de chaque slide
  const slideTimeout = 5000; // 5 secondes
  // Recuperer les boutons de navigation
  const prev = document.querySelector("#prev");
  const next = document.querySelector("#next");
  // Recuperer les slides
  const slides = document.querySelectorAll(".slide");

  // Variables pour les dots
  let dots = [];
  // Vriable pour l'intervalle d'affichage des slides
  let intervalId;
  // Variable pour l'index du slide courant
  let currentSlide = 1;

  // Fonction pour afficher le slide par index
  function slideTo(index) {
    // Verifier si l'index est valide (entre 0 et slides.length - 1)
    currentSlide = index >= slides.length || index < 1 ? 0 : index;
    // Deplacer les slides
    slides.forEach(
      (slide) => (slide.style.transform = `translateX(-${currentSlide * 100}%)`)
    );
    // Mettre a jour la couleur des dots
    dots.forEach(
      (dot, key) =>
        (dot.classList = `dot ${key === currentSlide ? "active" : "inactive"}`)
    );
  }

  // Fonction pour afficher le slide suivant
  function showSlide() {
    slideTo(currentSlide);
    currentSlide++;
  }

  // Creer les dots par rapport au nombre de slides
  for (let i = 1; i <= slides.length; i++) {
    let dotClass = i == currentSlide ? "active" : "inactive";
    let dot = `<span data-slideId="${i}" class="dot ${dotClass}"></span>`;
    document.querySelector(".carousel-dots").innerHTML += dot;
  }

  // Recuperer les dots
  dots = document.querySelectorAll(".dot");
  // Ajouter un ecouteur d'evenement pour chaque dot
  dots.forEach((dot, key) => dot.addEventListener("click", () => slideTo(key)));
  // Ecouteur pour le bouton prev
  prev.addEventListener("click", () => slideTo(--currentSlide));
  // Ecouteur pour le bouton next
  next.addEventListener("click", () => slideTo(++currentSlide));
  // Interval pour afficher les slides
  intervalId = setInterval(showSlide, slideTimeout);

  // Ecouteur pour les interactions avec la souris et le toucher
  slides.forEach((slide) => {
    let startX;
    let endX;
    // Efface l'intervalle d'affichage des slides lorsque la souris passe sur un slide
    slide.addEventListener(
      "mouseover",
      () => {
        clearInterval(intervalId);
      },
      false
    );
    // Reinitialise l'intervalle d'affichage des slides lorsque la souris quitte le slide
    slide.addEventListener(
      "mouseout",
      () => {
        intervalId = setInterval(showSlide, slideTimeout);
      },
      false
    );
    // Recuperer la position de depart du toucher
    slide.addEventListener("touchstart", (event) => {
      startX = event.touches[0].clientX;
    });
    // Recuperer la position de fin du toucher
    slide.addEventListener("touchend", (event) => {
      endX = event.changedTouches[0].clientX;
      // Si la position initiale est plus grande que la position finale, affiche le prochain slide
      if (startX > endX) {
        slideTo(currentSlide + 1);
      } else if (startX < endX) {
        slideTo(currentSlide - 1);
      }
    });
  });
})();
