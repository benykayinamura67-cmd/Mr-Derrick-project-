
/* =========================================================
   NOAH'S ARK — EXPERIENCE / PROGRAMS PAGE JAVASCRIPT
   Navigation • Theme • Programs • Inquiries • Footer
========================================================= */

(() => {
    "use strict";

    /* =====================================================
       01. ELEMENT SELECTORS & GLOBAL STATE
    ===================================================== */

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

    const html = document.documentElement;
    const body = document.body;
    const navbar = $("#navbar");
    const menuButton = $("#menuButton");
    const menuPanel = $("#menuPanel");

    // Header and footer theme controls share one theme system.
    const themeButtons = $$(
        '[data-theme-toggle], #themeToggle, #footerThemeToggle'
    );
    const sunIcons = $$(
        '#sunIcon, #footerSunIcon, [data-theme-icon="sun"]'
    );
    const moonIcons = $$(
        '#moonIcon, #footerMoonIcon, [data-theme-icon="moon"]'
    );

    const programModal = $("#programModal");
    const inquiryModal = $("#inquiryModal");
    const toast = $("#toast");

    const footer = $("#siteFooter") || $("#contact") || $("footer");
    const footerColorToggle = $("#footerColorToggle");
    const footerColorPanel = $("#footerColorPanel");

    const backToTop = $("#backToTopFloating");
    const footerBackToTop = $("#footerBackToTop");

    let currentProgram = null;
    let lastFocusedElement = null;
    let toastTimer;
    let activeModal = null;

    /* =====================================================
       02. SAFE LOCAL STORAGE
    ===================================================== */

    function readStorage(key, fallback = null) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : value;
        } catch {
            return fallback;
        }
    }

    function writeStorage(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch {
            return false;
        }
    }

    /* =====================================================
       03. LUCIDE ICON REFRESH
    ===================================================== */

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    /* =====================================================
       04. TOAST NOTIFICATIONS
    ===================================================== */

    function showToast(message) {
        if (!toast) {
            console.info(message);
            return;
        }

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    /* =====================================================
       05. MOBILE NAVIGATION
    ===================================================== */

    function setMenu(open) {
        if (!menuButton || !menuPanel) return;

        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute(
            "aria-label",
            open ? "Close navigation menu" : "Open navigation menu"
        );

        menuPanel.classList.toggle("opacity-0", !open);
        menuPanel.classList.toggle("scale-95", !open);
        menuPanel.classList.toggle("pointer-events-none", !open);

        menuPanel.classList.toggle("opacity-100", open);
        menuPanel.classList.toggle("scale-100", open);
        menuPanel.classList.toggle("pointer-events-auto", open);
    }

    function closeMenu() {
        setMenu(false);
    }

    menuButton?.addEventListener("click", event => {
        event.stopPropagation();

        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("click", event => {
        if (
            menuPanel &&
            menuButton &&
            !menuPanel.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }
    });

    $$("#menuPanel a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) closeMenu();
    });

    /* =====================================================
       06. GLOBAL LIGHT / DARK THEME
       Header and footer controls stay synchronized.
       Saved preference: schoolTheme
    ===================================================== */

    function applyTheme(theme) {
        const isLight = theme === "light";
        const selectedTheme = isLight ? "light" : "dark";

        // Apply the theme to the entire document.
        html.classList.toggle("light-mode", isLight);
        body.classList.toggle("light-mode", isLight);

        // Show the appropriate icon on every theme button.
        // Sun = switch to light; moon = switch to dark.
        sunIcons.forEach(icon => {
            icon.classList.toggle("hidden", isLight);
        });

        moonIcons.forEach(icon => {
            icon.classList.toggle("hidden", !isLight);
        });

        // Synchronize every header/footer theme button.
        themeButtons.forEach(button => {
            const label = isLight
                ? "Switch to dark mode"
                : "Switch to light mode";

            button.setAttribute("aria-label", label);
            button.setAttribute("title", label);
            button.setAttribute("aria-pressed", String(isLight));
        });

        // Remember the preference after refresh.
        writeStorage("schoolTheme", selectedTheme);
    }

    // Load the previously selected theme.
    applyTheme(readStorage("schoolTheme", "dark"));

    // Every theme button controls the same page-wide theme.
    themeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const isLight = html.classList.contains("light-mode");

            applyTheme(isLight ? "dark" : "light");
        });
    });

    /* =====================================================
       07. PROGRAM DATA
    ===================================================== */

    const programData = {
        trades: {
            number: "PROGRAM 01",
            title: "Trades Offered",
            description:
                "Explore practical and professional training areas available through the school's trade programs.",
            items: [
                "Practical hospitality training",
                "Professional workplace skills",
                "Service-oriented learning",
                "Industry-focused preparation"
            ]
        },

        service: {
            number: "PROGRAM 02",
            title: "Food & Beverage Service",
            description:
                "Develop knowledge and practical skills connected to serving food and beverages in hospitality settings.",
            items: [
                "Restaurant service fundamentals",
                "Guest service techniques",
                "Food and beverage presentation",
                "Professional service standards"
            ]
        },

        operation: {
            number: "PROGRAM 03",
            title: "Food & Beverage Operation",
            description:
                "Build an understanding of food and beverage operations within the hospitality industry.",
            items: [
                "Food and beverage operations",
                "Hospitality workflow",
                "Operational planning",
                "Service quality and standards"
            ]
        },

        tourism: {
            number: "PROGRAM 04",
            title: "Tourism",
            description:
                "Discover tourism and develop knowledge related to travel and visitor experiences.",
            items: [
                "Tourism fundamentals",
                "Travel and visitor experiences",
                "Destination awareness",
                "Professional tourism skills"
            ]
        }
    };

    /* =====================================================
       08. MODAL UTILITIES
    ===================================================== */

    function syncModalLock() {
        const hasOpenModal = [programModal, inquiryModal].some(modal =>
            modal?.classList.contains("active")
        );

        body.classList.toggle("modal-open", hasOpenModal);
    }

    function openModal(modal) {
        if (!modal) return;

        if (!activeModal) {
            lastFocusedElement = document.activeElement;
        }

        activeModal = modal;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        syncModalLock();
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        if (activeModal === modal) {
            activeModal = null;
        }

        syncModalLock();

        if (
            lastFocusedElement?.isConnected &&
            typeof lastFocusedElement.focus === "function"
        ) {
            lastFocusedElement.focus();
        }
    }

    /* =====================================================
       09. PROGRAM DETAILS MODAL
    ===================================================== */

    function openProgramModal(programId) {
        const program = programData[programId];

        if (!program || !programModal) return;

        currentProgram = programId;

        const number = $("#modalProgramNumber");
        const title = $("#programModalTitle");
        const description = $("#programModalDescription");
        const list = $("#programModalList");

        if (number) number.textContent = program.number;
        if (title) title.textContent = program.title;
        if (description) description.textContent = program.description;

        if (list) {
            list.replaceChildren();

            program.items.forEach(item => {
                const li = document.createElement("li");

                li.className =
                    "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3.5 text-sm text-white/65";

                const iconWrap = document.createElement("span");

                iconWrap.className =
                    "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold";

                const icon = document.createElement("i");

                icon.setAttribute("data-lucide", "check");
                icon.className = "h-3.5 w-3.5";
                iconWrap.appendChild(icon);

                const text = document.createElement("span");
                text.textContent = item;

                li.append(iconWrap, text);
                list.appendChild(li);
            });
        }

        openModal(programModal);
        refreshIcons();
        $("#closeProgramModal")?.focus();
    }

    function closeProgramModal() {
        closeModal(programModal);
    }

    $$("[data-open-program]").forEach(button => {
        button.addEventListener("click", () => {
            openProgramModal(button.dataset.openProgram);
        });
    });

    $("#closeProgramModal")?.addEventListener("click", closeProgramModal);
    $("#modalCloseSecondary")?.addEventListener("click", closeProgramModal);

    programModal?.addEventListener("click", event => {
        if (event.target === programModal) closeProgramModal();
    });

    /* =====================================================
       10. INQUIRY MODAL
    ===================================================== */

    function openInquiryModal(selectedProgram = "General inquiry") {
        if (!inquiryModal) {
            showToast("The inquiry form is not available on this page.");
            return;
        }

        const select = $("#inquiryProgram");

        if (select) {
            select.value = [...select.options].some(option =>
                option.value === selectedProgram
            )
                ? selectedProgram
                : "General inquiry";
        }

        $("#inquirySuccess")?.classList.add("hidden");

        openModal(inquiryModal);
        $("#inquiryName")?.focus();
    }

    function closeInquiryModal() {
        closeModal(inquiryModal);
    }

    $("#closeInquiryModal")?.addEventListener("click", closeInquiryModal);

    inquiryModal?.addEventListener("click", event => {
        if (event.target === inquiryModal) closeInquiryModal();
    });

    $$("[data-open-inquiry]").forEach(button => {
        button.addEventListener("click", () => {
            closeMenu();
            openInquiryModal();
        });
    });

    $("#ctaEnquire")?.addEventListener("click", () => {
        openInquiryModal();
    });

    $("#mobileEnquireButton")?.addEventListener("click", () => {
        closeMenu();
        openInquiryModal();
    });

    $("#modalEnquireButton")?.addEventListener("click", () => {
        const program = programData[currentProgram];

        closeProgramModal();
        openInquiryModal(program?.title || "General inquiry");
    });

    /* =====================================================
       11. FOOTER PROGRAM LINKS
    ===================================================== */

    $$("[data-footer-program]").forEach(button => {
        button.addEventListener("click", () => {
            openProgramModal(button.dataset.footerProgram);
        });
    });

    /* =====================================================
       12. INQUIRY FORM & BROWSER STORAGE
       Note: this saves inquiries locally; it does not email them.
    ===================================================== */

    $("#inquiryForm")?.addEventListener("submit", event => {
        event.preventDefault();

        const name = $("#inquiryName")?.value.trim() || "";
        const email = $("#inquiryEmail")?.value.trim() || "";
        const program = $("#inquiryProgram")?.value || "";
        const message = $("#inquiryMessage")?.value.trim() || "";

        if (!name || !email || !program || !message) {
            showToast("Please complete all required fields.");
            return;
        }

        const inquiry = {
            name,
            email,
            program,
            message,
            submittedAt: new Date().toISOString()
        };

        let inquiries = [];

        try {
            const stored = JSON.parse(
                readStorage("schoolInquiries", "[]")
            );

            inquiries = Array.isArray(stored) ? stored : [];
        } catch {
            inquiries = [];
        }

        inquiries.push(inquiry);

        if (!writeStorage("schoolInquiries", JSON.stringify(inquiries))) {
            showToast("Unable to save this inquiry in your browser.");
            return;
        }

        $("#inquirySuccess")?.classList.remove("hidden");
        event.target.reset();

        showToast("Inquiry saved in this browser. It has not been emailed.");
    });

    /* =====================================================
       13. PROGRAM SEARCH & FILTERS
    ===================================================== */

    const cards = $$(".program-card");
    const filterButtons = $$(".filter-button");
    const searchInput = $("#programSearch");
    const emptyState = $("#emptyState");
    const resultMessage = $("#programResultMessage");

    let activeFilter = "all";

    function filterPrograms() {
        const search = searchInput?.value.trim().toLowerCase() || "";
        let visibleCount = 0;

        cards.forEach(card => {
            const category = card.dataset.category || "";
            const searchable =
                `${card.dataset.search || ""} ${card.textContent || ""}`
                    .toLowerCase();

            const visible =
                (activeFilter === "all" || category === activeFilter) &&
                searchable.includes(search);

            card.classList.toggle("hidden", !visible);

            if (visible) visibleCount++;
        });

        emptyState?.classList.toggle("hidden", visibleCount !== 0);

        if (resultMessage) {
            const showResults = Boolean(search || activeFilter !== "all");

            resultMessage.textContent =
                `${visibleCount} program${visibleCount === 1 ? "" : "s"} found`;

            resultMessage.classList.toggle("hidden", !showResults);
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.filter || "all";

            filterButtons.forEach(item => {
                const selected = item === button;

                item.classList.toggle("active", selected);
                item.setAttribute("aria-pressed", String(selected));
            });

            filterPrograms();
        });
    });

    searchInput?.addEventListener("input", filterPrograms);

    $("#clearSearch")?.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";

        activeFilter = "all";

        filterButtons.forEach(button => {
            const selected = button.dataset.filter === "all";

            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        filterPrograms();
    });

    /* =====================================================
       14. LANGUAGE BUTTONS
    ===================================================== */

    $("#englishButton")?.addEventListener("click", () => {
        showToast("English interface selected.");
    });

    $("#frenchButton")?.addEventListener("click", () => {
        showToast("French interface is not yet translated.");
    });

    /* =====================================================
       15. NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {
        navbar?.classList.toggle(
            "translate-y-[-3px]",
            window.scrollY > 35
        );
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();

    /* =====================================================
       16. BACK-TO-TOP BUTTONS
    ===================================================== */

    function updateBackToTop() {
        backToTop?.classList.toggle("visible", window.scrollY > 500);
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    backToTop?.addEventListener("click", scrollToTop);
    footerBackToTop?.addEventListener("click", scrollToTop);

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    /* =====================================================
       17. FOOTER COLOR CUSTOMIZER
       Separate from the light/dark theme toggle.
    ===================================================== */

    const footerThemes = ["gold", "emerald", "black", "burgundy", "navy"];

    function applyFooterTheme(theme) {
        if (!footer || !footerThemes.includes(theme)) return;

        footerThemes.forEach(name => {
            footer.classList.remove(`footer-${name}`);
        });

        footer.classList.add(`footer-${theme}`);
        writeStorage("schoolFooterTheme", theme);

        $$("[data-footer-theme]").forEach(button => {
            const selected = button.dataset.footerTheme === theme;

            button.classList.toggle("ring-2", selected);
            button.classList.toggle("ring-gold", selected);
            button.setAttribute("aria-pressed", String(selected));
        });
    }

    applyFooterTheme(readStorage("schoolFooterTheme", "gold"));

    footerColorToggle?.addEventListener("click", event => {
        event.stopPropagation();

        if (!footerColorPanel) return;

        const open = footerColorPanel.classList.contains("hidden");

        footerColorPanel.classList.toggle("hidden", !open);
        footerColorToggle.setAttribute("aria-expanded", String(open));
    });

    $$("[data-footer-theme]").forEach(button => {
        button.addEventListener("click", () => {
            applyFooterTheme(button.dataset.footerTheme);

            footerColorPanel?.classList.add("hidden");
            footerColorToggle?.setAttribute("aria-expanded", "false");

            showToast("Footer color updated.");
        });
    });

    document.addEventListener("click", event => {
        if (
            footerColorPanel &&
            footerColorToggle &&
            !footerColorPanel.contains(event.target) &&
            !footerColorToggle.contains(event.target)
        ) {
            footerColorPanel.classList.add("hidden");
            footerColorToggle.setAttribute("aria-expanded", "false");
        }
    });

    /* =====================================================
       18. AUTOMATIC FOOTER COPYRIGHT YEAR
    ===================================================== */

    const footerYear = $("#footerYear");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    /* =====================================================
       19. ESCAPE KEY CONTROLS
    ===================================================== */

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        if (programModal?.classList.contains("active")) {
            closeProgramModal();
        } else if (inquiryModal?.classList.contains("active")) {
            closeInquiryModal();
        } else {
            closeMenu();

            footerColorPanel?.classList.add("hidden");
            footerColorToggle?.setAttribute("aria-expanded", "false");
        }
    });

    /* =====================================================
       20. INITIALIZE PAGE FEATURES
    ===================================================== */

    setMenu(false);
    filterPrograms();
    refreshIcons();

})();
