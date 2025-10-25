// Accessibility utility functions
export const accessibility = {
  // High contrast mode
  enableHighContrast() {
    document.documentElement.classList.add('high-contrast');
    localStorage.setItem('highContrast', 'enabled');
  },

  disableHighContrast() {
    document.documentElement.classList.remove('high-contrast');
    localStorage.setItem('highContrast', 'disabled');
  },

  // Font size adjustment
  setFontSize(size) {
    const sizes = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    document.documentElement.style.fontSize = sizes[size];
    localStorage.setItem('fontSize', size);
  },

  // Reduce motion
  reduceMotion() {
    const style = document.createElement('style');
    style.id = 'reduced-motion';
    style.textContent = `
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
    localStorage.setItem('reducedMotion', 'enabled');
  },

  restoreMotion() {
    const style = document.getElementById('reduced-motion');
    if (style) {
      style.remove();
    }
    localStorage.setItem('reducedMotion', 'disabled');
  },

  // Initialize accessibility settings
  init() {
    // High contrast
    if (localStorage.getItem('highContrast') === 'enabled') {
      this.enableHighContrast();
    }

    // Font size
    const fontSize = localStorage.getItem('fontSize') || 'medium';
    this.setFontSize(fontSize);

    // Reduced motion
    if (localStorage.getItem('reducedMotion') === 'enabled') {
      this.reduceMotion();
    }
  }
};