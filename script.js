// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navbar ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 1b. Mobile Navigation Drawer ---
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const navClose = document.getElementById('navClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

    function openMobileNav() {
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        document.body.classList.add('nav-open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMobileNav() {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger) {
        hamburger.addEventListener('click', openMobileNav);
    }

    if (navClose) {
        navClose.addEventListener('click', closeMobileNav);
    }

    // Close when clicking the backdrop (overlay, not the drawer itself)
    if (mobileNav) {
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                closeMobileNav();
            }
        });
    }

    // Close on any mobile nav link click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            closeMobileNav();
        }
    });



    // --- 2. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 4. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- 5. Animated Counters ---
    const counters = document.querySelectorAll('.counter');

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const start = +counter.getAttribute('data-start') || 0;
                const duration = 2000; // 2 seconds animation

                let startTime = null;

                const step = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);

                    // easeOutQuart easing function
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

                    const currentVal = Math.floor(start + (target - start) * easeOutQuart);
                    counter.innerText = currentVal;

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        counter.innerText = target;
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- 6. Handle 'Other' Service Selection ---
    const serviceSelect = document.getElementById('serviceSelect');
    const otherServiceGroup = document.getElementById('otherServiceGroup');
    const otherServiceInput = document.getElementById('otherServiceInput');

    if (serviceSelect && otherServiceGroup) {
        serviceSelect.addEventListener('change', (e) => {
            if (e.target.value === 'Other') {
                otherServiceGroup.style.display = 'block';
                otherServiceInput.required = true;
            } else {
                otherServiceGroup.style.display = 'none';
                otherServiceInput.required = false;
                otherServiceInput.value = '';
            }
        });
    }

});
