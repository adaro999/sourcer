import { RefObject, useCallback, useEffect, useState } from 'react';

// determines if you are clicking outside of the containing div element
const useOutsideClick = (containerRef: RefObject<HTMLDivElement>) => {
  const [isOutside, setIsOutside] = useState<boolean | null>(null);

  const handleClick = useCallback(
    ({ target }: Event) => {
      const theTarget = target as HTMLElement;
      setIsOutside(Boolean(!containerRef.current?.contains(theTarget)));
    },
    [containerRef],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick, false);

    return () => {
      document.removeEventListener('click', handleClick, false);
    };
  }, [handleClick]);

  return { isOutside };
};

export { useOutsideClick };
