import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
}

const LazyImage = ({ 
  src, 
  alt, 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyNkMxNi40MTgzIDI2IDEzLjU4MTggMjMuNDE4MyAxMy41ODE4IDIwQzEzLjU4MTggMTYuNTgxNyAxNi40MTgzIDEzLjc1IDEzLjc1IDEzLjc1SDE2LjI1QzE2LjI1IDEzLjc1IDE3LjUgMTUgMTcuNSAxN1YyMkMxNy41IDIyLjUgMTYuMjUgMjMuNzUgMTUgMjMuNzVIMTIuNUMxMS4yNSAyMy43NSAxMCAyMi41IDEwIDIxVjE3QzEwIDE1LjUgMTEuMjUgMTQuMjUgMTIuNSAxNC4yNUgxNUMxNi4yNSAxNC4yNSAxNy41IDE1LjUgMTcuNSAxN1YyMkMxNy41IDIyLjUgMTYuMjUgMjMuNzUgMTUgMjMuNzVIMTIuNUMxMS4yNSAyMy43NSAxMCAyMi41IDEwIDIxVjE3QzEwIDE1LjUgMTEuMjUgMTQuMjUgMTIuNSAxNC4yNUgxNUMxNi4yNSAxNC4yNSAxNy41IDE1LjUgMTcuNSAxN1YyMkMxNy41IDIyLjUgMTYuMjUgMjMuNzUgMTUgMjMuNzVaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=',
  className = '',
  ...props 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={isInView ? src : placeholder}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'hidden' : ''}
        `}
        {...props}
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
