
/* =====================================================
   THEME | MOBILE MENU | EDITORIAL CAROUSEL
===================================================== */

// 1. DARK / LIGHT THEME
document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const sun = document.getElementById("sunIcon");
    const moon = document.getElementById("moonIcon");

    if (toggle) {
        // Restore the saved theme
        if (localStorage.getItem("rsh-theme") === "light") {
            root.classList.add("light-theme");
        } else {
            root.classList.remove("light-theme");
        }

        function updateTheme() {
            const light = root.classList.contains("light-theme");

            sun?.classList.toggle("hidden", light);
            moon?.classList.toggle("hidden", !light);

            const label = `Switch to ${light ? "dark" : "light"} mode`;
            toggle.setAttribute("aria-label", label);
            toggle.setAttribute("title", label);
        }

        toggle.addEventListener("click", () => {
            const light = root.classList.toggle("light-theme");

            localStorage.setItem(
                "rsh-theme",
                light ? "light" : "dark"
            );

            updateTheme();
        });

        updateTheme();
    }

    // 2. RESPONSIVE HAMBURGER MENU
    const button = document.getElementById("menuButton");
    const panel = document.getElementById("menuPanel");

    if (!button || !panel) return;

    const lines = button.querySelectorAll(".menu-line");

    function setMenu(open) {
        // Update the menu panel
        panel.classList.toggle("menu-open", open);

        // Update accessibility
        button.setAttribute("aria-expanded", String(open));
        button.setAttribute(
            "aria-label",
            open ? "Close navigation menu" : "Open navigation menu"
        );

        // Animate hamburger into an X
        if (lines.length >= 3) {
            lines[0].style.transform = open
                ? "translateY(5px) rotate(45deg)"
                : "";

            lines[1].style.opacity = open ? "0" : "1";

            lines[2].style.transform = open
                ? "translateY(-5px) rotate(-45deg)"
                : "";
        }
    }

    button.addEventListener("click", () => {
        const isOpen =
            button.getAttribute("aria-expanded") === "true";

        setMenu(!isOpen);
    });

    // Close the menu after choosing a link
    panel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });

    // Close when clicking outside the menu
    document.addEventListener("click", (event) => {
        if (
            !button.contains(event.target) &&
            !panel.contains(event.target)
        ) {
            setMenu(false);
        }
    });

    // Close with Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenu(false);
        }
    });

    // Ensure the menu starts closed
    setMenu(false);
});
// 3. EDITORIAL IMAGE CAROUSEL
(() => {
    const carousel = document.getElementById("heroEditorialCarousel");
    if (!carousel || carousel.dataset.initialized === "true") return;

    const slides = [...carousel.querySelectorAll(".hero-carousel-slide")];
    const prev = carousel.querySelector(".hero-carousel-prev");
    const next = carousel.querySelector(".hero-carousel-next");
    const counter = document.getElementById("heroSlideCurrent");

    if (!slides.length || !prev || !next) return;
    carousel.dataset.initialized = "true";

    let index = Math.max(0, slides.findIndex(s => s.classList.contains("is-active")));

    function showSlide(i) {
        index = (i + slides.length) % slides.length;

        slides.forEach((slide, n) => {
            const active = n === index;
            slide.classList.toggle("is-active", active);
            slide.setAttribute("aria-hidden", String(!active));
        });

        if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    }

    prev.addEventListener("click", () => showSlide(index - 1));
    next.addEventListener("click", () => showSlide(index + 1));

    let startX = 0, startY = 0;

    carousel.addEventListener("touchstart", e => {
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
    }, { passive: true });

    carousel.addEventListener("touchend", e => {
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;

        if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy))
            showSlide(index + (dx < 0 ? 1 : -1));
    }, { passive: true });

    showSlide(index);
})();

"use strict";

