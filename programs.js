/* =========================================================
   NOAH'S ARK INTERNATIONAL SCHOOL
   PROGRAMS PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   GLOBAL ELEMENTS
========================================================= */

const body = document.body;

const navbar = document.getElementById("navbar");
const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");

const themeToggle = document.getElementById("themeToggle");

const programModal = document.getElementById("programModal");
const inquiryModal = document.getElementById("inquiryModal");

const toast = document.getElementById("toast");

const footer = document.getElementById("siteFooter");
const footerColorToggle =
    document.getElementById("footerColorToggle");

const footerColorPanel =
    document.getElementById("footerColorPanel");

const backToTopFloating =
    document.getElementById("backToTopFloating");

const footerBackToTop =
    document.getElementById("footerBackToTop");


let currentProgram = null;
let lastFocusedElement = null;
let toastTimer = null;


/* =========================================================
   LUCIDE ICONS
========================================================= */

function refreshIcons() {

    if (
        window.lucide &&
        typeof lucide.createIcons === "function"
    ) {
        lucide.createIcons();
    }

}


/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   MOBILE MENU
========================================================= */

function openMenu() {

    if (!menuPanel || !menuButton) return;

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuPanel.classList.remove(
        "opacity-0",
        "scale-95",
        "pointer-events-none"
    );

    menuPanel.classList.add(
        "opacity-100",
        "scale-100",
        "pointer-events-auto"
    );

}


function closeMenu() {

    if (!menuPanel || !menuButton) return;

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuPanel.classList.add(
        "opacity-0",
        "scale-95",
        "pointer-events-none"
    );

    menuPanel.classList.remove(
        "opacity-100",
        "scale-100",
        "pointer-events-auto"
    );

}


function toggleMenu() {

    const isOpen =
        menuButton?.getAttribute(
            "aria-expanded"
        ) === "true";

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

}


/* Menu button */

menuButton?.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        toggleMenu();

    }
);


/* Close menu when clicking outside */

document.addEventListener(
    "click",
    event => {

        if (
            menuPanel &&
            menuButton &&
            !menuPanel.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }

    }
);


/* Close menu after clicking a link */

menuPanel
    ?.querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


/* =========================================================
   THEME SYSTEM
========================================================= */

const savedTheme =
    localStorage.getItem("schoolTheme");


function applyTheme(theme) {

    const light = theme === "light";

    body.classList.toggle(
        "light-mode",
        light
    );


    const sunIcon =
        document.getElementById("sunIcon");

    const moonIcon =
        document.getElementById("moonIcon");


    sunIcon?.classList.toggle(
        "hidden",
        light
    );

    moonIcon?.classList.toggle(
        "hidden",
        !light
    );


    const themeLabel =
        light
            ? "Switch to dark mode"
            : "Switch to light mode";


    themeToggle?.setAttribute(
        "aria-label",
        themeLabel
    );

    themeToggle?.setAttribute(
        "title",
        themeLabel
    );


    localStorage.setItem(
        "schoolTheme",
        light ? "light" : "dark"
    );


    refreshIcons();

}


/* Apply saved theme */

applyTheme(
    savedTheme === "light"
        ? "light"
        : "dark"
);


/* Theme button */

themeToggle?.addEventListener(
    "click",
    () => {

        const isLight =
            body.classList.contains(
                "light-mode"
            );

        applyTheme(
            isLight
                ? "dark"
                : "light"
        );

    }
);


/* =========================================================
   PROGRAM DATA
========================================================= */

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
            "Build an understanding of the operational side of food and beverage within the hospitality industry.",

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
            "Discover the tourism field and develop knowledge for learning and working in travel and visitor experiences.",

        items: [
            "Tourism fundamentals",
            "Travel and visitor experiences",
            "Destination awareness",
            "Professional tourism skills"
        ]

    }

};


/* =========================================================
   PROGRAM MODAL
========================================================= */

