import Slider from './slider';

export default class MainSlider extends Slider {
  // eslint-disable-next-line no-useless-constructor
  constructor(btns) {
    super(btns);
  }

  showSlides(n) {
    try {
      if (n > this.slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = this.slides.length;
      }

      try {
        this.hanson.style.opacity = '0';
        if (n === 3) {
          this.hanson.classList.add('animated');
          setTimeout(() => {
            this.hanson.classList.add('fadeInUp');
          }, 3000);
        } else {
          this.hanson.classList.remove('fadeInUp');
        }
      } catch (e) {}

      this.slides.forEach((slide) => {
        slide.style.display = 'none';
      });

      this.slides[this.slideIndex - 1].style.display = 'block';
    } catch (e) {}
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {}

      this.btns.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.plusSlides(1);
        });
        btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        });
      });
      this.showSlides(this.slideIndex);

      document.querySelectorAll('.prevmodule').forEach((item) => {
        item.addEventListener('click', () => {
          this.plusSlides(-1);
        });
      });

      document.querySelectorAll('.nextmodule').forEach((item) => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          this.plusSlides(1);
        });
      });
    }
  }

  showAccordeon(btn) {
    const trigger = document.querySelectorAll(btn);
    trigger.forEach((elem) => {
      elem.addEventListener('click', () => {
        elem.closest('.module__info-show').nextElementSibling.style.display = 'block';
      });
    });
  }
}
