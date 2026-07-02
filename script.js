// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling

            // Contact form handling with Formspree
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const button = this.querySelector("button");
        const originalText = button.textContent;

        button.textContent = "Sending...";
        button.disabled = true;

        try {
            const response = await fetch(this.action, {
                method: "POST",
                body: new FormData(this),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                button.textContent = "✓ Message Sent!";
                button.style.background = "#2ecc71";
                this.reset();
            } else {
                button.textContent = "Failed to Send";
                button.style.background = "#e74c3c";
            }
        } catch (error) {
            button.textContent = "Network Error";
            button.style.background = "#e74c3c";
        }

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = "";
        }, 3000);
    });
}
// Scroll animations
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

// Observe project cards and skill categories
document.querySelectorAll('.project-card, .skill-category, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '';
        link.style.borderBottomColor = '';
    });
    
    if (current) {
        const activeLink = document.querySelector(`.nav-links a[href="#${current}"]`);
        if (activeLink) {
            activeLink.style.color = 'var(--primary-color)';
        }
    }
});
