const getTitleAndCTA = (activeScreen: number) => {
  let cta = '';
  let title = '';

  if (activeScreen === 0) {
    cta = 'Preview and Send';
    title = 'Send Message';
  }

  if (activeScreen === 1) {
    (cta = 'Send Message'), (title = 'Preview Mode');
  }

  if (activeScreen === 2) {
    cta = 'View My Candidates';
    title = '';
  }

  return { cta, title };
};

export { getTitleAndCTA };