function openProgramModal(programId) {

    const program =
        programData[programId];


    if (
        !program ||
        !programModal
    ) {
        return;
    }


    currentProgram = programId;

    lastFocusedElement =
        document.activeElement;


    const modalProgramNumber =
        document.getElementById(
            "modalProgramNumber"
        );

    const programModalTitle =
        document.getElementById(
            "programModalTitle"
        );

    const programModalDescription =
        document.getElementById(
            "programModalDescription"
        );

    const list =
        document.getElementById(
            "programModalList"
        );


    if (modalProgramNumber) {

        modalProgramNumber.textContent =
            program.number;

    }


    if (programModalTitle) {

        programModalTitle.textContent =
            program.title;

    }


    if (programModalDescription) {

        programModalDescription.textContent =
            program.description;

    }


    if (list) {

        list.innerHTML = "";


        program.items.forEach(item => {

            const li =
                document.createElement("li");


            li.className =
                "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3.5 text-sm text-white/65";


            li.innerHTML = `
                <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <i data-lucide="check" class="h-3.5 w-3.5"></i>
                </span>

                <span>${item}</span>
            `;


            list.appendChild(li);

        });

    }


    programModal.classList.add("active");

    programModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add("modal-open");


    refreshIcons();


    setTimeout(() => {

        document
            .getElementById(
                "closeProgramModal"
            )
            ?.focus();

    }, 50);

}


function closeProgramModal() {

    if (!programModal) return;


    programModal.classList.remove(
        "active"
    );


    programModal.setAttribute(
        "aria-hidden",
        "true"
    );


    body.classList.remove(
        "modal-open"
    );


    if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus ===
            "function"
    ) {

        lastFocusedElement.focus();

    }

}


/* Program buttons */

document
    .querySelectorAll("[data-open-program]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openProgramModal(
                    button.dataset.openProgram
                );

            }
        );

    });


/* Close buttons */

document
    .getElementById("closeProgramModal")
    ?.addEventListener(
        "click",
        closeProgramModal
    );


document
    .getElementById("modalCloseSecondary")
    ?.addEventListener(
        "click",
        closeProgramModal
    );


/* Close by clicking backdrop */

programModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            programModal
        ) {
            closeProgramModal();
        }

    }
);


/* =========================================================
   INQUIRY MODAL
========================================================= */

function openInquiryModal(
    selectedProgram = "General inquiry"
) {

    lastFocusedElement =
        document.activeElement;


    const select =
        document.getElementById(
            "inquiryProgram"
        );


    if (select) {

        const exists =
            [...select.options].some(
                option =>
                    option.value ===
                    selectedProgram
            );


        select.value =
            exists
                ? selectedProgram
                : "General inquiry";

    }


    document
        .getElementById("inquirySuccess")
        ?.classList.add("hidden");


    inquiryModal?.classList.add(
        "active"
    );


    inquiryModal?.setAttribute(
        "aria-hidden",
        "false"
    );


    body.classList.add(
        "modal-open"
    );


    setTimeout(() => {

        document
            .getElementById(
                "inquiryName"
            )
            ?.focus();

    }, 50);

}


function closeInquiryModal() {

    inquiryModal?.classList.remove(
        "active"
    );


    inquiryModal?.setAttribute(
        "aria-hidden",
        "true"
    );


    body.classList.remove(
        "modal-open"
    );


    if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus ===
            "function"
    ) {

        lastFocusedElement.focus();

    }

}


/* Close inquiry modal */

document
    .getElementById(
        "closeInquiryModal"
    )
    ?.addEventListener(
        "click",
        closeInquiryModal
    );


/* Close by clicking backdrop */

inquiryModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            inquiryModal
        ) {
            closeInquiryModal();
        }

    }
);


/* =========================================================
   INQUIRY BUTTONS
========================================================= */

document
    .querySelectorAll(
        "[data-open-inquiry]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeMenu();

                openInquiryModal();

            }
        );

    });


/* Main CTA */

document
    .getElementById(
        "ctaEnquire"
    )
    ?.addEventListener(
        "click",
        () => {

            openInquiryModal();

        }
    );


/* Mobile enquiry */

document
    .getElementById(
        "mobileEnquireButton"
    )
    ?.addEventListener(
        "click",
        () => {

            closeMenu();

            openInquiryModal();

        }
    );


