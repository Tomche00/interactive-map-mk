import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
}

const StarField = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Generate stars for left purple circle
    const generateStars = (count: number, centerX: number, centerY: number, radius: number) => {
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        stars.push({
          x,
          y,
          size: Math.random() * 4 + 2, // Increased size: 2-6px
          opacity: Math.random() * 0.7 + 0.3, // Increased opacity: 0.3-1.0
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 2
        });
      }
      return stars;
    };

    // Generate stars for both circles
    const leftStars = generateStars(20, 15, 15, 10); // Left purple circle area
    const bottomStars = generateStars(15, 85, 85, 8); // Bottom blue circle area
    
    starsRef.current = [...leftStars, ...bottomStars];

    // Create star elements
    const container = containerRef.current;
    container.innerHTML = '';
    
    starsRef.current.forEach((star, index) => {
      const starElement = document.createElement('div');
      starElement.className = 'star';
      starElement.style.cssText = `
        position: absolute;
        left: ${star.x}%;
        top: ${star.y}%;
        width: ${star.size}px;
        height: ${star.size}px;
        background: rgba(255, 255, 255, ${star.opacity});
        border-radius: 50%;
        animation: twinkle ${star.animationDuration}s ease-in-out ${star.animationDelay}s infinite;
        pointer-events: none;
      `;
      container.appendChild(starElement);
    });

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { 
          transform: scale(1) translateY(0);
          opacity: 0.6;
        }
        25% { 
          transform: scale(1.3) translateY(-3px);
          opacity: 0.9;
        }
        50% { 
          transform: scale(0.7) translateY(-5px);
          opacity: 0.3;
        }
        75% { 
          transform: scale(1.1) translateY(-2px);
          opacity: 0.7;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return <div ref={containerRef} className="star-field" />;
};

export default StarField;
