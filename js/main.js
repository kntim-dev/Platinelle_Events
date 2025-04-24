// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    nav.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
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
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
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
    const slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Navigation buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  }
  
  // Form submission
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
      

document.querySelector('.contact-form').addEventListener('submit', function(e) {
  // Only prevent default if you're handling submission manually
  if (!this.action.includes('formsubmit.co')) {
    e.preventDefault();
  }
  alert('Thank you! We will contact you shortly.');
  if (this.action.includes('formsubmit.co')) return; // Let FormSubmit handle submission
  this.reset();
});
      
  
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