/* Enquire from program modal */

document
    .getElementById(
        "modalEnquireButton"
    )
    ?.addEventListener(
        "click",
        () => {

            const program =
                programData[
                    currentProgram
                ];


            closeProgramModal();


            setTimeout(() => {

                openInquiryModal(
                    program
                        ? program.title
                        : "General inquiry"
                );

            }, 250);

        }
    );


/* =========================================================
   FOOTER PROGRAM BUTTONS
========================================================= */

document
    .querySelectorAll(
        "[data-footer-program]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openProgramModal(
                    button.dataset.footerProgram
                );

            }
        );

    });


/* =========================================================
   INQUIRY FORM
========================================================= */

document
    .getElementById(
        "inquiryForm"
    )
    ?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "inquiryName"
                    )
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById(
                        "inquiryEmail"
                    )
                    ?.value
                    .trim();


            const program =
                document
                    .getElementById(
                        "inquiryProgram"
                    )
                    ?.value;


            const message =
                document
                    .getElementById(
                        "inquiryMessage"
                    )
                    ?.value
                    .trim();


            if (
                !name ||
                !email ||
                !program ||
                !message
            ) {

                showToast(
                    "Please complete all required fields."
                );

                return;

            }


            const inquiry = {

                name,
                email,
                program,
                message,

                submittedAt:
                    new Date()
                        .toISOString()

            };


            let existing = [];


            try {

                existing =
                    JSON.parse(
                        localStorage.getItem(
                            "schoolInquiries"
                        ) || "[]"
                    );


                if (
                    !Array.isArray(
                        existing
                    )
                ) {

                    existing = [];

                }

            } catch {

                existing = [];

            }


            existing.push(
                inquiry
            );


            localStorage.setItem(
                "schoolInquiries",
                JSON.stringify(
                    existing
                )
            );


            document
                .getElementById(
                    "inquirySuccess"
                )
                ?.classList.remove(
                    "hidden"
                );


            event.target.reset();


            showToast(
                "Your inquiry has been recorded."
            );

        }
    );


/* =========================================================
   PROGRAM FILTER
========================================================= */

const cards = [
    ...document.querySelectorAll(
        ".program-card"
    )
];


const filterButtons = [
    ...document.querySelectorAll(
        ".filter-button"
    )
];


const searchInput =
    document.getElementById(
        "programSearch"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


const resultMessage =
    document.getElementById(
        "programResultMessage"
    );


let activeFilter = "all";


function filterPrograms() {

    const search =
        searchInput
            ?.value
            .trim()
            .toLowerCase() || "";


    let visibleCount = 0;


    cards.forEach(card => {

        const category =
            card.dataset.category ||
            "";


        const searchable =
            (
                card.dataset.search ||
                ""
            ).toLowerCase();


        const categoryMatch =
            activeFilter === "all" ||
            category === activeFilter;


        const searchMatch =
            !search ||
            searchable.includes(search);


        const visible =
            categoryMatch &&
            searchMatch;


        card.classList.toggle(
            "hidden",
            !visible
        );


        if (visible) {
            visibleCount++;
        }

    });


    if (visibleCount === 0) {

        emptyState?.classList.remove(
            "hidden"
        );

        resultMessage?.classList.add(
            "hidden"
        );

        return;

    }


    emptyState?.classList.add(
        "hidden"
    );


    if (
        search ||
        activeFilter !== "all"
    ) {

        if (resultMessage) {

            resultMessage.textContent =
                `${visibleCount} program${
                    visibleCount !== 1
                        ? "s"
                        : ""
                } found`;


            resultMessage.classList.remove(
                "hidden"
            );

        }

    } else {

        resultMessage?.classList.add(
            "hidden"
        );

    }

}


/* Filter buttons */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                activeFilter =
                    button.dataset.filter ||
                    "all";


                filterButtons.forEach(
                    item => {

                        item.classList.toggle(
                            "active",
                            item === button
                        );

                    }
                );


                filterPrograms();

            }
        );

    }
);


/* Search */

searchInput?.addEventListener(
    "input",
    filterPrograms
);


