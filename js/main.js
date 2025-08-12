// Main JavaScript for Pivot Energy Ltd Website
function showCustomAlert(message, type = 'success') {
  const alertBox = document.getElementById('custom-alert');
  alertBox.textContent = message;
  alertBox.className = `alert ${type} show`;
  
  setTimeout(() => {
    alertBox.classList.remove('show');
  }, 2000);
}
// Main JavaScript for Pivot Energy Ltd Website

// Firebase imports
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCttIMwThN95ujnztoQdbFRBkKgLOE_KB0",
    authDomain: "software-hub-solutions.firebaseapp.com",
    projectId: "software-hub-solutions",
    storageBucket: "software-hub-solutions.firebasestorage.app",
    messagingSenderId: "833426367145",
    appId: "1:833426367145:web:6415a475f09fb372363fb8",
    measurementId: "G-VSCJKTCZW2"
  };

// ✅ Prevent duplicate app initialization
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);


// Custom alert function
function showAlert(message, type = 'success') {
  const alertBox = document.getElementById('custom-alert');
  if (!alertBox) return;

  alertBox.textContent = message;
  alertBox.className = `alert ${type} show`;

  setTimeout(() => {
    alertBox.classList.remove('show');
  }, 4000);
}

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !subject || !message) {
      showAlert("Please fill in all fields.", "error");
      return;
    }

    try {
      // Send to Firestore
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        subject,
        message,
        timestamp: new Date()
      });

      // Send to WhatsApp
      const whatsappMessage = `Hello, I would like to get in touch:\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const phoneNumber = "254758002042";
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");

      showAlert("Message sent successfully!", "success");
      this.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      showAlert("Failed to send message. Please try again.", "error");
    }
  });
}



document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
    
    // Cursor Follower
    function initCursorFollower() {
        const cursorFollower = document.getElementById('cursorFollower');
        const cursorDot = document.getElementById('cursorDot');
        
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        
        // Hide cursor follower on mobile
        if (window.innerWidth <= 768) {
            cursorFollower.style.display = 'none';
            cursorDot.style.display = 'none';
        }
    }
    
    // Statistics Counter Animation
    function initStatisticsCounter() {
        const statItems = document.querySelectorAll('.stat-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const numberElement = target.querySelector('.stat-number');
                    const targetNumber = parseInt(target.dataset.target);
                    const suffix = target.querySelector('.stat-suffix').textContent;
                    
                    animateCounter(numberElement, targetNumber, suffix);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statItems.forEach(item => observer.observe(item));
    }
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (suffix === '+') {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            } else if (suffix === 'MW') {
                element.textContent = Math.floor(current) + ' ' + suffix;
            } else if (suffix === 'Tons') {
                element.textContent = Math.floor(current).toLocaleString() + ' ' + suffix;
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }
    
    // Testimonials Slider
    function initTestimonialsSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % testimonials.length;
            showSlide(next);
        }
        
        function prevSlide() {
            const prev = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(prev);
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Auto-play testimonials
        setInterval(nextSlide, 5000);
    }
    
    // Hero Slideshow Animation
    function initHeroSlideshow() {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        const slideInterval = 4000; // 4 seconds
        let slideTimer;
        
        // Filter out slides that might not have valid images
        const validSlides = Array.from(slides).filter(slide => {
            const bgImage = slide.style.backgroundImage;
            return bgImage && bgImage !== 'none';
        });
        
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (index < validSlides.length) {
                    indicator.style.display = 'block';
                    indicator.classList.toggle('active', index === currentSlide);
                } else {
                    indicator.style.display = 'none';
                }
            });
        }
        
        function goToSlide(slideIndex) {
            if (slideIndex < 0 || slideIndex >= validSlides.length) return;
            
            // Remove active class from current slide
            validSlides[currentSlide].classList.remove('active');
            
            // Update current slide
            currentSlide = slideIndex;
            
            // Add active class to new slide
            validSlides[currentSlide].classList.add('active');
            
            // Update indicators
            updateIndicators();
        }
        
        function nextSlide() {
            if (validSlides.length <= 1) return;
            goToSlide((currentSlide + 1) % validSlides.length);
        }
        
        function startSlideshow() {
            if (validSlides.length > 1) {
                slideTimer = setInterval(nextSlide, slideInterval);
            }
        }
        
        function stopSlideshow() {
            if (slideTimer) {
                clearInterval(slideTimer);
            }
        }
        
        // Initialize slideshow
        if (validSlides.length > 1) {
            updateIndicators();
            startSlideshow();
            
            // Preload images for smoother transitions
            validSlides.forEach(slide => {
                const bgImage = slide.style.backgroundImage;
                if (bgImage) {
                    const url = bgImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                    const img = new Image();
                    img.src = url;
                }
            });
            
            // Add click handlers for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    stopSlideshow();
                    goToSlide(index);
                    startSlideshow();
                });
            });
            
            // Pause slideshow on hover
            const heroSection = document.querySelector('.hero');
            heroSection.addEventListener('mouseenter', stopSlideshow);
            heroSection.addEventListener('mouseleave', startSlideshow);
        }
    }
    
    // Scroll Progress Bar
    function initScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            scrollProgress.style.width = scrollPercent + '%';
        });
    }
    
    // Initialize all features
    initLoadingScreen();
    initCursorFollower();
    initScrollProgress();
    initStatisticsCounter();
    initTestimonialsSlider();
    
    // Initialize slideshow
    initHeroSlideshow();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Background on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
    
   
   
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroWatermark = document.querySelector('.hero-watermark');
        if (heroWatermark) {
            heroWatermark.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project card click handlers (for future modal functionality)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click functionality for project details modal
            console.log('Project card clicked:', this.querySelector('h3').textContent);
        });
    });
    
    // Smooth reveal for sections
    const revealSections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
    
    // Performance optimization: Lazy loading for images (when you add them)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        // Apply to future images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    
    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Focus management for mobile menu
    hamburger.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            // Focus first menu item when opening
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });
    
    // Console welcome message
    console.log(`
    🌱 Welcome to Pivot Energy Ltd Website!
    
    This website is built with modern web technologies:
    - HTML5 for structure
    - CSS3 with custom properties and Grid/Flexbox
    - Vanilla JavaScript for interactivity
    - Responsive design for all devices
    - Accessibility features included
    
    For production deployment, consider:
    - Optimizing images and assets
    - Adding a CDN for better performance
    - Implementing proper SEO meta tags
    - Setting up analytics tracking
    - Adding SSL certificate
    
    Contact: info@pivot-energy.africa
    `);
    
});

// Utility functions
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential future use
window.PivotEnergy = {
    showNotification,
    debounce,
    throttle
}; 

