document.addEventListener('DOMContentLoaded', function() {
  // Gallery filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter items
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Lightbox functionality
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeLightbox = document.querySelector('.close-lightbox');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  const galleryImages = Array.from(document.querySelectorAll('.gallery-expand'));
  
  // Open lightbox when clicking on gallery image
  galleryImages.forEach((image, index) => {
    image.addEventListener('click', function(e) {
      e.preventDefault();
      currentImageIndex = index;
      updateLightbox();
      lightboxModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox
  closeLightbox.addEventListener('click', function() {
    lightboxModal.classList.remove('show');
    document.body.style.overflow = '';
  });
  
  // Close when clicking outside image
  lightboxModal.addEventListener('click', function(e) {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  // Navigation between images
  function updateLightbox() {
    const currentImage = galleryImages[currentImageIndex];
    const imgSrc = currentImage.getAttribute('href');
    const imgTitle = currentImage.parentElement.querySelector('h3').textContent;
    const imgDesc = currentImage.parentElement.querySelector('p').textContent;
    
    lightboxImage.src = imgSrc;
    lightboxTitle.textContent = imgTitle;
    lightboxDesc.textContent = imgDesc;
  }
  
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightbox();
  }
  
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  }
  
  nextBtn.addEventListener('click', showNextImage);
  prevBtn.addEventListener('click', showPrevImage);
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightboxModal.classList.contains('show')) return;
    
    if (e.key === 'Escape') {
      lightboxModal.classList.remove('show');
      document.body.style.overflow = '';
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });
  
  // Initialize animations for gallery items
  const galleryItemAnimate = document.querySelectorAll('.gallery-item.animate__animated');
  
  if (galleryItemAnimate.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    galleryItemAnimate.forEach(element => {
      observer.observe(element);
    });
  }
});