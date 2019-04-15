import FullscreenSlider from '../modules/fullscreen_slider/';

export default function() {
  const fsSlider = new FullscreenSlider(
    document,
    {
      x: window.innerWidth,
      y: window.innerHeight
    }
  );
};
