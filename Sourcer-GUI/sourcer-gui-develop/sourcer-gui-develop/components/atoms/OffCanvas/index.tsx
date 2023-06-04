import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import { useFocusTrap, useKeyboardEvents } from '@jobtarget/ui-library';
import { IOffCanvas } from './types';
import styles from './styles.module.scss';

const OffCanvas = ({ children, isActive, toggleActive, variant }: PropsWithChildren<IOffCanvas>) => {
  const divRef = useRef<HTMLDivElement>(null);
  useFocusTrap(divRef);
  const { isTargetKey } = useKeyboardEvents('Escape');
  const variantClass = variant === 'small' ? styles.small : styles.large;

  const closeCanvas = useCallback(
    ({ target }: Event) => {
      const theTarget = target as HTMLElement;
      const isOutsideOffCanvas = !divRef.current?.contains(theTarget);
      const dataToggle = theTarget?.getAttribute('data-toggle')?.toLowerCase();

      // if we're outside of the offcanvas but not clicking on the 'controller'
      // of the offcanvas, then hide the offcanvas
      if (isOutsideOffCanvas && dataToggle !== 'offcanvas') {
        toggleActive(false);
      }
    },
    [toggleActive],
  );

  // clicking outside of the component should close the panel
  useEffect(() => {
    document.addEventListener('click', closeCanvas);

    return () => {
      document.removeEventListener('click', closeCanvas);
    };
  }, [closeCanvas]);

  // pressing 'escape' key should close the panel
  useEffect(() => {
    if (isTargetKey && isActive) {
      toggleActive(false);
    }
  }, [isActive, isTargetKey, toggleActive]);

  useEffect(() => {
    if (isActive) {
      // focus should be moved to the close button when the panel is opened
      const button = divRef.current?.querySelector('.offcanvas-button') as HTMLButtonElement;
      button.focus();

      // add backdrop class to the body to prevent scrolling and to add
      // the dark background color
      document.body.classList.add(styles.backdrop);
    } else {
      document.body.classList.remove(styles.backdrop);
    }
  }, [isActive]);

  return (
    <div className={`${styles.offcanvas} bg-white wp-xs-100 ${variantClass} vh-100 ${isActive ? styles.show : ''}`} data-component="offcanvas" ref={divRef}>
      {isActive && (
        <>
          <div className="position-relative">
            <Button
              aria-label="close"
              className={`${styles.closeButton} position-absolute mr-3 mt-3 offcanvas-button border-0 bg-transparent`}
              data-dismiss="offcanvas"
              onClick={() => toggleActive(false)}
            >
              <i className="text-15 text-gray-600 fal fa-solid fa-times" />
            </Button>
          </div>
          <div>{children}</div>
        </>
      )}
    </div>
  );
};

export { OffCanvas };
