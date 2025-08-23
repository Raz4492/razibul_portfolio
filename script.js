// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = dropdown?.querySelector('.dropdown-menu');
    const dropdownItems = dropdownMenu?.querySelectorAll('.dropdown-item');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Smooth scrolling for all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Smooth scroll for dropdown items too
    dropdownItems?.forEach(item => {
        item.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                // Close menus on mobile
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Toggle dropdown on mobile
    if (dropdown && dropdownMenu) {
        dropdown.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownMenu.classList.toggle('active');
            }
        });
    }

    // Active navigation link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);


    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Animate stats when about section is visible
                if (entry.target.id === 'about') {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Publications section animation
    function animatePublications() {
        const publicationItems = document.querySelectorAll('.publication-item');
        
        publicationItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }
    function animateAchievements() {
        const achievementItems = document.querySelectorAll('.achievement-item');

        achievementItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }
  
    function animateCertifications() {
        const certificationItems = document.querySelectorAll('.certification-item');

        certificationItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }
    function animateLeadership() {
        const leadershipItems = document.querySelectorAll('.leadership-item');

        leadershipItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }   

    function animateExperience() {
        const experienceItems = document.querySelectorAll('.experience-item');

        experienceItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }
    function animateEducation() {
        const educationItems = document.querySelectorAll('.education-item');

        educationItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }
    function animateProjects() {
        const projectItems = document.querySelectorAll('.project-item');

        projectItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }

    // Skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.setProperty('--target-width', targetWidth);
                bar.classList.add('animate');
            }, index * 200);
        });
    }

    // Stats counter animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 50);
        });
    }

    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset previous errors
        clearFormErrors();
        
        let isValid = true;
        
        // Validate name
        if (name.length < 2) {
            showFormError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (subject.length < 3) {
            showFormError('subject', 'Subject must be at least 3 characters long');
            isValid = false;
        }
        
        // Validate message
        if (message.length < 10) {
            showFormError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 2000);
            }, 1000);
        }
    });

    function showFormError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        const inputElement = document.getElementById(fieldId);
        inputElement.style.borderColor = 'var(--error-color)';
    }

    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
        
        errorElements.forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
        
        inputElements.forEach(input => {
            input.style.borderColor = '';
        });
    }
});

