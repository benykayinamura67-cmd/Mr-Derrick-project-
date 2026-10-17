document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const html = document.documentElement;

    // Theme
    const themeToggle = document.getElementById("themeToggle");
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");

    // Menu
    const menuButton = document.getElementById("menuButton");
    const menuPanel = document.getElementById("menuPanel");

    // Navbar
    const navbar = document.getElementById("navbar");

    // Back to top
    const backToTop = document.getElementById("backToTop");

    // Image lightbox
    const imageLightbox =
        document.getElementById("imageLightbox");


    /* =====================================================
       THEME
    ===================================================== */

    function updateThemeIcon() {

        const isLight =
            html.classList.contains("light-theme");


        /* Sun icon */

        if (sunIcon) {

            sunIcon.classList.toggle(
                "hidden",
                isLight
            );

        }


        /* Moon icon */

        if (moonIcon) {

            moonIcon.classList.toggle(
                "hidden",
                !isLight
            );

        }


        /* Accessibility */

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

        }

    }


    function loadTheme() {

        const savedTheme =
            localStorage.getItem("schoolTheme");


        if (savedTheme === "light") {

            html.classList.add("light-theme");

        } else {

            html.classList.remove("light-theme");

        }


        updateThemeIcon();

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    html.classList.toggle(
                        "light-theme"
                    );


                localStorage.setItem(
                    "schoolTheme",
                    isLight
                        ? "light"
                        : "dark"
                );


                updateThemeIcon();

            }
        );

    }


    /* Load saved theme */

    loadTheme();



    /* =====================================================
       HAMBURGER MENU
    ===================================================== */

    function openMenu() {

        if (!menuButton || !menuPanel) {
            return;
        }


        /* Show menu */

        menuPanel.classList.remove(
            "opacity-0",
            "invisible",
            "translate-y-2",
            "pointer-events-none"
        );


        menuPanel.classList.add(
            "opacity-100",
            "visible",
            "translate-y-0",
            "pointer-events-auto"
        );


        /* Update button */

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );


        menuButton.setAttribute(
            "aria-label",
            "Close navigation menu"
        );


        /* Animate hamburger */

        const menuLines =
            menuButton.querySelectorAll(
                ".menu-line"
            );


        if (menuLines.length === 3) {

            menuLines[0].classList.add(
                "rotate-45",
                "translate-y-2"
            );

            menuLines[1].classList.add(
                "opacity-0"
            );

            menuLines[2].classList.add(
                "-rotate-45",
                "-translate-y-2"
            );

        }

    }


    function closeMenu() {

        if (!menuButton || !menuPanel) {
            return;
        }


        /* Hide menu */

        menuPanel.classList.remove(
            "opacity-100",
            "visible",
            "translate-y-0",
            "pointer-events-auto"
        );


        menuPanel.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-2",
            "pointer-events-none"
        );


        /* Update button */

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        /* Reset hamburger */

        const menuLines =
            menuButton.querySelectorAll(
                ".menu-line"
            );


        if (menuLines.length === 3) {

            menuLines[0].classList.remove(
                "rotate-45",
                "translate-y-2"
            );

            menuLines[1].classList.remove(
                "opacity-0"
            );

            menuLines[2].classList.remove(
                "-rotate-45",
                "-translate-y-2"
            );

        }

    }


    function toggleMenu() {

        if (!menuButton || !menuPanel) {
            return;
        }


        const isOpen =
            menuButton.getAttribute(
                "aria-expanded"
            ) === "true";


        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    /* Menu button */

    if (menuButton && menuPanel) {

        menuButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                toggleMenu();

            }
        );


        /* =============================================
           MENU LINKS
        ============================================= */

        const menuLinks =
            menuPanel.querySelectorAll("a");


        menuLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        });


        /* =============================================
           CLICK OUTSIDE
        ============================================= */

        document.addEventListener(
            "click",
            (event) => {

                if (
                    !menuPanel.contains(
                        event.target
                    ) &&
                    !menuButton.contains(
                        event.target
                    )
                ) {

                    closeMenu();

                }

            }
        );


        /* =============================================
           ESCAPE KEY
        ============================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    closeMenu();

                }

            }
        );

    }



    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function handleNavbarScroll() {

        if (!navbar) {
            return;
        }


        if (window.scrollY > 50) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbarScroll
    );


    handleNavbarScroll();



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backToTop) {


        function updateBackToTop() {

            if (window.scrollY > 500) {

                backToTop.classList.remove(
                    "opacity-0",
                    "pointer-events-none"
                );


                backToTop.classList.add(
                    "opacity-100"
                );

            } else {

                backToTop.classList.add(
                    "opacity-0",
                    "pointer-events-none"
                );


                backToTop.classList.remove(
                    "opacity-100"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateBackToTop
        );


        updateBackToTop();


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =====================================================
       IMAGE LIGHTBOX
    ===================================================== */

    if (imageLightbox) {

        const lightboxImage =
            imageLightbox.querySelector("img");


        const closeLightbox =
            imageLightbox.querySelector(
                ".close-lightbox"
            );


        const galleryImages =
            document.querySelectorAll(
                "[data-lightbox]"
            );


        /* =============================================
           OPEN IMAGE
        ============================================= */

        galleryImages.forEach(image => {

            image.addEventListener(
                "click",
                () => {

                    if (lightboxImage) {

                        lightboxImage.src =
                            image.src;


                        lightboxImage.alt =
                            image.alt ||
                            "Campus image";

                    }


                    imageLightbox.classList.remove(
                        "hidden"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


        /* =============================================
           CLOSE IMAGE
        ============================================= */

        function closeImageLightbox() {

            imageLightbox.classList.add(
                "hidden"
            );


            document.body.style.overflow =
                "";

        }


        /* Close button */

        if (closeLightbox) {

            closeLightbox.addEventListener(
                "click",
                closeImageLightbox
            );

        }


        /* Click outside image */

        imageLightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    imageLightbox
                ) {

                    closeImageLightbox();

                }

            }
        );


        /* Escape */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    !imageLightbox.classList.contains(
                        "hidden"
                    )
                ) {

                    closeImageLightbox();

                }

            }
        );

    }



    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    }



    /* =====================================================
       PAGE LOADED
    ===================================================== */

    console.log(
        "Partnership page JavaScript loaded successfully."
    );

});