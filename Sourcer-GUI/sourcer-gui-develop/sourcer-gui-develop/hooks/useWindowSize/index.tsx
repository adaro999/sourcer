import { RefObject, useCallback, useState, useEffect } from 'react';

const isClient = typeof window === 'object';

const useWindowSize = (divContainer: RefObject<HTMLDivElement>) => {
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: isClient ? window?.document?.documentElement?.clientWidth : undefined,
      height: isClient ? window?.document?.documentElement?.clientHeight : undefined,
    });
  }, []);

  const handleScroll = useCallback(() => {
    // dont adjust the size if we already 'stickied' to the top to prevent jumping
    if (divContainer.current?.getBoundingClientRect().top && divContainer.current?.getBoundingClientRect().top > 0) {
      setWindowSize({
        width: isClient ? window?.document?.documentElement?.clientWidth : undefined,
        height: isClient ? window?.document?.documentElement?.clientHeight : undefined,
      });
    }
  }, [divContainer]);

  useEffect(() => {
    // wait for the elementRef to be available
    if (!divContainer.current) return;

    // Recalculate the window size if the div we're tracking changes in size (expand/collapse)
    const resizeObserver = new ResizeObserver(() => {
      setWindowSize({
        width: isClient ? window?.document?.documentElement?.clientWidth : undefined,
        height: isClient ? window?.document?.documentElement?.clientHeight : undefined,
      });
    });

    resizeObserver.observe(divContainer.current);

    return () => resizeObserver.disconnect();
  }, [divContainer]);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleScroll]);

  return { windowSize, setWindowSize };
};

export { useWindowSize };
