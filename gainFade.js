
// Fade IN: gradually increase gain from start to end value
const gainFadeIn = register('gainFadeIn', (fadeTime, startValue, endValue, pat) => {
  const ft = fadeTime ?? 8;
  const sv = startValue ?? 0;
  const ev = endValue ?? 1;
  
  return pat.gain(
    time.fmap(t => {
      const progress = Math.min(t / ft, 1);  // 0 → 1
      return sv + (progress * (ev - sv));
    })
  );
});

// Fade OUT: stay at plateau then gradually decrease gain
const gainFadeOut = register('gainFadeOut', (plateauTime, fadeTime, plateauValue, endValue, pat) => {
  const pt = plateauTime ?? 8;
  const ft = fadeTime ?? 8;
  const pv = plateauValue ?? 1;
  const ev = endValue ?? 0;
  
  return pat.gain(
    time.fmap(t => {
      if (t < pt) {
        // Phase 1: stay at plateau
        return pv;
      } else {
        // Phase 2: decrease from plateau to end value
        const fadeProgress = Math.min((t - pt) / ft, 1);  // 0 → 1
        return pv - (fadeProgress * (pv - ev));
      }
    })
  );
});
