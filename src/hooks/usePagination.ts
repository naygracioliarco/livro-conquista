import { useState, useEffect, useCallback } from 'react';

/**
 * Hook customizado para gerenciar paginação baseada em scroll
 */
export function usePagination(defaultPage: number = 4) {
  const [currentPage, setCurrentPage] = useState(defaultPage);

  useEffect(() => {
    const updateCurrentPage = () => {
      const paginationElements = document.querySelectorAll('[data-page]');
      let visiblePage = defaultPage;
      let closestToTop = Infinity;

      paginationElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const page = parseInt(el.getAttribute('data-page') || String(defaultPage));

        // Verifica se o elemento está visível na viewport
        if (rect.top >= 0 && rect.top < window.innerHeight && rect.bottom > 0) {
          if (rect.top < closestToTop) {
            closestToTop = rect.top;
            visiblePage = page;
          }
        }
      });

      // Se nenhuma página está visível no topo, verifica qual está mais próxima
      if (closestToTop === Infinity) {
        paginationElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const page = parseInt(el.getAttribute('data-page') || String(defaultPage));
          const distanceFromTop = Math.abs(rect.top);

          if (distanceFromTop < closestToTop) {
            closestToTop = distanceFromTop;
            visiblePage = page;
          }
        });
      }

      setCurrentPage(visiblePage);
    };

    updateCurrentPage();

    window.addEventListener('scroll', updateCurrentPage);
    window.addEventListener('resize', updateCurrentPage);

    const observer = new MutationObserver(updateCurrentPage);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('scroll', updateCurrentPage);
      window.removeEventListener('resize', updateCurrentPage);
      observer.disconnect();
    };
  }, [defaultPage]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setCurrentPage(defaultPage);
    }, 500);
  }, [defaultPage]);

  return {
    currentPage,
    scrollToTop,
  };
}

