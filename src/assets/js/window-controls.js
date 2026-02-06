/**
 * Window Controls Handler
 * Red dot: Minimize/close and return to home
 * Yellow dot: Toggle fullscreen
 * Green dot: (reserved for future use)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Scroll-based header hiding
  let lastScrollY = 0;
  let scrollTimeout;
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down
      header.classList.add('hidden');
      header.classList.remove('visible');
    } else {
      // Scrolling up
      header.classList.remove('hidden');
      header.classList.add('visible');
    }
    
    lastScrollY = currentScrollY;
  }, { passive: true });
  
  // Window control dots
  const windowDots = document.querySelectorAll('.window-dots');
  
  windowDots.forEach(dots => {
    const redDot = dots.querySelector('.dot-red');
    const yellowDot = dots.querySelector('.dot-yellow');
    const greenDot = dots.querySelector('.dot-green');
    const appWindow = dots.closest('.app-window');
    
    // Red dot: Go back to home
    if (redDot) {
      redDot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // If already fullscreen, exit fullscreen first
        if (appWindow.classList.contains('fullscreen')) {
          appWindow.classList.remove('fullscreen');
          document.body.classList.remove('window-fullscreen');
        } else {
          // Navigate to home
          const homeLink = document.querySelector('a[href$="/"]') || 
                          document.querySelector('a[href*="Home"]') ||
                          document.createElement('a');
          if (!homeLink.href) {
            homeLink.href = document.querySelector('.site-nav a').href;
          }
          window.location.href = homeLink.href;
        }
      });
    }
    
    // Yellow/Orange dot: Exit fullscreen / Return to default
    if (yellowDot) {
      yellowDot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Exit fullscreen if active
        if (appWindow.classList.contains('fullscreen')) {
          appWindow.classList.remove('fullscreen');
          document.body.classList.remove('window-fullscreen');
        }
      });
    }
    
    // Green dot: Fullscreen
    if (greenDot) {
      greenDot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        appWindow.classList.add('fullscreen');
        document.body.classList.add('window-fullscreen');
      });
    }
  });
});
