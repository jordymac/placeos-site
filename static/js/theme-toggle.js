const toggle = document.getElementById('theme-toggle');
        const sun = document.getElementById('sun');
        const moon = document.getElementById('moon');
        const html = document.documentElement;

        function setTheme(theme) {
          html.classList.remove('light', 'dark');
          html.classList.add(theme);
          localStorage.setItem('theme', theme);
          if(theme === 'dark') {
            sun.style.display = 'block';
            moon.style.display = 'none';
          } else {
            sun.style.display = 'none';
            moon.style.display = 'block';
          }
        }

        function getSystemTheme() {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        if(toggle && sun && moon){
          // On page load
          const saved = localStorage.getItem('theme');
          setTheme(saved || getSystemTheme());

          // On toggle click
          toggle.addEventListener('click', () => {
            setTheme(html.classList.contains('dark') ? 'light' : 'dark');
          });
        }