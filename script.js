/*
    Marley Grandizio — Portfolio V1

    JavaScript is intentionally lightweight.
    It handles:
    1. Mobile navigation
    2. Closing the mobile menu after selecting a link
    3. Subtle scroll-reveal animations
*/


document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".site-nav");
    const navLinks = document.querySelectorAll(".site-nav a");

    if (menuButton && navigation) {

        const closeMenu = () => {
            menuButton.classList.remove("is-open");
            navigation.classList.remove("is-open");
            document.body.classList.remove("menu-open");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
        };


        const openMenu = () => {
            menuButton.classList.add("is-open");
            navigation.classList.add("is-open");
            document.body.classList.add("menu-open");

            menuButton.setAttribute("aria-expanded", "true");
            menuButton.setAttribute("aria-label", "Close navigation");
        };


        menuButton.addEventListener("click", () => {
            const menuIsOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            if (menuIsOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });


        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });


        /* Close menu with Escape key */

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                menuButton.getAttribute("aria-expanded") === "true"
            ) {
                closeMenu();
                menuButton.focus();
            }
        });


        /* Reset mobile menu if viewport becomes desktop-sized */

        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                closeMenu();
            }
        });
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".intro-copy, " +
        ".portrait-wrap, " +
        ".about-content, " +
        ".experience-item, " +
        ".additional-experience, " +
        ".education-main, " +
        ".recognition, " +
        ".skill-group"
    );


    if (!prefersReducedMotion && "IntersectionObserver" in window) {

        revealElements.forEach((element) => {
            element.classList.add("reveal");
        });


        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        /*
            If reduced motion is preferred, or IntersectionObserver
            isn't available, all content remains visible normally.
        */

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

});
