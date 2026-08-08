// ==========================================
// DARK MODE TOGGLE
// ==========================================
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved dark mode preference or default to system preference
const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

if (isDarkMode) {
    htmlElement.classList.add('dark-mode');
    updateDarkModeToggleIcon();
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark-mode');
        const isDark = htmlElement.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        updateDarkModeToggleIcon();
    });
}

function updateDarkModeToggleIcon() {
    const icon = darkModeToggle.querySelector('i');
    const isDark = htmlElement.classList.contains('dark-mode');

    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        darkModeToggle.title = 'Toggle Light Mode';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        darkModeToggle.title = 'Toggle Dark Mode';
    }
}

// ==========================================
// IMAGE MODAL FUNCTIONALITY
// ==========================================
const profileImageBox = document.getElementById('profileImageBox');
const imageModal = document.getElementById('imageModal');
const closeModalBtn = document.querySelector('.close-modal');

if (profileImageBox && imageModal) {
    // Open modal when clicking on image box
    profileImageBox.addEventListener('click', () => {
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // Close modal when clicking the X button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            imageModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside the modal content
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('show')) {
            imageModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ==========================================
// CONTACT FORM SUBMISSION
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form values
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const message = this.querySelector('textarea').value;

                // Create mailto link
                const mailtoLink = `mailto:arghyasingha101@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Message sent! Please complete the email in your default mail client.');
        
        // Reset form
        this.reset();
    });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = 'success', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after duration
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and project cards
const skillCards = document.querySelectorAll('.skill-category');
const projectCards = document.querySelectorAll('.project-card');

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ==========================================
// SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ==========================================
// TYPE EFFECT FOR HERO SECTION
// ==========================================
const typeEffect = () => {
    const titleElement = document.querySelector('.description');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    let index = 0;
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
};

// Call type effect when page loads
window.addEventListener('load', () => {
    // Uncomment the line below to enable typing effect
    // typeEffect();
});

// ==========================================
// LAZY LOADING FOR IMAGES
// ==========================================
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            if (!img.src) {
                img.src = img.dataset.src;
            }
            
            observer.unobserve(img);
        }
    });
}, {
    threshold: 0.1
});

images.forEach(img => imageObserver.observe(img));

// ==========================================
// PARTICLE BACKGROUND (Optional)
// ==========================================
const createParticles = () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    `;
    
    heroSection.style.position = 'relative';
    heroSection.appendChild(particlesContainer);
    
    // Create a few particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(233, 69, 96, 0.3);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s infinite linear;
        `;
        
        particlesContainer.appendChild(particle);
    }
};

// Add CSS for float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        50% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .nav-menu a.active {
        color: var(--accent-color);
    }
`;
document.head.appendChild(style);

// Initialize particles on load
window.addEventListener('load', () => {
    // Uncomment the line below to enable particle animation
    // createParticles();
});

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener('keydown', (e) => {
    // Skip navigation (Alt + H)
    if (e.altKey && e.key === 'h') {
        document.querySelector('.nav-menu a')?.focus();
    }
    
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// ==========================================
// DARK MODE TOGGLE (Optional Feature)
// ==========================================
const initDarkMode = () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    } else if (prefersDark.matches) {
        // Use system preference if no saved preference
        document.body.classList.add('dark-mode');
    }
};

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c👨‍💻 Welcome to Arghya Singha\'s Portfolio!', 'color: #e94560; font-size: 20px; font-weight: bold;');
console.log('%cFull Stack Web Developer | MERN Stack', 'color: #0f3460; font-size: 14px;');
console.log('%cGitHub: https://github.com/arghya746', 'color: #16213e; font-size: 12px;');
console.log('%cLet\'s connect! 🚀', 'color: #e94560; font-size: 12px;');