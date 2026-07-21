// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon between bars and times
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Close mobile menu when a link is clicked
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// Scroll Reveal Effect
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Form submission
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Ensure all inputs have a name attribute, FormSubmit needs name attributes
    const inputs = this.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (!input.name && input.id) {
        input.name = input.id;
      }
    });

    const formData = new FormData(this);
    
    // UI loading state
    const btn = this.querySelector('button[type="submit"]') || this.querySelector('button') || this.querySelector('.btn');
    let originalText = 'Submit';
    if (btn) {
        originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;
    }

    fetch('https://formsubmit.co/ajax/yashwanthhg2005@gmail.com', {
        method: 'POST',
        headers: { 
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you for your inquiry! We will get back to you soon.');
        this.reset();
        if (btn) {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    })
    .catch(error => {
        alert('There was an error sending your message. Please try again.');
        console.error(error);
        if (btn) {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
  });
});