/* =========================================================
   NOAH'S ARK — MAIN HOMEPAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. INITIALIZE LUCIDE ICONS
    ===================================================== */

    if (window.lucide) {
        window.lucide.createIcons();
    }


    /* =====================================================
       2. MOBILE NAVIGATION MENU
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const menuPanel = document.getElementById("menuPanel");

    function closeMobileMenu() {
        if (!menuButton || !menuPanel) return;

        menuPanel.classList.add("pointer-events-none", "opacity-0", "translate-y-2");
        menuPanel.classList.remove("pointer-events-auto", "opacity-100", "translate-y-0");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }

    function openMobileMenu() {
        if (!menuButton || !menuPanel) return;

        menuPanel.classList.remove("pointer-events-none", "opacity-0", "translate-y-2");
        menuPanel.classList.add("pointer-events-auto", "opacity-100", "translate-y-0");

        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation menu");
    }

    if (menuButton && menuPanel) {
        menuButton.addEventListener("click", () => {
            const isExpanded =
                menuButton.getAttribute("aria-expanded") === "true";

            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        menuPanel.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });

        document.addEventListener("click", event => {
            if (
                menuButton.getAttribute("aria-expanded") === "true" &&
                !menuButton.contains(event.target) &&
                !menuPanel.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });
    }


    /* =====================================================
       3. NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("nav-scrolled", "shadow-xl");
        } else {
            navbar.classList.remove("nav-scrolled", "shadow-xl");
        }
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    /* =====================================================
       4. THEME TOGGLE
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLight =
                document.body.classList.toggle("light-mode");

            if (sunIcon) {
                sunIcon.classList.toggle("hidden", isLight);
            }

            if (moonIcon) {
                moonIcon.classList.toggle("hidden", !isLight);
            }

            themeToggle.setAttribute(
                "aria-label",
                isLight ? "Switch to dark mode" : "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                isLight ? "Switch to dark mode" : "Switch to light mode"
            );
        });
    }


    /* =====================================================
       5. SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }


    /* =====================================================
       6. HERO EDITORIAL TEXT SLIDER
    ===================================================== */

    const heroTextSlides = document.querySelectorAll(
        "#heroTextSlider .hero-text-slide"
    );

    const heroSlideNumber =
        document.getElementById("heroSlideNumber");

    if (heroTextSlides.length > 0) {
        let currentSlide = 0;
        let transitionTimeout;

        // Normalize the initial slide.
        heroTextSlides.forEach((slide, index) => {
            slide.classList.remove("leaving");
            slide.classList.toggle("active", index === 0);
        });

        if (heroSlideNumber) {
            heroSlideNumber.textContent = "01";
        }

        function showNextHeroTextSlide() {
            const current = heroTextSlides[currentSlide];

            current.classList.remove("active");
            current.classList.add("leaving");

            currentSlide = (currentSlide + 1) % heroTextSlides.length;

            const next = heroTextSlides[currentSlide];

            clearTimeout(transitionTimeout);

            transitionTimeout = setTimeout(() => {
                current.classList.remove("leaving");
                next.classList.add("active");

                if (heroSlideNumber) {
                    heroSlideNumber.textContent =
                        String(currentSlide + 1).padStart(2, "0");
                }
            }, 180);
        }

        window.setInterval(showNextHeroTextSlide, 5500);
    }


    /* =====================================================
       7. HERO IMAGE CAROUSEL
    ===================================================== */

    const heroCarousel =
        document.getElementById("heroEditorialCarousel");

    if (heroCarousel) {
        const heroImageSlides = heroCarousel.querySelectorAll(
            ".hero-carousel-slide"
        );

        const heroImageCurrent =
            document.getElementById("heroSlideCurrent");

        const previousButton = heroCarousel.querySelector(
            ".hero-carousel-prev"
        );

        const nextButton = heroCarousel.querySelector(
            ".hero-carousel-next"
        );

        if (heroImageSlides.length > 0) {
            let currentImage = 0;

            function showHeroImage(index) {
                currentImage =
                    (index + heroImageSlides.length) %
                    heroImageSlides.length;

                heroImageSlides.forEach((slide, slideIndex) => {
                    slide.classList.toggle(
                        "is-active",
                        slideIndex === currentImage
                    );
                });

                if (heroImageCurrent) {
                    heroImageCurrent.textContent =
                        String(currentImage + 1).padStart(2, "0");
                }
            }

            previousButton?.addEventListener("click", () => {
                showHeroImage(currentImage - 1);
            });

            nextButton?.addEventListener("click", () => {
                showHeroImage(currentImage + 1);
            });

            showHeroImage(0);

            window.setInterval(() => {
                showHeroImage(currentImage + 1);
            }, 5500);
        }
    }


    /* =====================================================
       8. FOOTER COPYRIGHT YEAR
    ===================================================== */

    const footerCopyrightYear =
        document.getElementById("footerCopyrightYear");

    if (footerCopyrightYear) {
        footerCopyrightYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       9. NEWSLETTER FORM
       FRONTEND DEMONSTRATION ONLY
    ===================================================== */

    const newsletterForm =
        document.getElementById("footerNewsletterForm");

    const newsletterEmail =
        document.getElementById("footerNewsletterEmail");

    const newsletterMessage =
        document.getElementById("footerNewsletterMessage");

    if (newsletterForm && newsletterEmail && newsletterMessage) {
        newsletterForm.addEventListener("submit", event => {
            event.preventDefault();

            const email = newsletterEmail.value.trim();

            if (!email || !newsletterEmail.checkValidity()) {
                newsletterMessage.textContent =
                    "Please enter a valid email address.";

                newsletterMessage.classList.remove(
                    "hidden",
                    "text-emerald-400"
                );

                newsletterMessage.classList.add("text-red-400");
                newsletterEmail.focus();

                return;
            }

            newsletterMessage.textContent =
                "Thank you! The newsletter form is working in demonstration mode. Subscription has not been saved.";

            newsletterMessage.classList.remove(
                "hidden",
                "text-red-400"
            );

            newsletterMessage.classList.add("text-emerald-400");

            newsletterForm.reset();
        });
    }


    /* =====================================================
       10. APPLICATION POPUP
    ===================================================== */

    const popup = document.getElementById("applyPopup");
    const popupCard = document.getElementById("applyPopupCard");
    const closePopupButton = document.getElementById("closeApplyPopup");
    const maybeLaterButton = document.getElementById("maybeLaterBtn");

    let popupTimer;
    let popupCloseTimer;

    function openApplyPopup() {
        if (!popup || !popupCard) return;

        clearTimeout(popupCloseTimer);

        popup.classList.remove("hidden");
        popup.classList.add("flex");
        popup.setAttribute("aria-hidden", "false");

        document.body.classList.add("overflow-hidden");

        requestAnimationFrame(() => {
            popupCard.classList.remove("opacity-0", "scale-95");
            popupCard.classList.add("opacity-100", "scale-100");
        });
    }

    function closeApplyPopup() {
        if (!popup || !popupCard) return;

        clearTimeout(popupCloseTimer);

        popupCard.classList.remove("opacity-100", "scale-100");
        popupCard.classList.add("opacity-0", "scale-95");

        popupCloseTimer = window.setTimeout(() => {
            popup.classList.remove("flex");
            popup.classList.add("hidden");
            popup.setAttribute("aria-hidden", "true");

            document.body.classList.remove("overflow-hidden");
        }, 300);
    }

    if (popup && popupCard) {
        popupTimer = window.setTimeout(openApplyPopup, 1200);

        closePopupButton?.addEventListener(
            "click",
            closeApplyPopup
        );

        maybeLaterButton?.addEventListener(
            "click",
            closeApplyPopup
        );

        popup.addEventListener("click", event => {
            if (event.target === popup) {
                closeApplyPopup();
            }
        });

        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                popup.getAttribute("aria-hidden") === "false"
            ) {
                closeApplyPopup();
            }
        });
    }

    // The Apply Now link navigates normally; no extra
    // click handler is needed to close the popup.

});