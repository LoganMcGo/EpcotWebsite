document.addEventListener('DOMContentLoaded', function () {
    
    gsap.registerPlugin(ScrollToPlugin);
    
    
    var controller = new ScrollMagic.Controller();
    
    
    const sections = document.querySelectorAll('section');
    let isScrolling = false;
    let currentSection = 0;
    
    // Side Navigation Bar
    const sideNav = document.getElementById('side-nav');
    const navLinks = document.querySelectorAll('#side-nav a');
    
    // Map button scroll functionality
    const mapButton = document.getElementById('map-scroll-button');
    const twoWorldsSection = document.getElementById('two-worlds-section');
    
    if (mapButton && twoWorldsSection) {
        mapButton.addEventListener('click', function() {
            gsap.to(window, {
                duration: 2,
                scrollTo: {
                    y: twoWorldsSection.offsetTop,
                    autoKill: false
                },
                ease: "power1.inOut"
            });
        });
    }
    
    // Media button scroll functionality
    const mediaButton = document.getElementById('media-scroll-button');
    const gallerySection = document.getElementById('gallery-section');
    
    if (mediaButton && gallerySection) {
        mediaButton.addEventListener('click', function() {
            gsap.to(window, {
                duration: 2,
                scrollTo: {
                    y: gallerySection.offsetTop,
                    autoKill: false
                },
                ease: "power1.inOut"
            });
        });
    }
    
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
    
    // Gallery section for free scrolling
    let isInGallerySection = false;
    
    // Function to check if we're in the gallery section
    function checkIfInGallerySection() {
        if (!gallerySection) return false;
        
        const galleryRect = gallerySection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Consider in gallery section if it occupies most of the viewport
        return galleryRect.top <= windowHeight * 0.3 && galleryRect.bottom >= windowHeight * 0.7;
    }
    
    // Modified wheel event listener to handle gallery section differently
    window.addEventListener('wheel', (e) => {
        // Update the gallery section status
        isInGallerySection = checkIfInGallerySection();
        
        // If in gallery section, allow normal scrolling
        if (isInGallerySection) {
            return; // Don't prevent default, allow normal scrolling
        }
        
        // Otherwise use the section-snapping behavior
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
    
    // Future World Pavilions Section Animation
    const futureWorldPavilionsSection = document.querySelector('#future-world-pavilions');

    if (futureWorldPavilionsSection) {
        new ScrollMagic.Scene({
            triggerElement: '#future-world-pavilions',
            triggerHook: 0.7, // Trigger when section is 70% from the top of the viewport
            reverse: false    // Animation only happens once
        })
        .setClassToggle('#future-world-pavilions', 'is-visible') // Add 'is-visible' class to the section
        .addTo(controller);
        
        // Add hover functionality for the pavilion items
        const futurePavilionItems = document.querySelectorAll('#future-world-pavilions .pavilion-item');
        const futureFunFactText = document.getElementById('future-world-fun-fact');
        const futureDefaultFunFactText = futureFunFactText.textContent;
        
        futurePavilionItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const funFact = this.getAttribute('data-fun-fact');
                if (funFact && futureFunFactText) {
                    futureFunFactText.textContent = funFact;
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (futureFunFactText) {
                    futureFunFactText.textContent = futureDefaultFunFactText;
                }
            });
        });
    } else {
        console.error("Future World Pavilions section not found for fade-in animation.");
    }
    
    // World Showcase Pavilions Section Animation
    const worldShowcasePavilionsSection = document.querySelector('#world-showcase-pavilions');

    if (worldShowcasePavilionsSection) {
        new ScrollMagic.Scene({
            triggerElement: '#world-showcase-pavilions',
            triggerHook: 0.7, // Trigger when section is 70% from the top of the viewport
            reverse: false    // Animation only happens once
        })
        .setClassToggle('#world-showcase-pavilions', 'is-visible') // Add 'is-visible' class to the section
        .addTo(controller);
        
        // Add hover functionality for the pavilion items
        const worldShowcasePavilionItems = document.querySelectorAll('#world-showcase-pavilions .pavilion-item');
        const worldShowcaseFunFactText = document.getElementById('world-showcase-fun-fact');
        const worldShowcaseDefaultFunFactText = worldShowcaseFunFactText.textContent;
        
        worldShowcasePavilionItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const funFact = this.getAttribute('data-fun-fact');
                if (funFact && worldShowcaseFunFactText) {
                    worldShowcaseFunFactText.textContent = funFact;
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (worldShowcaseFunFactText) {
                    worldShowcaseFunFactText.textContent = worldShowcaseDefaultFunFactText;
                }
            });
        });
    } else {
        console.error("World Showcase Pavilions section not found for fade-in animation.");
    }
    
    // Moving Forward Section Animation
    const movingForwardSection = document.querySelector('#moving-forward-section');

    if (movingForwardSection) {
        new ScrollMagic.Scene({
            triggerElement: '#moving-forward-section',
            triggerHook: 0.7, // Trigger when section is 70% from the top of the viewport
            reverse: false    // Animation only happens once
        })
        .setClassToggle('#moving-forward-section', 'is-visible') // Add 'is-visible' class to the section
        .addTo(controller);
    } else {
        console.error("Moving Forward section not found for fade-in animation.");
    }
    
    // Gallery Section Animation
    if (gallerySection) {
        new ScrollMagic.Scene({
            triggerElement: '#gallery-section',
            triggerHook: 0.7, // Trigger when section is 70% from the top of the viewport
            reverse: false    // Animation only happens once
        })
        .setClassToggle('#gallery-section', 'is-visible') // Add 'is-visible' class to the section
        .addTo(controller);
        
        // Add a scene to update the current section index when entering gallery
        new ScrollMagic.Scene({
            triggerElement: '#gallery-section',
            triggerHook: 0.5, // Middle of the viewport
            duration: '100%'  // Scene lasts for the entire section height
        })
        .on('enter', function() {
            // Find the index of the gallery section
            for (let i = 0; i < sections.length; i++) {
                if (sections[i].id === 'gallery-section') {
                    currentSection = i;
                    break;
                }
            }
        })
        .addTo(controller);
    } else {
        console.error("Gallery section not found for animation.");
    }
    
    // Side Navigation Bar Functionality
    
    // 1. Show the side nav when planning section comes into view
    if (sideNav) {
        new ScrollMagic.Scene({
            triggerElement: '#planning',
            triggerHook: 0.8, // Show a bit earlier than the section is fully visible
            reverse: true // Allow hiding when scrolling back up
        })
        .on('enter', function() {
            sideNav.classList.add('visible');
        })
        .on('leave', function() {
            sideNav.classList.remove('visible');
        })
        .addTo(controller);
        
        // 2. Handle navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1); // Remove the # from the href
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Find the index of the target section in the sections NodeList
                    for (let i = 0; i < sections.length; i++) {
                        if (sections[i] === targetSection) {
                            scrollToSection(i);
                            break;
                        }
                    }
                }
            });
        });
        
        // 3. Update active link based on current section
        const sectionIds = Array.from(navLinks).map(link => 
            link.getAttribute('href').substring(1) // Get all section IDs from nav links
        );
        
        // Create a scene for each section to update the active link
        sectionIds.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                new ScrollMagic.Scene({
                    triggerElement: `#${sectionId}`,
                    triggerHook: 0.5, // Middle of the viewport
                    duration: '100%' // Scene lasts for the entire section height
                })
                .on('enter', function() {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to the corresponding link
                    const activeLink = document.querySelector(`#side-nav a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                })
                .addTo(controller);
            }
        });
    }
});
