// ========== UTILITY FUNCTIONS ==========
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ========== NAVIGATION ==========
const navbar = $('#navbar');
const hamburger = $('#hamburger');
const navMenu = $('#nav-menu');
const navLinks = $$('.nav-link');

// Hamburger menu toggle
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = $$('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = $(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
});

// ========== TYPING EFFECT ==========
const typingText = $('.typing-text');
const phrases = [
    'Robotics Researcher',
    'ROS2 Developer',
    'Autonomous Systems Engineer',
    'ECE Student @ MIT',
    'Hardware & Software Integrator'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }
});

// ========== SMOOTH SCROLLING ==========
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = $(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('load', () => {
    const animatedElements = $$('.project-card, .timeline-item, .skill-category, .cert-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = $('#back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== CONTACT FORM ==========
const contactForm = $('#contact-form');
const formStatus = $('#form-status');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: $('#name').value,
        email: $('#email').value,
        subject: $('#subject').value,
        message: $('#message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showFormStatus('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
    }

    // Disable submit button during submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        // OPTION 1: Using EmailJS (Recommended - Free)
        // Sign up at https://www.emailjs.com/ and replace with your credentials
        /*
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(() => {
                showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                showFormStatus('Failed to send message. Please try again.', 'error');
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        */

        // OPTION 2: Using FormSpree (Simple alternative)
        // Replace with your FormSpree endpoint
        /*
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
        */

        // OPTION 3: Using custom backend (Node.js/Express)
        // Replace with your backend endpoint
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
        */

        // TEMPORARY: For demo/testing - just show success message
        // Remove this and uncomment one of the options above for production
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();

    } catch (error) {
        showFormStatus('Failed to send message. Please try again or email directly.', 'error');
        console.error('Form Error:', error);
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = type;
    formStatus.style.display = 'block';

    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// ========== PROJECT CARD HOVER EFFECTS ==========
const projectCards = $$('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// ========== STATS COUNTER ANIMATION ==========
const stats = $$('.stat-item h3');
let hasAnimated = false;

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toString();
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('.')) {
                    // Animate decimal numbers
                    const target = parseFloat(text);
                    let current = 0;
                    const increment = target / 100;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target.toFixed(2);
                            clearInterval(timer);
                        } else {
                            stat.textContent = current.toFixed(2);
                        }
                    }, 20);
                } else {
                    // Animate whole numbers
                    const target = parseInt(text.replace('+', ''));
                    animateCounter(stat, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = $('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ========== SKILL TAGS INTERACTION ==========
const skillTags = $$('.skill-tag, .project-tags span');

skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            tag.style.animation = '';
        }, 500);
    });
});

// ========== COPY EMAIL ON CLICK ==========
const emailLinks = $$('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');

        navigator.clipboard.writeText(email).then(() => {
            // Create temporary tooltip
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: absolute;
                background: #10b981;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                pointer-events: none;
                z-index: 1000;
            `;

            link.parentElement.style.position = 'relative';
            link.parentElement.appendChild(tooltip);

            setTimeout(() => {
                tooltip.remove();
                // Also open email client
                window.location.href = link.href;
            }, 1500);
        }).catch(() => {
            // Fallback: just open email client
            window.location.href = link.href;
        });
    });
});

// ========== GITHUB LINK ANALYTICS ==========
const githubLinks = $$('a[href*="github.com"]');

githubLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('GitHub link clicked:', link.href);
        // Add analytics tracking here if needed
    });
});

// ========== LAZY LOADING IMAGES ==========
const images = $$('img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ========== CONSOLE MESSAGE ==========
console.log('%cPortfolio by Tushar S Chillal', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cInterested in robotics and autonomous systems? Let's connect!', 'color: #64748b; font-size: 14px;');
console.log('%cGitHub: https://github.com/tusharChillal', 'color: #3b82f6; font-size: 12px;');

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Ctrl/Cmd + K for quick navigation (optional)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        $('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Add any scroll-based operations that need debouncing here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ========== ACCESSIBILITY ==========
// Focus trap for mobile menu
navMenu?.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = navMenu.querySelectorAll('a[href]');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// ========== PRELOADER (Optional) ==========
window.addEventListener('load', () => {
    const preloader = $('#preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ========== SERVICE WORKER (Optional - for PWA) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA functionality
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
        */
    });
}