import normalizeWheel from 'normalize-wheel';

const CLASSNAME_WRAP    = 'js-fullscreen-wrap';
const CLASSNAME_SECTION = 'js-fullscreen-section';
const CLASSNAME_PAGER   = 'js-fullscreen-pager';
const CLASSNAME_SHOW = 'is-shown';
const CLASSNAME_SHOW_ASCEND  = 'is-shown-asc';
const CLASSNAME_SHOW_DESCEND = 'is-shown-desc';
const CLASSNAME_HIDE = 'is-hidden';
const CLASSNAME_HIDE_ASCEND  = 'is-hidden-asc';
const CLASSNAME_HIDE_DESCEND = 'is-hidden-desc';
const INTERVAL_TO_FIRE_WHEEL = 1000;

export default class FullscreenSlider {
  constructor(contents, resolution) {
    this.elmWrap = contents.querySelector(`.${CLASSNAME_WRAP}`);
    this.elmSection = contents.querySelectorAll(`.${CLASSNAME_SECTION}`);
    this.elmPager = contents.querySelector(`.${CLASSNAME_PAGER}`);

    this.currentId = 0;
    this.previousId = 0;
    this.maxId = this.elmSection.length - 1;
    this.isAscend = true;
    this.wheelTimer = null;
    this.isWheeling = false;
    this.touchStartY = 0;
    this.isTouchMoved = false;

    this.resize(resolution);
    this.on();
  }
  goToPrev() {
    if (this.currentId === 0) return;
    this.previousId = this.currentId;
    this.currentId--;
    this.isAscend = false;
  }
  goToNext() {
    if (this.currentId >= this.maxId) return;
    this.previousId = this.currentId;
    this.currentId++;
    this.isAscend = true;
  }
  goToTarget(id) {
    if (this.currentId === id) return;
    this.isAscend = id > this.currentId;
    this.previousId = this.currentId;
    this.currentId = id;
  }
  resize(resolution) {
    this.elmWrap.style = `width:${resolution.x}px; height:${resolution.y}px`
  }
  on() {
    // For wheel events
    // =====
    const wheel = (e) => {
      e.preventDefault();

      const n = normalizeWheel(e);

      // Run at the first wheel event only.
      if (this.isWheeling === false) {
        if (Math.abs(n.pixelY) < 10) return;

        if (n.pixelY < 0) {
          this.goToPrev();
        } else {
          this.goToNext();
        }

        // Prevent repeated wheel events fire with a timer.
        this.isWheeling = true;
        this.wheelTimer = setTimeout(() => {
          this.isWheeling = false;
        }, INTERVAL_TO_FIRE_WHEEL);
      }
    };
    this.elmWrap.addEventListener('wheel', wheel, { capture: true });
    this.elmWrap.addEventListener('DOMMouseScroll', wheel, { capture: true });

    // For touch events
    // =====
    this.elmWrap.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
    }, false);

    this.elmWrap.addEventListener('touchmove', (e) => {
      if (this.isTouchMoved === true) return;

      e.preventDefault();

      const diffY = this.touchStartY - e.touches[0].clientY;

      if (diffY < -20) {
        this.goToPrev();
      } else if (diffY > 20) {
        this.goToNext();
      }

      if (Math.abs(diffY) > 20) {
        this.isTouchMoved = true;
      }
    }, false);

    this.elmWrap.addEventListener('touchend', (e) => {
      this.isTouchMoved = false;
    }, false);
  }
}
