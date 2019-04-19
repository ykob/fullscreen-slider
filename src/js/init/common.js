import Hover from 'js-util/Hover';

export default function() {
  const elmHover = document.querySelectorAll('.js-hover');

  elmHover.forEach(elm => {
    new Hover(elm);
  })
};
