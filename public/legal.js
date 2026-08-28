const focusTitle = () => {
  const heading = document.querySelector('#page-title');
  if (!(heading instanceof HTMLElement)) return;
  heading.focus();
  const announcer = document.querySelector('#route-announcer');
  if (announcer) announcer.textContent = heading.textContent || '';
};

addEventListener('pageshow', () => requestAnimationFrame(focusTitle));
