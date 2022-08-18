import MainSlider from './modules/slider/slider-main';
import VideoPlayer from './modules/playVideo';
import MiniSlider from './modules/slider/slider-mini';
import Difference from './modules/difference';
import Forms from './modules/forms';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({ btns: '.next', container: '.page' });
  slider.render();

  const modulePageSlider = new MainSlider ({
    container: '.moduleapp',
    btns: '.next',
  });
  modulePageSlider.render();
  // eslint-disable-next-line no-new
  modulePageSlider.showAccordeon('.plus__content', '.msg');

  const showUpSlider = new MiniSlider({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true,
  });
  showUpSlider.init();
  showUpSlider.decorizeSlides();

  const modulesSlider = new MiniSlider({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoPlay: true,
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active',
  });
  feedSlider.init();

  new VideoPlayer('.showup .play', '.overlay').init();
  new VideoPlayer('.module__video-item .play', '.overlay').init();

  new Difference('.officerold', '.officernew', '.officer__card-item').init();

  // eslint-disable-next-line no-new
  new Forms('.join__evolution').init();
  new Forms('.schedule__form').init();
  new Download('.download').init();
});
