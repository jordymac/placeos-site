let last = 0;
    function animateGradients(now) {
        if (now - last > 60) { // ~25fps
        const t = now / 500; // Time-based animation
        const isLight = document.documentElement.classList.contains('light');
        const isMobile = window.matchMedia('(max-width: 700px)').matches;
        const amp = isMobile ? 1 : 16; // <<< 0 for no animation on mobile
        const ampY = isMobile ? 1 : 14; // <<< 0 for no animation on mobile
        if (isLight) {
            document.documentElement.style.setProperty('--g1-x', `${40 + Math.sin(t)*amp}%`);
            document.documentElement.style.setProperty('--g1-y', `${20 + Math.cos(t/1.2)*ampY}%`);
            document.documentElement.style.setProperty('--g2-x', `${100 + Math.cos(t/1.1)*amp}%`);
            document.documentElement.style.setProperty('--g2-y', `${55 + Math.sin(t/1.5)*ampY}%`);
            document.documentElement.style.setProperty('--g3-x', `${0 + Math.sin(t/1.4)*amp}%`);
            document.documentElement.style.setProperty('--g3-y', `${100 + Math.cos(t/1.3)*ampY}%`);
        } else {
            document.documentElement.style.setProperty('--g1-x', `${95 + Math.sin(t)*amp}%`);
            document.documentElement.style.setProperty('--g1-y', `${97 + Math.cos(t/1.2)*ampY}%`);
            document.documentElement.style.setProperty('--g2-x', `${14 + Math.cos(t/1.1)*amp}%`);
            document.documentElement.style.setProperty('--g2-y', `${100 + Math.sin(t/1.5)*ampY}%`);
            document.documentElement.style.setProperty('--g3-x', `${92 + Math.sin(t/1.4)*amp}%`);
            document.documentElement.style.setProperty('--g3-y', `${62 + Math.cos(t/1.3)*ampY}%`);
        }
        last = now;
        }
        requestAnimationFrame(animateGradients);
    }

    requestAnimationFrame(animateGradients);