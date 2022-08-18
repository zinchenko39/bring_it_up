export default class Download {
  constructor(trigger) {
    this.btn = document.querySelectorAll(trigger);
    this.path = 'assets/img/Bitmap.jpg';
  }

  download(path, e) {
    const ref = document.createElement('a');
    ref.setAttribute('href', path);
    ref.setAttribute('download', 'picture');
    ref.style.display = 'none';
    document.body.appendChild(ref);
    ref.click();
    // e.stopPropagation();
  }

  init() {
    this.btn.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        this.download(this.path);
        e.stopPropagation();
      });
    });
  }
}
