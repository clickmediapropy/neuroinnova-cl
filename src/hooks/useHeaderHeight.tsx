import { useState, useEffect } from 'react';

export const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(64); // Default 4rem = 64px

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Listen for resize events
    window.addEventListener('resize', updateHeaderHeight);
    
    // Use ResizeObserver for more accurate header height changes
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    const header = document.querySelector('header');
    if (header) {
      resizeObserver.observe(header);
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return headerHeight;
};