/* Clear search */

document
    .getElementById(
        "clearSearch"
    )
    ?.addEventListener(
        "click",
        () => {

            if (searchInput) {
                searchInput.value = "";
            }


            activeFilter = "all";


            filterButtons.forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.filter ===
                            "all"
                    );

                }
            );


            filterPrograms();

        }
    );


/* =========================================================
   LANGUAGE BUTTONS
========================================================= */

document
    .getElementById(
        "englishButton"
    )
    ?.addEventListener(
        "click",
        () => {

            showToast(
                "English interface selected."
            );

        }
    );


document
    .getElementById(
        "frenchButton"
    )
    ?.addEventListener(
        "click",
        () => {

            showToast(
                "French interface is being prepared."
            );

        }
    );


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function updateNavbar() {

    if (!navbar) return;


    navbar.classList.toggle(
        "translate-y-[-3px]",
        window.scrollY > 35
    );

}


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);


updateNavbar();


/* =========================================================
   BACK TO TOP
========================================================= */

function updateBackToTop() {

    backToTopFloating?.classList.toggle(
        "visible",
        window.scrollY > 500
    );

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    {
        passive: true
    }
);


/* Floating back-to-top */

backToTopFloating?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* Footer back-to-top */

footerBackToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


updateBackToTop();


/* =========================================================
   FOOTER COLOR SYSTEM
========================================================= */

const footerThemes = [
    "gold",
    "emerald",
    "black",
    "burgundy",
    "navy"
];


function applyFooterTheme(theme) {

    if (
        !footer ||
        !footerThemes.includes(theme)
    ) {
        return;
    }


    /* Remove previous footer themes */

    footerThemes.forEach(
        themeName => {

            footer.classList.remove(
                `footer-${themeName}`
            );

        }
    );


    /* Add selected theme */

    footer.classList.add(
        `footer-${theme}`
    );


    /* Save preference */

    localStorage.setItem(
        "schoolFooterTheme",
        theme
    );


    /* Update selected button */

    document
        .querySelectorAll(
            "[data-footer-theme]"
        )
        .forEach(button => {

            const selected =
                button.dataset.footerTheme ===
                theme;


            button.classList.toggle(
                "ring-2",
                selected
            );


            button.classList.toggle(
                "ring-gold",
                selected
            );

        });

}


/* Load saved footer theme */

const savedFooterTheme =
    localStorage.getItem(
        "schoolFooterTheme"
    ) || "gold";


applyFooterTheme(
    savedFooterTheme
);


/* Footer color toggle */

footerColorToggle?.addEventListener(
    "click",
    event => {

        event.stopPropagation();


        const isOpen =
            !footerColorPanel?.classList.contains(
                "hidden"
            );


        footerColorPanel?.classList.toggle(
            "hidden",
            isOpen
        );


        footerColorToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

    }
);


/* Footer theme buttons */

document
    .querySelectorAll(
        "[data-footer-theme]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                applyFooterTheme(
                    button.dataset.footerTheme
                );


                footerColorPanel?.classList.add(
                    "hidden"
                );


                footerColorToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );


                showToast(
                    "Footer color updated."
                );

            }
        );

    });


/* Close footer color panel outside */

document.addEventListener(
    "click",
    event => {

        if (
            footerColorPanel &&
            footerColorToggle &&
            !footerColorPanel.contains(
                event.target
            ) &&
            !footerColorToggle.contains(
                event.target
            )
        ) {

            footerColorPanel.classList.add(
                "hidden"
            );


            footerColorToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   FOOTER YEAR
========================================================= */

const footerYear =
    document.getElementById(
        "footerYear"
    );


if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        /* Close program modal */

        if (
            programModal?.classList.contains(
                "active"
            )
        ) {

            closeProgramModal();

            return;

        }


        /* Close inquiry modal */

        if (
            inquiryModal?.classList.contains(
                "active"
            )
        ) {

            closeInquiryModal();

            return;

        }


        /* Close mobile menu */

        closeMenu();


        /* Close footer color panel */

        footerColorPanel?.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

filterPrograms();

refreshIcons();