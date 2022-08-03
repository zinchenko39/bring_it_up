export default class Slider {
  constructor({ container = null, btns = null, next = null, prev = null } = {}) {
    this.page = document.querySelector(container);
    this.slides = this.page.children;
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
  }
}
