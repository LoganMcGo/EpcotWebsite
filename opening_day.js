document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const topGradient = document.querySelector('.top-gradient-overlay');
    const planningWrapper = document.querySelector('.planning-content-wrapper'); // Get planning content

    if (!heroSection || !heroContent || !topGradient || !planningWrapper) {
        console.error("Required elements (hero section, hero content, top gradient, or planning wrapper) not found!");
        return;
    }

    const MAX_BLUR = 10; // Max blur in pixels for hero background
    const HERO_FADE_OUT_END = 400; // Scroll position (px) where hero content/gradient is fully faded

    // Planning section fade-in parameters
    const PLANNING_FADE_IN_START = 300; // Start fading in planning section
    const PLANNING_FADE_IN_END = 600;   // Fully faded in planning section

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Calculate blur
        // Increase blur quickly up to MAX_BLUR within the first ~200px of scroll
        let blurValue = Math.min(MAX_BLUR, scrollY / 20); // Adjust divisor (20) to control speed

        // --- Hero Effects ---
        // Calculate hero background blur
        let heroBlurValue = Math.min(MAX_BLUR, scrollY / 20); // Adjust divisor (20) to control speed

        // Calculate hero content/gradient opacity (fade out)
        let heroOpacityValue = 1 - (scrollY / HERO_FADE_OUT_END);
        heroOpacityValue = Math.max(0, Math.min(1, heroOpacityValue)); // Clamp between 0 and 1

        // --- Planning Effects ---
        // Calculate planning content opacity (fade in)
        let planningOpacityValue = 0;
        if (scrollY > PLANNING_FADE_IN_START) {
            planningOpacityValue = (scrollY - PLANNING_FADE_IN_START) / (PLANNING_FADE_IN_END - PLANNING_FADE_IN_START);
        }
        planningOpacityValue = Math.max(0, Math.min(1, planningOpacityValue)); // Clamp between 0 and 1


        // Apply styles
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            // Apply hero styles
            if (heroSection) {
                heroSection.style.filter = `blur(${heroBlurValue}px)`;
            }
            if (heroContent) {
                heroContent.style.opacity = heroOpacityValue;
            }
            if (topGradient) {
                topGradient.style.opacity = heroOpacityValue;
            }
            // Apply planning styles
            if (planningWrapper) {
                planningWrapper.style.opacity = planningOpacityValue;
            }
        });
    });

    // Set initial state on load
    const initialScrollY = window.scrollY;
    // Hero initial state
    let initialHeroBlur = Math.min(MAX_BLUR, initialScrollY / 20);
    let initialHeroOpacity = Math.max(0, Math.min(1, 1 - (initialScrollY / HERO_FADE_OUT_END)));
    if (heroSection) heroSection.style.filter = `blur(${initialHeroBlur}px)`;
    if (heroContent) heroContent.style.opacity = initialHeroOpacity;
    if (topGradient) topGradient.style.opacity = initialHeroOpacity;
    // Planning initial state
    let initialPlanningOpacity = 0;
     if (initialScrollY > PLANNING_FADE_IN_START) {
            initialPlanningOpacity = (initialScrollY - PLANNING_FADE_IN_START) / (PLANNING_FADE_IN_END - PLANNING_FADE_IN_START);
     }
    initialPlanningOpacity = Math.max(0, Math.min(1, initialPlanningOpacity));
    if (planningWrapper) planningWrapper.style.opacity = initialPlanningOpacity;

});
