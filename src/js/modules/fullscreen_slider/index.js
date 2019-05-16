import normalizeWheel from 'normalize-wheel';

const CLASSNAME_WRAP      = 'js-fullscreen-wrap';
const CLASSNAME_SECTION   = 'js-fullscreen-section';
const CLASSNAME_PAGER     = 'js-fullscreen-pager';
const CLASSNAME_POINTER   = 'js-fullscreen-pager-pointer';
const CLASSNAME_BG        = 'js-fullscreen-bg';
const CLASSNAME_SHOW      = 'is-shown';
const CLASSNAME_SHOW_ASC  = 'is-shown-asc';
const CLASSNAME_SHOW_DESC = 'is-shown-desc';
const CLASSNAME_HIDE      = 'is-hidden';
const CLASSNAME_HIDE_ASC  = 'is-hidden-asc';
const CLASSNAME_HIDE_DESC = 'is-hidden-desc';
const CLASSNAME_CURRENT   = 'is-current';
const CLASSNAME_ANIMATE   = 'has-animate';

const INTERVAL_TO_FIRE_WHEEL = 1000;
const BG_COLORS = [
  '#0fb4ae',
  '#7bc8bc',
  '#868eaf',
  '#ec6867',
  '#f8bb0e',
];

export default class FullscreenSlider {
  constructor(contents, resolution) {
    this.elmWrap = contents.querySelector(`.${CLASSNAME_WRAP}`);
    this.elmSection = contents.querySelectorAll(`.${CLASSNAME_SECTION}`);
    this.elmPager = contents.querySelector(`.${CLASSNAME_PAGER}`);
    this.elmPagerPointers = contents.querySelectorAll(`.${CLASSNAME_POINTER}`);
    this.elmBg = contents.querySelector(`.${CLASSNAME_BG}`);

    this.currentId = 0;
    this.previousId = 0;
    this.maxId = this.elmSection.length - 1;
    this.isAscend = true;
    this.wheelTimer = null;
    this.isWheeling = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.isTouchMoved = false;

    this.resize(resolution);
    this.on();
  }
  start() {
    // Start the first animation.
    document.body.style.overscrollBehavior = 'none';
    this.elmSection[this.currentId].classList.add(CLASSNAME_SHOW);
    this.elmSection[this.currentId].classList.add(CLASSNAME_SHOW_ASC);
    this.elmPager.classList.add(CLASSNAME_ANIMATE);
    this.elmPagerPointers[this.currentId].classList.add(CLASSNAME_CURRENT);
    this.elmBg.classList.add(CLASSNAME_ANIMATE);
    this.elmBg.style.backgroundColor = BG_COLORS[this.currentId];
  }
  goToPrev() {
    if (this.currentId === 0) return;
    this.previousId = this.currentId;
    this.currentId--;
    this.isAscend = false;
    this.changeSection();
  }
  goToNext() {
    if (this.currentId >= this.maxId) return;
    this.previousId = this.currentId;
    this.currentId++;
    this.isAscend = true;
    this.changeSection();
  }
  goToTarget(id) {
    if (this.currentId === id) return;
    this.isAscend = id > this.currentId;
    this.previousId = this.currentId;
    this.currentId = id;
    this.changeSection();
  }
  changeSection() {
    // Add/Remove the ClassName for change the current section and run the animation.
    // It judges which direction going the next section from the previous section Ascend or Descend.
    for (var i = 0; i < this.elmSection.length; i++) {
      this.elmSection[i].classList.remove(CLASSNAME_SHOW);
      this.elmSection[i].classList.remove(CLASSNAME_SHOW_ASC);
      this.elmSection[i].classList.remove(CLASSNAME_SHOW_DESC);
      this.elmSection[i].classList.remove(CLASSNAME_HIDE);
      this.elmSection[i].classList.remove(CLASSNAME_HIDE_ASC);
      this.elmSection[i].classList.remove(CLASSNAME_HIDE_DESC);
    }
    if (this.isAscend) {
      this.elmSection[this.previousId].classList.add(CLASSNAME_HIDE);
      this.elmSection[this.previousId].classList.add(CLASSNAME_HIDE_ASC);
      this.elmSection[this.currentId].classList.add(CLASSNAME_SHOW);
      this.elmSection[this.currentId].classList.add(CLASSNAME_SHOW_ASC);
    } else {
      this.elmSection[this.previousId].classList.add(CLASSNAME_HIDE);
      this.elmSection[this.previousId].classList.add(CLASSNAME_HIDE_DESC);
      this.elmSection[this.currentId].classList.add(CLASSNAME_SHOW);
      this.elmSection[this.currentId].classList.add(CLASSNAME_SHOW_DESC);
    }
    this.elmPagerPointers[this.previousId].classList.remove(CLASSNAME_CURRENT);
    this.elmPagerPointers[this.currentId].classList.add(CLASSNAME_CURRENT);
    this.elmBg.style.backgroundColor = BG_COLORS[this.currentId];
  }
  reset() {
    // Remove styles of the wrapper element temporarily.
    this.elmWrap.style.width = 0;
    this.elmWrap.style.height = 0;
  }
  resize(resolution) {
    // Resize the wrapper element to the argument resolution.
    this.elmWrap.style.width = `${resolution.x}px`
    this.elmWrap.style.height = `${resolution.y}px`
  }
  on() {
    // Binding each events.

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
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }, false);

    this.elmWrap.addEventListener('touchmove', (e) => {
      if (this.isTouchMoved === true) return;

      const diffX = this.touchStartX - e.touches[0].clientX;
      const diffY = this.touchStartY - e.touches[0].clientY;

      if (Math.abs(diffX) > 20) {
        return;
      } else if (diffY < -20) {
        e.preventDefault();
        this.goToPrev();
      } else if (diffY > 20) {
        e.preventDefault();
        this.goToNext();
      }

      if (Math.abs(diffY) > 20) {
        this.isTouchMoved = true;
      }
    }, false);

    this.elmWrap.addEventListener('touchend', (e) => {
      this.isTouchMoved = false;
    }, false);

    // For pager
    // ======
    for (var i = 0; i < this.elmPagerPointers.length; i++) {
      const id = i;
      this.elmPagerPointers[i].addEventListener('click', (e) => {
        e.preventDefault();
        this.goToTarget(id);
      });
    }
  }
}
