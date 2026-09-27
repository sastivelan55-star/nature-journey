document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove Loader Overlay
    const loader = document.getElementById('loader');
    
    // Simulate slight loading delay for aesthetic entrance
    setTimeout(() => {
        if(loader) {
            loader.classList.add('hidden');
        }
        
        // Trigger initial hero animations after loader disappears
        setTimeout(() => {
            const heroTexts = document.querySelectorAll('.hero .reveal-text');
            heroTexts.forEach(el => el.classList.add('is-visible'));
        }, 300);
    }, 500);

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before it comes fully into view
        threshold: 0.1
    };

    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-image, .reveal-text:not(.hero .reveal-text)');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 3. Subtle Parallax for Hero Image
    const heroImage = document.getElementById('hero-img');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && heroImage) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Limit the parallax effect so it doesn't break out of container
            if (scrollY < window.innerHeight) {
                // Adjust transform slightly based on scroll
                // Initial scale is 1.05 from CSS
                heroImage.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
            }
        });
    }
});
