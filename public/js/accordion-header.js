 document.querySelectorAll('.accordion-header').forEach(header => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const icon = header.querySelector('.accordion-icon');
    
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
    
        if (isOpen) {
          // close
          content.style.height = content.scrollHeight + 'px';
          requestAnimationFrame(() => {
            content.style.height = '0';
          });
          item.classList.remove('open');
          icon.textContent = '+';
        } else {
          // open
          content.style.height = 'auto';
          const targetHeight = content.scrollHeight + 'px';
          content.style.height = '0';
    
          requestAnimationFrame(() => {
            content.style.height = targetHeight;
          });
    
          item.classList.add('open');
          icon.textContent = '–';
        }
    
        content.addEventListener('transitionend', () => {
          if (item.classList.contains('open')) {
            content.style.height = 'auto';
          }
        }, { once: true });
      });
    });