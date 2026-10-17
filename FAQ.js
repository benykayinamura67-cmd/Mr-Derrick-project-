
/* =========================================================
   RWANDA SCHOOL OF HOSPITALITY
   FAQ PAGE JAVASCRIPT
   File: ../JS/FAQ.js
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. DOM ELEMENTS
    ====================================================== */

    const html = document.documentElement;
    const body = document.body;

    const navbar = document.getElementById("mainNavbar");
    const menuToggle = document.getElementById("menuToggle");
    const menuIcon = document.getElementById("menuIcon");
    const navigationMenu = document.getElementById("navigationMenu");

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const faqSearch = document.getElementById("faqSearch");
    const faqCategories = Array.from(
        document.querySelectorAll(".faq-category")
    );
    const faqGroups = Array.from(
        document.querySelectorAll(".faq-group")
    );
    const faqItems = Array.from(
        document.querySelectorAll(".faq-item")
    );
    const searchResultsInfo = document.getElementById("searchResultsInfo");
    const faqEmptyState = document.getElementById("faqEmptyState");

    const inquiryModal = document.getElementById("inquiryModal");
    const inquiryForm = document.getElementById("inquiryForm");
    const inquiryStatus = document.getElementById("inquiryStatus");
    const openInquiryButton = document.getElementById("openInquiry");
    const closeInquiryButton = document.getElementById("closeInquiry");
    const menuEnquire = document.getElementById("menuEnquire");
    const emptyStateEnquire = document.getElementById("emptyStateEnquire");

    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");
    const newsletterStatus = document.getElementById("newsletterStatus");

    const footer = document.getElementById("footer");
    const footerCustomizerToggle =
        document.getElementById("footerCustomizerToggle");
    const footerColorPanel = document.getElementById("footerColorPanel");
    const footerSwatches = Array.from(
        document.querySelectorAll(".footer-color-swatch")
    );
    const activeFooterColor = document.getElementById("activeFooterColor");

    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");

    const toast = document.getElementById("toast");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    let activeCategory = "admissions";
    let lastFocusedElement = null;
    let toastTimer = null;
    let modalCloseTimer = null;


    /* =====================================================
       2. SAFE LOCAL STORAGE
       Handles missing or invalid saved data.
    ====================================================== */

    function readStoredJSON(key, fallback = []) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.warn(`Could not read saved data: ${key}`, error);
            return fallback;
        }
    }

    function saveStoredJSON(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Could not save data: ${key}`, error);
            showToast(
                "Storage Error",
                "Your browser could not save this information.",
                "error"
            );
            return false;
        }
    }

    function readStoredValue(key, fallback = null) {
        try {
            return localStorage.getItem(key) ?? fallback;
        } catch (error) {
            console.warn(`Could not read setting: ${key}`, error);
            return fallback;
        }
    }

    function saveStoredValue(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error(`Could not save setting: ${key}`, error);
            return false;
        }
    }


    /* =====================================================
       3. CURRENT YEAR
    ====================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       4. TOAST NOTIFICATIONS
    ====================================================== */

    function showToast(title, message, type = "success") {
        if (!toast) return;

        if (toastTitle) {
            toastTitle.textContent = title;
        }

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        if (toastIcon) {
            if (type === "error") {
                toastIcon.innerHTML =
                    '<i class="fa-solid fa-circle-exclamation"></i>';
                toastIcon.className = "text-red-400 mt-0.5";
            } else {
                toastIcon.innerHTML =
                    '<i class="fa-solid fa-circle-check"></i>';
                toastIcon.className = "text-[#D6B56A] mt-0.5";
            }
        }

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);
    }


    /* =====================================================
       5. FORM STATUS MESSAGES
    ====================================================== */

    function showFormStatus(element, message, type = "success") {
        if (!element) return;

        element.textContent = message;
        element.className =
            "status-message show " +
            (type === "error" ? "status-error" : "status-success");
    }


    /* =====================================================
       6. DARK / LIGHT THEME
       Supports the existing schoolTheme setting.
    ====================================================== */

    function updateThemeIcon() {
        if (!themeIcon) return;

        const isLight = html.classList.contains("light-theme");

        themeIcon.className = isLight
            ? "fa-solid fa-moon text-sm"
            : "fa-solid fa-sun text-sm";

        if (themeToggle) {
            const label = isLight
                ? "Switch to dark mode"
                : "Switch to light mode";

            themeToggle.setAttribute("aria-label", label);
            themeToggle.setAttribute("title", label);
        }
    }

    function loadTheme() {
        const savedTheme =
            readStoredValue("schoolTheme") ||
            readStoredValue("rsh-theme");

        html.classList.toggle("light-theme", savedTheme === "light");
        updateThemeIcon();
    }

    function toggleTheme() {
        const isLight = html.classList.toggle("light-theme");
        const theme = isLight ? "light" : "dark";

        saveStoredValue("schoolTheme", theme);
        updateThemeIcon();

        showToast(
            "Theme Updated",
            isLight
                ? "Light mode is now active."
                : "Dark mode is now active."
        );
    }

    loadTheme();

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }


    /* =====================================================
       7. MOBILE NAVIGATION MENU
    ====================================================== */

    function openMenu() {
        if (!navigationMenu) return;

        navigationMenu.classList.add("menu-open");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
        }

        if (menuIcon) {
            menuIcon.className = "fa-solid fa-xmark";
        }
    }

    function closeMenu() {
        if (!navigationMenu) return;

        navigationMenu.classList.remove("menu-open");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

        if (menuIcon) {
            menuIcon.className = "fa-solid fa-bars";
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", event => {
            event.stopPropagation();

            if (navigationMenu?.classList.contains("menu-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    document.addEventListener("click", event => {
        if (!navigationMenu || !menuToggle) return;

        if (
            navigationMenu.classList.contains("menu-open") &&
            !navigationMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.querySelectorAll("[data-menu-link]").forEach(link => {
        link.addEventListener("click", closeMenu);
    });


    /* =====================================================
       8. NAVBAR SCROLL EFFECT
    ====================================================== */

    function handleScroll() {
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 40);
        }

        if (backToTop) {
            backToTop.classList.toggle("show", window.scrollY > 500);
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();


    /* =====================================================
       9. FAQ HELPERS
    ====================================================== */

    function getGroupQuestions(group) {
        return Array.from(group.querySelectorAll(".faq-item"));
    }

    function resetFAQDisplay() {
        faqItems.forEach(item => {
            item.style.display = "";
            item.open = false;
        });

        faqGroups.forEach(group => {
            group.style.display = "";
        });
    }

    function closeAllFAQItems() {
        faqItems.forEach(item => {
            item.open = false;
        });
    }

    function getCategoryName(category) {
        const button = faqCategories.find(
            item => item.dataset.category === category
        );

        if (button) {
            return button.textContent.trim();
        }

        return category
            .replace(/-/g, " ")
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }

    function getActiveGroup() {
        return faqGroups.find(
            group => group.dataset.group === activeCategory
        );
    }

    function updateSearchInfo(message) {
        if (searchResultsInfo) {
            searchResultsInfo.textContent = message;
        }
    }


    /* =====================================================
       10. FAQ CATEGORY SWITCHING
    ====================================================== */

    function setActiveCategory(category, clearSearch = true) {
        if (!category) return;

        const categoryExists = faqGroups.some(
            group => group.dataset.group === category
        );

        if (!categoryExists) {
            const firstGroup = faqGroups[0];
            if (!firstGroup) return;
            category = firstGroup.dataset.group;
        }

        activeCategory = category;

        if (clearSearch && faqSearch) {
            faqSearch.value = "";
        }

        resetFAQDisplay();

        faqCategories.forEach(button => {
            const isActive = button.dataset.category === category;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        faqGroups.forEach(group => {
            const isActive = group.dataset.group === category;

            group.classList.toggle("active", isActive);
            group.style.display = isActive ? "" : "none";
        });

        if (faqEmptyState) {
            faqEmptyState.style.display = "none";
        }

        const activeGroup = getActiveGroup();
        const questionCount = activeGroup
            ? getGroupQuestions(activeGroup).length
            : 0;

        updateSearchInfo(
            `Showing ${getCategoryName(category)} questions (${questionCount})`
        );
    }

    faqCategories.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            if (!category) return;

            setActiveCategory(category);

            const container = document.getElementById("faqContainer");

            if (container) {
                container.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       11. FAQ ACCORDION
       Opens one answer at a time.
    ====================================================== */

    faqItems.forEach(item => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;

            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.open) {
                    otherItem.open = false;
                }
            });
        });
    });


    /* =====================================================
       12. FAQ SEARCH
       Searches questions and answers across all categories.
    ====================================================== */

    function searchFAQs() {
        if (!faqSearch) return;

        const term = faqSearch.value.trim().toLowerCase();

        if (!term) {
            setActiveCategory(activeCategory, false);
            return;
        }

        let totalMatches = 0;

        faqCategories.forEach(button => {
            button.classList.remove("active");
            button.setAttribute("aria-pressed", "false");
        });

        faqGroups.forEach(group => {
            let groupMatches = 0;

            getGroupQuestions(group).forEach(item => {
                const matches = item.textContent
                    .toLowerCase()
                    .includes(term);

                item.style.display = matches ? "" : "none";

                if (!matches) {
                    item.open = false;
                } else {
                    groupMatches++;
                    totalMatches++;
                }
            });

            const hasMatches = groupMatches > 0;

            group.style.display = hasMatches ? "" : "none";
            group.classList.toggle("active", hasMatches);
        });

        closeAllFAQItems();

        if (faqEmptyState) {
            faqEmptyState.style.display =
                totalMatches === 0 ? "block" : "none";
        }

        updateSearchInfo(
            totalMatches === 0
                ? `No results for "${faqSearch.value.trim()}".`
                : `${totalMatches} question${totalMatches === 1 ? "" : "s"} found for "${faqSearch.value.trim()}".`
        );
    }

    if (faqSearch) {
        faqSearch.addEventListener("input", searchFAQs);

        faqSearch.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                searchFAQs();
            }
        });
    }


    /* =====================================================
       13. INQUIRY MODAL
    ====================================================== */

    function openInquiryModal() {
        if (!inquiryModal) return;

        clearTimeout(modalCloseTimer);

        lastFocusedElement = document.activeElement;

        inquiryModal.classList.add("modal-open");
        inquiryModal.setAttribute("aria-hidden", "false");
        body.classList.add("modal-open");

        const nameInput = document.getElementById("inquiryName");

        setTimeout(() => {
            if (nameInput) nameInput.focus();
        }, 100);
    }

    function closeInquiryModal() {
        if (!inquiryModal) return;

        inquiryModal.classList.remove("modal-open");
        inquiryModal.setAttribute("aria-hidden", "true");
        body.classList.remove("modal-open");

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function" &&
            document.contains(lastFocusedElement)
        ) {
            lastFocusedElement.focus();
        }
    }

    if (openInquiryButton) {
        openInquiryButton.addEventListener("click", openInquiryModal);
    }

    if (closeInquiryButton) {
        closeInquiryButton.addEventListener("click", closeInquiryModal);
    }

    if (menuEnquire) {
        menuEnquire.addEventListener("click", () => {
            closeMenu();
            openInquiryModal();
        });
    }

    if (emptyStateEnquire) {
        emptyStateEnquire.addEventListener("click", openInquiryModal);
    }

    document.querySelectorAll("[data-footer-inquiry]").forEach(button => {
        button.addEventListener("click", openInquiryModal);
    });

    document.querySelectorAll('[data-action="admissions-desk"]').forEach(button => {
        button.addEventListener("click", openInquiryModal);
    });

    if (inquiryModal) {
        inquiryModal.addEventListener("click", event => {
            if (event.target === inquiryModal) {
                closeInquiryModal();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (inquiryModal?.classList.contains("modal-open")) {
                closeInquiryModal();
            }

            if (navigationMenu?.classList.contains("menu-open")) {
                closeMenu();
            }
        }
    });


    /* =====================================================
       14. INQUIRY FORM
       Saves enquiries locally in this browser.
    ====================================================== */

    if (inquiryForm) {
        inquiryForm.addEventListener("submit", event => {
            event.preventDefault();

            const formData = new FormData(inquiryForm);

            const nameInput = document.getElementById("inquiryName");
            const emailInput = document.getElementById("inquiryEmail");
            const questionInput = document.getElementById("inquiryQuestion");

            const name = (
                nameInput?.value ??
                formData.get("name") ??
                ""
            ).toString().trim();

            const email = (
                emailInput?.value ??
                formData.get("email") ??
                ""
            ).toString().trim();

            const question = (
                questionInput?.value ??
                formData.get("question") ??
                ""
            ).toString().trim();

            if (!name || !email || !question) {
                showFormStatus(
                    inquiryStatus,
                    "Please complete all required fields.",
                    "error"
                );
                return;
            }

            if (emailInput && !emailInput.checkValidity()) {
                showFormStatus(
                    inquiryStatus,
                    "Please enter a valid email address.",
                    "error"
                );
                emailInput.focus();
                return;
            }

            const enquiries = readStoredJSON(
                "schoolInquiries",
                readStoredJSON("rsh-enquiries", [])
            );

            if (!Array.isArray(enquiries)) {
                showFormStatus(
                    inquiryStatus,
                    "Saved enquiries could not be read. Please try again.",
                    "error"
                );
                return;
            }

            enquiries.push({
                id: `INQ-${Date.now()}`,
                name,
                email,
                question,
                createdAt: new Date().toISOString()
            });

            if (!saveStoredJSON("schoolInquiries", enquiries)) {
                return;
            }

            showFormStatus(
                inquiryStatus,
                "Thank you. Your enquiry has been saved in this browser.",
                "success"
            );

            inquiryForm.reset();

            showToast(
                "Enquiry Saved",
                "Your enquiry was saved locally."
            );

            modalCloseTimer = setTimeout(closeInquiryModal, 1800);
        });
    }


    /* =====================================================
       15. NEWSLETTER SUBSCRIPTION
       Saves email addresses locally in this browser.
    ====================================================== */

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", event => {
            event.preventDefault();

            const emailInput =
                newsletterEmail ||
                document.getElementById("newsletterEmail");

            const email = emailInput
                ? emailInput.value.trim()
                : "";

            if (!email) {
                showFormStatus(
                    newsletterStatus,
                    "Please enter your email address.",
                    "error"
                );
                return;
            }

            if (emailInput && !emailInput.checkValidity()) {
                showFormStatus(
                    newsletterStatus,
                    "Please enter a valid email address.",
                    "error"
                );
                emailInput.focus();
                return;
            }

            const subscribers = readStoredJSON(
                "schoolNewsletter",
                readStoredJSON("rsh-newsletter", [])
            );

            if (!Array.isArray(subscribers)) {
                showFormStatus(
                    newsletterStatus,
                    "Subscription data could not be read. Please try again.",
                    "error"
                );
                return;
            }

            const existingEmail = subscribers.some(
                savedEmail =>
                    savedEmail.toLowerCase() === email.toLowerCase()
            );

            if (existingEmail) {
                showFormStatus(
                    newsletterStatus,
                    "This email is already subscribed.",
                    "error"
                );
                return;
            }

            subscribers.push(email);

            if (!saveStoredJSON("schoolNewsletter", subscribers)) {
                return;
            }

            showFormStatus(
                newsletterStatus,
                "Thank you! Your email has been saved for this demo.",
                "success"
            );

            newsletterForm.reset();

            showToast(
                "Subscription Saved",
                "Your subscription was saved locally."
            );
        });
    }


    /* =====================================================
       16. FOOTER COLOR CUSTOMIZER
    ====================================================== */

    const defaultFooterColor = {
        name: "Forest Gold",
        primary: "#071A12",
        secondary: "#0B241B"
    };

    function isValidHexColor(value) {
        return typeof value === "string" &&
            /^#[0-9A-F]{6}$/i.test(value);
    }

    function applyFooterColor(data, save = true) {
        if (
            !data ||
            typeof data.name !== "string" ||
            !isValidHexColor(data.primary) ||
            !isValidHexColor(data.secondary)
        ) {
            data = defaultFooterColor;
        }

        if (footer) {
            footer.style.setProperty("--footer-primary", data.primary);
            footer.style.setProperty("--footer-secondary", data.secondary);
        }

        if (activeFooterColor) {
            activeFooterColor.textContent = data.name;
        }

        footerSwatches.forEach(swatch => {
            swatch.classList.toggle(
                "active",
                swatch.dataset.footerName === data.name
            );
        });

        if (save) {
            saveStoredJSON("footerColor", data);
        }
    }

    function loadFooterColor() {
        const saved = readStoredJSON(
            "footerColor",
            readStoredJSON("rsh-footer-color", null)
        );

        applyFooterColor(
            saved && typeof saved === "object"
                ? saved
                : defaultFooterColor,
            false
        );
    }

    if (footerCustomizerToggle) {
        footerCustomizerToggle.addEventListener("click", () => {
            if (!footerColorPanel) return;

            const isOpen = footerColorPanel.classList.toggle("open");

            footerCustomizerToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    }

    footerSwatches.forEach(swatch => {
        swatch.addEventListener("click", () => {
            const data = {
                name: swatch.dataset.footerName,
                primary: swatch.dataset.footerPrimary,
                secondary: swatch.dataset.footerSecondary
            };

            if (
                !data.name ||
                !isValidHexColor(data.primary) ||
                !isValidHexColor(data.secondary)
            ) {
                showToast(
                    "Invalid Footer Color",
                    "Check the color values on this swatch.",
                    "error"
                );
                return;
            }

            applyFooterColor(data);

            showToast(
                "Footer Updated",
                `${data.name} is now active.`
            );
        });
    });

    loadFooterColor();


    /* =====================================================
       17. LANGUAGE BUTTONS
       Stores the selected language preference.
       Translation content must be supplied separately.
    ====================================================== */

    const languageButtons = Array.from(
        document.querySelectorAll("[data-language]")
    );

    function setLanguage(language, showMessage = false) {
        if (!["EN", "FR"].includes(language)) return;

        languageButtons.forEach(button => {
            const isActive = button.dataset.language === language;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        saveStoredValue("schoolLanguage", language);

        if (showMessage) {
            showToast(
                language === "FR" ? "French Selected" : "English Selected",
                language === "FR"
                    ? "Connect your French translations to switch the page content."
                    : "English is selected."
            );
        }
    }

    languageButtons.forEach(button => {
        button.addEventListener("click", () => {
            setLanguage(button.dataset.language, true);
        });
    });

    const savedLanguage = readStoredValue("schoolLanguage");

    if (savedLanguage) {
        setLanguage(savedLanguage);
    }


    /* =====================================================
       18. VIRTUAL TOUR PLACEHOLDER
    ====================================================== */

    document.querySelectorAll('[data-action="virtual-tour"]').forEach(button => {
        button.addEventListener("click", event => {
            const href = button.getAttribute("href");

            if (button.tagName === "A" && href && href !== "#") {
                return;
            }

            event.preventDefault();

            showToast(
                "Virtual Tour",
                "Connect this button to your virtual-tour page."
            );
        });
    });


    /* =====================================================
       19. SOCIAL MEDIA PLACEHOLDERS
    ====================================================== */

    document.querySelectorAll("[data-placeholder-social]").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const platform =
                link.dataset.placeholderSocial || "Social media";

            showToast(
                "Social Link",
                `${platform} has not been configured yet.`
            );
        });
    });


    /* =====================================================
       20. POLICY PLACEHOLDERS
    ====================================================== */

    document.querySelectorAll("[data-policy]").forEach(button => {
        button.addEventListener("click", () => {
            const policy = button.dataset.policy || "Policy";

            showToast(
                policy,
                "Connect this button to the official policy page."
            );
        });
    });


    /* =====================================================
       21. BACK TO TOP
    ====================================================== */

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       22. SMOOTH SCROLL FOR INTERNAL LINKS
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            let target;

            try {
                target = document.querySelector(targetId);
            } catch (error) {
                return;
            }

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            closeMenu();
        });
    });


    /* =====================================================
       23. LUCIDE ICONS
    ====================================================== */

    if (
        typeof lucide !== "undefined" &&
        typeof lucide.createIcons === "function"
    ) {
        lucide.createIcons();
    }


    /* =====================================================
       24. INITIAL FAQ STATE
    ====================================================== */

    if (faqGroups.length > 0) {
        const initialCategoryExists = faqGroups.some(
            group => group.dataset.group === activeCategory
        );

        if (!initialCategoryExists) {
            activeCategory = faqGroups[0].dataset.group;
        }

        setActiveCategory(activeCategory);
    }


    /* =====================================================
       25. INITIALIZE MODAL ACCESSIBILITY STATE
    ====================================================== */

    if (inquiryModal) {
        inquiryModal.setAttribute("aria-hidden", "true");
    }

    if (menuToggle && navigationMenu) {
        menuToggle.setAttribute(
            "aria-expanded",
            String(navigationMenu.classList.contains("menu-open"))
        );
    }


    /* =====================================================
       26. INITIALIZATION COMPLETE
    ====================================================== */

    console.log(
        "Rwanda School of Hospitality FAQ JavaScript loaded successfully."
    );

});
