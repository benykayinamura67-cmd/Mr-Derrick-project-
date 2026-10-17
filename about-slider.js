document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("aboutSlider");
    const track = document.getElementById("aboutSliderTrack");

    const prevButton = document.getElementById("aboutPrev");
    const nextButton = document.getElementById("aboutNext");

    const dotsContainer =
        document.getElementById("aboutSliderDots");

    const currentSlide =
        document.getElementById("aboutCurrentSlide");

    const totalSlides =
        document.getElementById("aboutTotalSlides");


    /* =========================================================
       CHECK SLIDER
    ========================================================= */

    if (!slider) {
        console.error("aboutSlider was not found.");
        return;
    }

    if (!track) {
        console.error("aboutSliderTrack was not found.");
        return;
    }


    /* =========================================================
       GET SLIDES
    ========================================================= */

    const slides = track.querySelectorAll("img");

    const total = slides.length;

    let currentIndex = 0;

    let autoSlide;


    console.log("About slider loaded.");
    console.log("Number of slides:", total);


    /* =========================================================
       SET TOTAL
    ========================================================= */

    totalSlides.textContent =
        String(total).padStart(2, "0");


    /* =========================================================
       CREATE DOTS
    ========================================================= */

    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.type = "button";

  dot.className = 
    "h-1.5 w-2 rounded-full " + 
    "bg-white/40 transition-all duration-300";

        dot.addEventListener("click", () => {

            goToSlide(index);

            restartAutoSlide();

        });

        dotsContainer.appendChild(dot);

    });


    const dots =
        dotsContainer.querySelectorAll("button");


    /* =========================================================
       UPDATE SLIDER
    ========================================================= */

    function updateSlider() {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;


        currentSlide.textContent =
            String(currentIndex + 1).padStart(2, "0");


        dots.forEach((dot, index) => {

            if (index === currentIndex) {

                dot.classList.remove(
                    "bg-white/40",
                    "w-2"
                );

                dot.classList.add(
                    "bg-[#D6B56A]",
                    "w-6"
                );

            } else {

                dot.classList.remove(
                    "bg-[#D6B56A]",
                    "w-6"
                );

                dot.classList.add(
                    "bg-white/40",
                    "w-2"
                );

            }

        });

    }


    /* =========================================================
       GO TO SLIDE
    ========================================================= */

    function goToSlide(index) {

        currentIndex = index;

        updateSlider();

    }


    /* =========================================================
       NEXT
    ========================================================= */

    function nextSlide() {

        currentIndex++;

        if (currentIndex >= total) {

            currentIndex = 0;

        }

        updateSlider();

    }


    /* =========================================================
       PREVIOUS
    ========================================================= */

    function previousSlide() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex = total - 1;

        }

        updateSlider();

    }


    /* =========================================================
       AUTOMATIC SLIDE
    ========================================================= */

function startAutoSlide() {

    autoSlide = setInterval(() => {

        nextSlide();

    }, 2500);

}


    /* =========================================================
       RESTART AUTO SLIDE
    ========================================================= */

    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    /* =========================================================
       BUTTONS
    ========================================================= */

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            nextSlide();

            restartAutoSlide();

        });

    }


    if (prevButton) {

        prevButton.addEventListener("click", () => {

            previousSlide();

            restartAutoSlide();

        });

    }


    /* =========================================================
       PAUSE WHEN HOVERING
    ========================================================= */

    slider.addEventListener("mouseenter", () => {

        clearInterval(autoSlide);

    });


    /* =========================================================
       RESUME AFTER HOVER
    ========================================================= */

    slider.addEventListener("mouseleave", () => {

        startAutoSlide();

    });


    /* =========================================================
       START
    ========================================================= */

    updateSlider();

    startAutoSlide();

});