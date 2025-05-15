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
    
    // Introduction button scroll functionality for my_experiences.html
    const introductionButton = document.getElementById('introduction-scroll-button');
    const myExperiencesIntroSection = document.getElementById('introduction');
    
    if (introductionButton && myExperiencesIntroSection) {
        introductionButton.addEventListener('click', function() {
            gsap.to(window, {
                duration: 2,
                scrollTo: {
                    y: myExperiencesIntroSection.offsetTop,
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
        // Convert hover functionality to click for the Two Worlds section
        let activeBox = null;

        // Function to close any active box
        const closeActiveBox = () => {
            if (activeBox) {
                activeBox.classList.remove('active-box');
                activeBox = null;
            }
        };

        // Click handler for World Showcase box
        worldShowcaseBox.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling to document
            if (activeBox === worldShowcaseBox) {
                // If this box is already active, close it
                closeActiveBox();
            } else {
                // Close any active box and activate this one
                closeActiveBox();
                worldShowcaseBox.classList.add('active-box');
                activeBox = worldShowcaseBox;
            }
        });

        // Click handler for Future World box
        futureWorldBox.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling to document
            if (activeBox === futureWorldBox) {
                // If this box is already active, close it
                closeActiveBox();
            } else {
                // Close any active box and activate this one
                closeActiveBox();
                futureWorldBox.classList.add('active-box');
                activeBox = futureWorldBox;
            }
        });

        // Close active box when clicking anywhere else on the document
        document.addEventListener('click', function() {
            closeActiveBox();
        });

        console.log("World boxes initialized for click events");
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
            item.addEventListener('click', function() {
                const funFact = this.getAttribute('data-fun-fact');
                if (funFact && futureFunFactText) {
                    futureFunFactText.textContent = funFact;
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
            item.addEventListener('click', function() {
                const funFact = this.getAttribute('data-fun-fact');
                if (funFact && worldShowcaseFunFactText) {
                    worldShowcaseFunFactText.textContent = funFact;
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
    
    // Vision Section (for Original Design page) - No animation
    const visionSection = document.querySelector('#vision-section');
    
    // Radial Design Section (for Original Design page) - No animation
    const radialDesignSection = document.querySelector('#radial-design-section');
    
    // Infrastructure Section (for Original Design page) - No animation
    const infrastructureSection = document.querySelector('#infrastructure-section');
    
    // Living Environment Section (for Original Design page) - No animation
    const livingEnvironmentSection = document.querySelector('#living-environment-section');
    
    // Film & Model Section Animation (for Original Design page)
    const filmModelSection = document.querySelector('#film-model-section');

    if (filmModelSection) {
        new ScrollMagic.Scene({
            triggerElement: '#film-model-section',
            triggerHook: 0.7, // Trigger when section is 70% from the top of the viewport
            reverse: false    // Animation only happens once
        })
        .setClassToggle('#film-model-section', 'is-visible') // Add 'is-visible' class to the section
        .addTo(controller);
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
    
    // Introduction Section Animation (for 80s_90s.html)
    const eraIntroductionSection = document.querySelector('#era-introduction');
    
    if (eraIntroductionSection) {
        new ScrollMagic.Scene({
            triggerElement: '#era-introduction',
            triggerHook: 0.7, // Trigger when section is 70% from the top of the viewport
            reverse: false    // Animation only happens once
        })
        .setClassToggle('#era-introduction', 'is-visible') // Add 'is-visible' class to the section
        .addTo(controller);
        
        // Fade in the intro text
        const introTextContainer = document.querySelector('.intro-text-container');
        if (introTextContainer) {
            new ScrollMagic.Scene({
                triggerElement: '.intro-text-container',
                triggerHook: 0.8,
                reverse: false
            })
            .setTween(gsap.to(introTextContainer, { opacity: 1, y: 0, duration: 1.5, ease: "power1.inOut" }))
            .addTo(controller);
        }
    }
    
    // Future World Additions Section Animation (for 80s_90s.html)
    const futureWorldSection = document.querySelector('#future-world-additions');
    
    if (futureWorldSection) {
        // Animate the future world pavilion cards with staggered delay
        const futureWorldCards = document.querySelectorAll('#future-world-additions .pavilion-card');
        
        // Add animation classes with delays to create staggered effect
        if (futureWorldCards.length > 0) {
            futureWorldCards.forEach((card, index) => {
                card.classList.add(`delay-${index * 100}`);
                
                new ScrollMagic.Scene({
                    triggerElement: card.parentElement,
                    triggerHook: 0.8,
                    reverse: false
                })
                .on('enter', function() {
                    card.classList.add('fade-in');
                })
                .addTo(controller);
            });
        }
    }
    
    // World Showcase Grows Section Animation (for 80s_90s.html)
    const worldShowcaseSection = document.querySelector('#world-showcase-grows');
    
    if (worldShowcaseSection) {
        // Animate the world showcase pavilion cards with staggered delay
        const worldShowcaseCards = document.querySelectorAll('#world-showcase-grows .pavilion-card');
        const unbuiltPavilions = document.querySelector('.unbuilt-pavilions');
        
        // Add animation classes with delays to create staggered effect
        if (worldShowcaseCards.length > 0) {
            worldShowcaseCards.forEach((card, index) => {
                card.classList.add(`delay-${index * 100}`);
                
                new ScrollMagic.Scene({
                    triggerElement: card.parentElement,
                    triggerHook: 0.8,
                    reverse: false
                })
                .on('enter', function() {
                    card.classList.add('fade-in');
                })
                .addTo(controller);
            });
        }
        
        // Animate the unbuilt pavilions note
        if (unbuiltPavilions) {
            new ScrollMagic.Scene({
                triggerElement: unbuiltPavilions,
                triggerHook: 0.85,
                reverse: false
            })
            .on('enter', function() {
                unbuiltPavilions.classList.add('fade-in');
            })
            .addTo(controller);
        }
    }
    
    // Side Navigation Bar Functionality
    
    // 1. Show the side nav when planning section, vision section, or pavilion growth section comes into view
    if (sideNav) {
        // For opening_day.html - planning section
        const planningSection = document.querySelector('#planning');
        if (planningSection) {
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
        }
        
        // For original_design.html - vision section
        const visionSection = document.querySelector('#vision-section');
        if (visionSection) {
            new ScrollMagic.Scene({
                triggerElement: '#vision-section',
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
        }
        
        // For 80s_90s.html - introduction, future world, and world showcase sections
        if (eraIntroductionSection) {
            new ScrollMagic.Scene({
                triggerElement: '#era-introduction',
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
        }
        
        // For 90s_00s.html - era transition section
        const eraTransitionSection = document.querySelector('#era-transition');
        if (eraTransitionSection) {
            new ScrollMagic.Scene({
                triggerElement: '#era-transition',
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
        }
        
        // For 00-15.html - new era section
        const newEraSection = document.querySelector('#new-era');
        if (newEraSection) {
            new ScrollMagic.Scene({
                triggerElement: '#new-era',
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
        }
        
        // For my_experiences.html - introduction section
        const myExperiencesIntroSection = document.querySelector('#introduction');
        if (myExperiencesIntroSection) {
            new ScrollMagic.Scene({
                triggerElement: '#introduction',
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
            
            // Animate the introduction section
            new ScrollMagic.Scene({
                triggerElement: '#introduction',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#introduction', 'is-visible')
            .addTo(controller);
        }
        
        // For my_experiences.html - annual pilgrimage section
        const annualPilgrimageSection = document.querySelector('#annual-pilgrimage');
        if (annualPilgrimageSection) {
            new ScrollMagic.Scene({
                triggerElement: '#annual-pilgrimage',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#annual-pilgrimage', 'is-visible')
            .addTo(controller);
            
            // Animate the ritual cards with staggered delay
            const ritualCards = document.querySelectorAll('#annual-pilgrimage .ritual-card');
            
            // Add animation classes with delays to create staggered effect
            if (ritualCards.length > 0) {
                ritualCards.forEach((card, index) => {
                    card.classList.add(`delay-${index * 100}`);
                    
                    new ScrollMagic.Scene({
                        triggerElement: card.parentElement,
                        triggerHook: 0.8,
                        reverse: false
                    })
                    .on('enter', function() {
                        card.classList.add('fade-in');
                    })
                    .addTo(controller);
                });
            }
        }
        
        // For my_experiences.html - sharing magic section
        const sharingMagicSection = document.querySelector('#sharing-magic');
        if (sharingMagicSection) {
            new ScrollMagic.Scene({
                triggerElement: '#sharing-magic',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#sharing-magic', 'is-visible')
            .addTo(controller);
        }
        
        // For my_experiences.html - favorite attractions section
        const favoriteAttractionsSection = document.querySelector('#favorite-attractions');
        if (favoriteAttractionsSection) {
            new ScrollMagic.Scene({
                triggerElement: '#favorite-attractions',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#favorite-attractions', 'is-visible')
            .addTo(controller);
        }
        
        // For my_experiences.html - culinary tour section
        const culinaryTourSection = document.querySelector('#culinary-tour');
        if (culinaryTourSection) {
            new ScrollMagic.Scene({
                triggerElement: '#culinary-tour',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#culinary-tour', 'is-visible')
            .addTo(controller);
            
            // Animate the pavilion cards with staggered delay
            const pavilionCards = document.querySelectorAll('#culinary-tour .pavilion-card');
            
            // Add animation classes with delays to create staggered effect
            if (pavilionCards.length > 0) {
                pavilionCards.forEach((card, index) => {
                    card.classList.add(`delay-${index * 100}`);
                    
                    new ScrollMagic.Scene({
                        triggerElement: card.parentElement,
                        triggerHook: 0.8,
                        reverse: false
                    })
                    .on('enter', function() {
                        card.classList.add('fade-in');
                    })
                    .addTo(controller);
                });
            }
        }
        
        // For my_experiences.html - festival fun section
        const festivalFunSection = document.querySelector('#festival-fun');
        if (festivalFunSection) {
            new ScrollMagic.Scene({
                triggerElement: '#festival-fun',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#festival-fun', 'is-visible')
            .addTo(controller);
        }
        
        // For my_experiences.html - nostalgic reflections section
        const nostalgicReflectionsSection = document.querySelector('#nostalgic-reflections');
        if (nostalgicReflectionsSection) {
            new ScrollMagic.Scene({
                triggerElement: '#nostalgic-reflections',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#nostalgic-reflections', 'is-visible')
            .addTo(controller);
        }
        
        // For 90s_00s.html - illuminations section
        const illuminationsSection = document.querySelector('#illuminations');
        if (illuminationsSection) {
            new ScrollMagic.Scene({
                triggerElement: '#illuminations',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#illuminations', 'is-visible')
            .addTo(controller);
        }
        
        // For 00-15.html - moving forward section
        const movingForwardSection = document.querySelector('#moving-forward');
        if (movingForwardSection) {
            new ScrollMagic.Scene({
                triggerElement: '#moving-forward',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#moving-forward', 'is-visible')
            .addTo(controller);
        }
        
        // For 00-15.html - future world reimagined section
        const futureWorldReimaginedSection = document.querySelector('#future-world-reimagined');
        if (futureWorldReimaginedSection) {
            new ScrollMagic.Scene({
                triggerElement: '#future-world-reimagined',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#future-world-reimagined', 'is-visible')
            .addTo(controller);
            
            // Animate the pavilion cards with staggered delay
            const futureWorldCards = document.querySelectorAll('#future-world-reimagined .pavilion-card');
            
            // Add animation classes with delays to create staggered effect
            if (futureWorldCards.length > 0) {
                futureWorldCards.forEach((card, index) => {
                    card.classList.add(`delay-${index * 100}`);
                    
                    new ScrollMagic.Scene({
                        triggerElement: card.parentElement,
                        triggerHook: 0.8,
                        reverse: false
                    })
                    .on('enter', function() {
                        card.classList.add('fade-in');
                    })
                    .addTo(controller);
                });
            }
        }
        
        // For 00-15.html - world showcase evolution section
        const worldShowcaseEvolutionSection = document.querySelector('#world-showcase-evolution');
        if (worldShowcaseEvolutionSection) {
            new ScrollMagic.Scene({
                triggerElement: '#world-showcase-evolution',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#world-showcase-evolution', 'is-visible')
            .addTo(controller);
        }
        
        // For 00-15.html - milestones & anniversaries section
        const milestonesSection = document.querySelector('#milestones-anniversaries');
        if (milestonesSection) {
            new ScrollMagic.Scene({
                triggerElement: '#milestones-anniversaries',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#milestones-anniversaries', 'is-visible')
            .addTo(controller);
            
            // Animate the feature cards with staggered delay
            const featureCards = document.querySelectorAll('#milestones-anniversaries .feature-card');
            
            // Add animation classes with delays to create staggered effect
            if (featureCards.length > 0) {
                featureCards.forEach((card, index) => {
                    card.classList.add(`delay-${index * 100}`);
                    
                    new ScrollMagic.Scene({
                        triggerElement: card.parentElement,
                        triggerHook: 0.8,
                        reverse: false
                    })
                    .on('enter', function() {
                        card.classList.add('fade-in');
                    })
                    .addTo(controller);
                });
            }
        }
        
        // For 00-15.html - shifting landscape section
        const shiftingLandscapeSection = document.querySelector('#shifting-landscape');
        if (shiftingLandscapeSection) {
            new ScrollMagic.Scene({
                triggerElement: '#shifting-landscape',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#shifting-landscape', 'is-visible')
            .addTo(controller);
        }
        
        // For 00-15.html - rhythms of a new age section
        const rhythmsNewAgeSection = document.querySelector('#rhythms-new-age');
        if (rhythmsNewAgeSection) {
            new ScrollMagic.Scene({
                triggerElement: '#rhythms-new-age',
                triggerHook: 0.7,
                reverse: false
            })
            .setClassToggle('#rhythms-new-age', 'is-visible')
            .addTo(controller);
        }
        
        if (futureWorldSection) {
            // Side nav is already visible from introduction section, so we don't need to add/remove the visible class here
            // But we'll keep this scene for updating the active link
            new ScrollMagic.Scene({
                triggerElement: '#future-world-additions',
                triggerHook: 0.5,
                reverse: true
            })
            .addTo(controller);
        }
        
        if (worldShowcaseSection) {
            // Side nav is already visible from introduction section, so we don't need to add/remove the visible class here
            // But we'll keep this scene for updating the active link
            new ScrollMagic.Scene({
                triggerElement: '#world-showcase-grows',
                triggerHook: 0.5,
                reverse: true
            })
            .addTo(controller);
        }
        
        // 2. Handle navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only prevent default for section links (those with #)
                // Allow direct navigation for links like index.html
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1); // Remove the # from the href
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
                }
                // For non-section links (like index.html), let the browser handle navigation normally
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
    
    // Gallery Modal Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image-content');
    const closeModalButton = document.querySelector('.modal-close-button');

    if (modal && modalImage && closeModalButton) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.getAttribute('src');
                const imgAlt = this.getAttribute('alt');
                
                modalImage.setAttribute('src', imgSrc);
                modalImage.setAttribute('alt', "Enlarged: " + imgAlt);
                
                modal.classList.add('visible');
                // Disable body scroll when modal is open
                document.body.style.overflow = 'hidden';
            });
        });

        // Function to close the modal
        function closeModal() {
            modal.classList.remove('visible');
            // Re-enable body scroll
            document.body.style.overflow = '';
        }

        // Close modal when the close button is clicked
        closeModalButton.addEventListener('click', closeModal);

        // Close modal when clicking outside the image (on the modal background)
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('visible')) {
                closeModal();
            }
        });
    }
});
