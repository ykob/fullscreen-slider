# fullscreen-slider

![screenshot](screenshot.gif)

This asset controls sections in a page.  
It resizes sections to fullscreen resolution and moves these individually by wheel/touch events.  
https://ykob.github.io/fullscreen-slider/

## Usage

1. Import FullscreenSlider class.
https://github.com/ykob/fullscreen-slider/blob/master/src/js/modules/fullscreen_slider/index.js

Like as below.

    import FullscreenSlider from '../modules/fullscreen_slider/';

2. Create an instance and set wrapper element (ex: document) and 2D resolution object to arguments as below.

    const fsSlider = new FullscreenSlider(
      document,
      {
        x: window.innerWidth,
        y: window.innerHeight
      }
    );

3. Bind the "resize" event. You should run the "reset" method before running the "resize" method to set the resolution to the section elements correctly. Also, you should set an object that has window resolution to an argument of the "resize" method to resize the sections to full-screen size.

    window.addEventListener('resize', () => {
      fsSlider.reset();
      fsSlider.resize(
        {
          x: window.innerWidth,
          y: window.innerHeight
        }
      );
    });

4. Run the "start" method when you want to start the animation.

    fsSlider.start();
