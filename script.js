// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top button functionality
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('active');
        } else {
            scrollToTopButton.classList.remove('active');
        }
    });
    
    // Smooth scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links when scrolling to the corresponding section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Handle contact form submission (this is just a demo - no actual form submission)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // Here we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Simple typing effect for the header text (optional)
    const titles = ['PhD Researcher in Computer Science', 'Deep Learning Specialist', 'Time Series Analysis Expert', 'Computer Vision Researcher'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentTitle = titles[titleIndex];
        const headerTitle = document.querySelector('.header-text p');
        
        if (!headerTitle) return;
        
        // If in deleting state
        if (isDeleting) {
            // Remove a character
            headerTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
            
            // If all characters are deleted
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length; // Move to next title
                typingSpeed = 200; // Pause before typing next title
            }
        } 
        // If in typing state
        else {
            // Add a character
            headerTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
            
            // If title is completely typed
            if (charIndex === currentTitle.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause before deleting
            }
        }
        
        // Call the function again after the typing speed delay
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Uncomment this line to enable the typing effect
    // setTimeout(typeEffect, 1000);
    
    // Add animation to research items and project cards when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe research items and project cards
    document.querySelectorAll('.research-item, .project-card').forEach(item => {
        item.classList.add('fade-in'); // Add a class for animation
        observer.observe(item);
    });
    
    // Add CSS for the animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        nav a.active {
            color: var(--primary-color) !important;
            border-bottom: 2px solid var(--primary-color);
        }
    `;
    document.head.appendChild(style);

    // Animated Avatar Character - MOVED INSIDE DOMContentLoaded
    const avatar = document.getElementById('animated-avatar');
    const navLinks2 = document.querySelectorAll('nav a');  // Renamed to avoid conflict
    let currentSection = '';
    let isWaving = false;
    let isWalking = false;
    let avatarTimeout;

    // Initial waving
    avatar.classList.add('waving');
    isWaving = true;

    // Function to update avatar position based on current section
    function updateAvatarPosition() {
        const currentSectionElement = document.querySelector(`#${currentSection}`);
        
        if (!currentSectionElement) return;
        
        // Stop waving when moving
        if (isWaving) {
            avatar.classList.remove('waving');
            isWaving = false;
        }
        
        // Start walking animation
        avatar.classList.add('walking');
        isWalking = true;
        
        // Calculate section position - FIXED CALCULATION
        const rect = currentSectionElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionCenter = window.scrollY + rect.top + (rect.height / 2);
        const avatarBottom = Math.max(30, viewportHeight - sectionCenter + 100);
        
        // Animate avatar to section
        avatar.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        avatar.style.transform = 'scale(1)';
        avatar.style.bottom = `${avatarBottom}px`;
        
        // Stop walking animation and start waving after reaching the section
        clearTimeout(avatarTimeout);
        avatarTimeout = setTimeout(() => {
            avatar.classList.remove('walking');
            isWalking = false;
            
            // Jump when reaching the destination
            avatar.classList.add('jumping');
            
            setTimeout(() => {
                avatar.classList.remove('jumping');
                
                // Start waving after a delay
                setTimeout(() => {
                    avatar.classList.add('waving');
                    isWaving = true;
                }, 500);
            }, 500);
        }, 1000);
    }

    // Monitor scroll to update current section and avatar position
    window.addEventListener('scroll', function() {
        let newCurrentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                newCurrentSection = section.getAttribute('id');
            }
        });
        
        if (newCurrentSection !== currentSection) {
            currentSection = newCurrentSection;
            updateAvatarPosition();
        }
    });

    // Update avatar position when clicking on nav links
    navLinks2.forEach(link => {
        link.addEventListener('click', function() {
            const targetId = this.getAttribute('href').substring(1);
            currentSection = targetId;
            
            // Short delay to allow scrolling to start
            setTimeout(() => {
                updateAvatarPosition();
            }, 100);
        });
    });

    // Add click interaction to the avatar
    avatar.addEventListener('click', function() {
        if (!isWaving && !isWalking) {
            // Jump when clicked
            avatar.classList.add('jumping');
            
            setTimeout(() => {
                avatar.classList.remove('jumping');
                
                // Wave after jumping
                avatar.classList.add('waving');
                isWaving = true;
                
                // Stop waving after 2 seconds
                clearTimeout(avatarTimeout);
                avatarTimeout = setTimeout(() => {
                    avatar.classList.remove('waving');
                    isWaving = false;
                }, 2000);
            }, 500);
        }
    });

    // Initialize avatar position after page load
    setTimeout(() => {
        // Get initial section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Set initial position
        updateAvatarPosition();
    }, 500);
});