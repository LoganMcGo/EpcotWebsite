document.addEventListener('DOMContentLoaded', function () {
    
    gsap.registerPlugin(ScrollToPlugin);
    
    
    var controller = new ScrollMagic.Controller();
    
    
    const sections = document.querySelectorAll('section');
    let isScrolling = false;
    let currentSection = 0;
    
    
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            if (isScrolling) return; 
            
            isScrolling = true;
            currentSection = index;
            
            
            gsap.to(window, {
                duration: 2, 
                scrollTo: {
                    y: sections[index].offsetTop,
                    autoKill: false
                },
                ease: "power1.inOut", 
                onComplete: function() {
                    
                    setTimeout(() => {
                        isScrolling = false;
                    }, 200); 
                }
            });
        }
    }
    
    
    window.addEventListener('wheel', (e) => {
        if (!isScrolling) {
            if (e.deltaY > 0) { 
                scrollToSection(currentSection + 1);
            } else { 
                scrollToSection(currentSection - 1);
            }
        }
        e.preventDefault();
    }, { passive: false });

    

    
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const topGradient = document.querySelector('.top-gradient-overlay');

    
    var heroTween = gsap.timeline();
    
    
    heroTween.fromTo(document.body, 
        { "--background-blur": "0px" }, 
        { 
            "--background-blur": "10px", 
            ease: "power1.inOut",
            duration: 4 
        }
    , 0); 

    
    heroTween.fromTo(document.body,
        { "--tint-opacity": 0 }, 
        { 
            "--tint-opacity": 0.42, 
            ease: "power1.inOut",
            duration: 4 
        }
    , 0); 
    
    
    heroTween.fromTo([heroContent, topGradient],
        { opacity: 1 }, 
        { 
            opacity: 0, 
            ease: "power1.inOut",
            duration: 4 
        }
    , 0); 
    
    
    heroTween.fromTo(heroContent,
        { top: "50%" }, 
        { 
            top: "45%", 
            ease: "power1.inOut",
            duration: 4 
        }
    , 0); 


    
    new ScrollMagic.Scene({
            triggerElement: 'body', 
            triggerHook: 0,         
            duration: "100%"        
        })
        .setTween(heroTween) 
        .addTo(controller);


    

    
    const planningWrapper = document.querySelector('.planning-content-wrapper');
    const paragraphsWrapper = document.querySelector('.paragraphs-wrapper');

    
    if (planningWrapper) { 
        new ScrollMagic.Scene({
                triggerElement: '#planning', 
                triggerHook: 0.6,        
                reverse: false           
            })
            .setTween(gsap.to(planningWrapper, { opacity: 1, duration: 1.5, ease: "power1.inOut" }))
            .addTo(controller);
    } else {
        console.error("Planning content wrapper not found for fade-in animation.");
    }
    
    
    if (paragraphsWrapper) { 
        new ScrollMagic.Scene({
                triggerElement: '.paragraphs-wrapper', 
                triggerHook: 0.7,        
                reverse: false           
            })
            .setTween(gsap.to(paragraphsWrapper, { opacity: 1, duration: 1.5, ease: "power1.inOut" }))
            .addTo(controller);
    } else {
        console.error("Paragraphs wrapper not found for fade-in animation.");
    }

    

    
    const introductionSection = document.querySelector('#introduction-section');

    if (introductionSection) {
        new ScrollMagic.Scene({
            triggerElement: '#introduction-section', 
            triggerHook: 0.7, 
            reverse: false 
        })
        .setClassToggle('#introduction-section', 'is-visible') 
        
        .addTo(controller);
    } else {
        console.error("Introduction section not found for fade-in animation.");
    }

    

    
    const coreConceptsSection = document.querySelector('#core-concepts-section');

    if (coreConceptsSection) {
        new ScrollMagic.Scene({
            triggerElement: '#core-concepts-section', 
            triggerHook: 0.7, 
            reverse: false 
        })
        .setClassToggle('#core-concepts-section', 'is-visible') 
        
        .addTo(controller);
    } else {
        console.error("Core concepts section not found for fade-in animation.");
    }

    // Two Worlds Section Animation
    const twoWorldsSection = document.querySelector('#two-worlds-section');

    if (twoWorldsSection) {
        new ScrollMagic.Scene({
            triggerElement: '#two-worlds-section',
            triggerHook: 0.7,
            reverse: false
        })
        .setClassToggle('#two-worlds-section', 'is-visible')
        .addTo(controller);
    } else {
        console.error("Two worlds section not found for fade-in animation.");
    }

    // Add hover functionality for the world boxes
    const worldShowcaseBox = document.getElementById('world-showcase-box');
    const futureWorldBox = document.getElementById('future-world-box');
    const worldShowcaseOverlay = document.getElementById('world-showcase-overlay');
    const futureWorldOverlay = document.getElementById('future-world-overlay');

    if (worldShowcaseBox && futureWorldBox) {
        // The CSS handles most of the hover effects, but we can add additional functionality here if needed
        console.log("World boxes initialized for hover effects");
    }

    // Stats Section Animation
    const statsSection = document.querySelector('#stats-section');

    if (statsSection) {
        new ScrollMagic.Scene({
            triggerElement: '#stats-section',
            triggerHook: 0.7, // Trigger when section is 70% from the top of the viewport
            reverse: false    // Animation only happens once
        })
        .setClassToggle('#stats-section', 'is-visible') // Add 'is-visible' class to the section
        .addTo(controller);
    } else {
        console.error("Stats section not found for fade-in animation.");
    }
});
