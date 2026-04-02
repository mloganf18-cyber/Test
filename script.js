// ============================================================
// Captain Max Maritime — Standalone JavaScript
// ============================================================

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Gallery lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map(item => 
  item.querySelector('.gallery-image').src
);

function openLightbox(index) {
  currentImageIndex = index;
  lightboxImage.src = galleryImages[index];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex];
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex];
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
  if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
    showPrevImage();
  }
  if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
    showNextImage();
  }
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Contact form submission via EmailJS
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    message: formData.get('message')
  };

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    // EmailJS integration
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_aq2gp5a',
        template_id: 'template_oqxfb0j',
        user_id: 'RfqOoHLvU2nxCNuCd',
        template_params: {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || 'Not provided',
          service: data.service,
          message: data.message,
          to_email: 'mloganf18@gmail.com'
        }
      })
    });

    if (response.ok) {
      alert('Thank you for your message! Captain Max will respond within 24 hours.');
      contactForm.reset();
    } else {
      throw new Error('EmailJS request failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    // Fallback to mailto
    const subject = encodeURIComponent(`Captain Max Maritime Inquiry - ${data.service}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || 'Not provided'}\n` +
      `Service: ${data.service}\n\n` +
      `Message:\n${data.message}`
    );
    window.location.href = `mailto:mloganf18@gmail.com?subject=${subject}&body=${body}`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
