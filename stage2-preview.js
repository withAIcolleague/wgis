(function loadCanonicalStage2Asset() {
  const script = document.createElement('script');
  script.src = 'stage2.js';
  script.defer = true;
  document.head.appendChild(script);
})();