// Project modal functionality
function openModal(projectId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const projectData = {
        1: {
            title: 'Career Canvas Mobile App',
            description: 'A comprehensive career development mobile application that helps users discover career paths, develop skills, and connect with opportunities. The app features AI-powered recommendations, skill assessments, and personalized learning paths.',
            features: [
                'AI-powered career recommendations',
                'Skill assessment and gap analysis',
                'Personalized learning paths',
                'Job market insights',
                'Professional networking features',
                'Progress tracking and analytics'
            ],
            technologies: ['React Native', 'Node.js', 'PostgreSQL', 'TensorFlow', 'Firebase', 'Stripe'],
            links: {
                github: '#',
                demo: '#',
                playstore: '#'
            }
        },
        2: {
            title: 'Healthcare Analytics Platform',
            description: 'A sophisticated web-based platform designed for healthcare professionals to analyze patient data, identify trends, and generate insights using machine learning algorithms. The platform ensures HIPAA compliance and provides real-time analytics.',
            features: [
                'Real-time data visualization',
                'Predictive analytics',
                'HIPAA compliant architecture',
                'Custom reporting tools',
                'Multi-tenant support',
                'API integration capabilities'
            ],
            technologies: ['Python', 'Django', 'React', 'TensorFlow', 'PostgreSQL', 'Redis'],
            links: {
                github: '#',
                demo: '#'
            }
        },
        3: {
            title: 'E-Commerce Solution',
            description: 'A full-featured e-commerce platform built for scalability and performance. Includes advanced inventory management, payment processing, customer analytics, and a modern admin dashboard.',
            features: [
                'Multi-vendor marketplace',
                'Advanced inventory management',
                'Payment gateway integration',
                'Customer analytics dashboard',
                'SEO optimization',
                'Mobile-responsive design'
            ],
            technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'Stripe', 'AWS'],
            links: {
                github: '#',
                demo: '#'
            }
        },
    4: {
        title: 'Diabetes-Cancer Comorbidity Network',
        description: 'Bioinformatics model analyzing disease interactions...',
        features: [
            'Network-based interaction analysis',
            'Gene-disease relationship mapping',
            'Visual disease network modeling',
            'Comparative analytics for comorbidity clusters',
            'CSV/JSON data export'
        ],
        technologies: ['Python', 'BioPython', 'NetworkX', 'Matplotlib'],
        links: { github: '#', demo: '#' }
    },
    5: {
        title: 'Solution Prediction ML Apps',
        description: 'Streamlit apps for ML forecasting and analytics...',
        features: [
            'Real-time model predictions',
            'User-friendly UI with Streamlit',
            'Multi-model pipeline support',
            'Integrated matplotlib charts',
            'Exportable reports'
        ],
        technologies: ['Python', 'Streamlit', 'Scikit-learn', 'Matplotlib'],
        links: { github: '#', demo: '#' }
    },
    6: {
        title: 'E-commerce Mobile Application',
        description: 'Cross-platform Flutter app for e-commerce...',
        features: [
            'User authentication',
            'Real-time inventory sync',
            'Payment integration',
            'Product filtering & search',
            'Firebase cloud backend'
        ],
        technologies: ['Flutter', 'Firebase', 'Bloc', 'Dart'],
        links: { github: '#', demo: '#', playstore: '#' }
    },
    7: {
        title: 'Point-of-Sale (POS) System',
        description: 'Mobile POS with offline functionality...',
        features: [
            'Offline support',
            'Barcode scanning',
            'Sales reporting',
            'Inventory control',
            'Language localization'
        ],
        technologies: ['Flutter', 'Sqflite', 'Localization', 'Provider'],
        links: { github: '#', demo: '#' }
    },
    8: {
        title: 'HRMS Management System',
        description: 'Full-stack HR platform with admin and employee dashboards...',
        features: [
            'Attendance and leave tracking',
            'Role-based access control',
            'Payroll module',
            'Data export (CSV/PDF)',
            'Responsive admin dashboard'
        ],
        technologies: ['.NET Core', 'Angular', 'SQL Server', 'JWT Auth'],
        links: { github: '#', demo: '#' }
    }
};

    
    
    
    const project = projectData[projectId];
    
    modalBody.innerHTML = `
        <h2 style="margin-bottom: 16px; color: var(--text-primary);">${project.title}</h2>
        <p style="margin-bottom: 24px; color: var(--text-secondary); line-height: 1.7;">${project.description}</p>
        
        <h3 style="margin-bottom: 16px; color: var(--text-primary);">Key Features</h3>
        <ul style="margin-bottom: 24px; padding-left: 20px;">
            ${project.features.map(feature => `<li style="margin-bottom: 8px; color: var(--text-secondary);">${feature}</li>`).join('')}
        </ul>
        
        <h3 style="margin-bottom: 16px; color: var(--text-primary);">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
            ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
        </div>
        
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            ${project.links.github ? `<a href="${project.links.github}" class="btn btn-primary" target="_blank">
                <i class="fab fa-github"></i> View Code
            </a>` : ''}
            ${project.links.demo ? `<a href="${project.links.demo}" class="btn btn-secondary" target="_blank">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>` : ''}
            ${project.links.playstore ? `<a href="${project.links.playstore}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-google-play"></i> Play Store
            </a>` : ''}
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
window.addEventListener('load', function() {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const originalText = heroName.textContent;
        setTimeout(() => {
            typeWriter(heroName, originalText, 150);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-placeholder');
    
    if (hero && heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add loading states and animations
function addLoadingAnimations() {
    const cards = document.querySelectorAll('.project-card, .education-item, .publication-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}
// Select the button
const btn = document.querySelector(".show-more-btn");
  const extra = document.querySelector(".education-extra");

  btn.addEventListener("click", () => {
    extra.classList.toggle("hidden");
    btn.textContent = extra.classList.contains("hidden") ? "Show More" : "Show Less";
  });


// Initialize all animations
window.addEventListener('load', addLoadingAnimations);

// Utility function for smooth reveal animations
function revealElements() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Enhanced form validation with real-time feedback
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + '-error');
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldId) {
        case 'name':
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'subject':
            if (value.length < 3) {
                errorMessage = 'Subject must be at least 3 characters long';
                isValid = false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters long';
                isValid = false;
            }
            break;
    }
    
    if (isValid) {
        field.style.borderColor = 'var(--success-color)';
        field.classList.remove('error');
        errorElement.classList.remove('show');
    } else {
        field.style.borderColor = 'var(--error-color)';
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }
    
    return isValid;
}

// Theme toggle functionality (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add scroll-to-top button
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.classList.add('scroll-to-top');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 48px;
        height: 48px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(scrollButton);
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);