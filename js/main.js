document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-times');
      }
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Current year in footer
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Animate stats counting
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const increment = target / 100;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        stat.textContent = Math.floor(current);
        
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        }
      }, 10);
    });
  }

  // Testimonial slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  if (testimonialSlider && testimonialSlides.length > 0) {
    let currentSlide = 0;
    const slideCount = testimonialSlides.length;
    let slideInterval;
    
    function showSlide(index) {
      testimonialSlides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      showSlide(currentSlide);
    }
    
    // Initialize slider
    showSlide(currentSlide);
    
    // Auto-advance every 5 seconds
    function startSlider() {
      slideInterval = setInterval(nextSlide, 5000);
    }
    startSlider();
    
    // Pause on hover
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', startSlider);
    
    // Navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  }

  // Booking Form submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const eventType = document.getElementById('eventType').value;
      const eventDate = document.getElementById('eventDate').value;
      const package = document.getElementById('package').value;
      
      if (!name || !email || !phone || !eventType || !eventDate || !package) {
        alert('Please fill in all required fields');
        return;
      }
      
      alert('Thank you! We will contact you shortly.');
      this.reset();
    });
  }

  // Contact Form Submission (FormSubmit.co)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Only show alert if not using FormSubmit
      if (!this.action.includes('formsubmit.co')) {
        e.preventDefault();
        alert('Thank you! We will contact you shortly.');
        this.reset();
      } else {
        // For FormSubmit, show alert but let it submit
        alert('Thank you! We will contact you shortly.');
      }
    });
  }

  // Intersection Observer for animations
  const animateElements = document.querySelectorAll('.animate__animated');
  
  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animation = entry.target.getAttribute('data-animation') || 'animate__fadeInUp';
          entry.target.classList.add(animation);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Video play buttons
  document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.play-btn');
    
    if (video && playBtn) {
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          playBtn.style.display = 'none';
        } else {
          video.pause();
          playBtn.style.display = 'flex';
        }
      });
      
      video.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          playBtn.style.display = 'none';
        } else {
          video.pause();
          playBtn.style.display = 'flex';
        }
      });
    }
  });
});


const shareBtn = document.getElementById("shareBtn");

async function sharePortfolio() {
  const portfolioUrl = window.location.href;
  const shareData = {
    title: "My Portfolio",
    text: "Check out my work!",
    url: portfolioUrl,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Share canceled:", err);
    }
  } else {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      // Visual feedback
      shareBtn.textContent = "✓ Copied!";
      shareBtn.style.background = "rgba(184, 134, 11, 0.4)"; // Highlight when copied
      setTimeout(() => {
        shareBtn.textContent = "Share My Portfolio";
        shareBtn.style.background = "rgba(184, 134, 11, 0.2)";
      }, 2000);
    } catch (err) {
      prompt("Copy this link:", portfolioUrl);
    }
  }
}

shareBtn.addEventListener("click", sharePortfolio);
