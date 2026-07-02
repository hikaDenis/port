// ===============================
// Smooth scrolling
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ===============================
// Contact Form (Formspree)
// ===============================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const button = this.querySelector("button");
        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = "Sending...";

        try {
            const response = await fetch(this.action, {
                method: "POST",
                body: new FormData(this),
                headers: {
                    Accept: "application/json"
                }
            });

            const data = await response.json();

            if (response.ok) {
                button.textContent = "✓ Message Sent!";
                button.style.background = "#2ecc71";
                this.reset();
            } else {
                console.error("Formspree Error:", data);

                button.textContent =
                    data.error ||
                    data.message ||
                    "Failed to Send";

                button.style.background = "#e74c3c";
            }

        } catch (error) {
            console.error("Network Error:", error);

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

// ===============================
// Scroll animations
// ===============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll(".project-card, .skill-category, .stat").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(el);
});

// ===============================
// Navbar shadow
// ===============================
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    navbar.style.boxShadow =
        window.scrollY > 50
            ? "0 10px 30px rgba(0,0,0,.25)"
            : "0 10px 30px rgba(0,0,0,.1)";
});

// ===============================
// Active navigation link
// ===============================
window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section[id]").forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.style.color = "";
    });

    const active = document.querySelector(
        `.nav-links a[href="#${current}"]`
    );

    if (active) {
        active.style.color = "var(--primary-color)";
    }
});
