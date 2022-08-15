/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import postData from '../services/request';

export default class Forms {
  constructor(selector) {
    this.selector = document.querySelector(selector);
    this.form = this.selector.querySelector('form');
    this.input = this.form.querySelectorAll('input');

    this.message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...',
    };
  }

  clearInputs() {
    this.input.forEach((input) => {
      input.value = '';
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach((input) => {
      // Only russian keys
      input.addEventListener('keypress', (e) => {
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault();
        }
      });
      // No autofill
      input.addEventListener('input', (e) => {
        if (e.target.value.match(/[a-z]/ig)) {
          input.value = '';
        }
      });
    });
  }

  initMask() {
    const setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        const range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };

    function createMask(event) {
      const matrix = '+1 (___) ___-__';
      let i = 0;
      const def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, (a) => (/[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a));

      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    const inputs = this.form.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  init() {
    this.initMask();
    this.checkMailInputs();
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `
        text-align: center;
        color: grey;
        font-size: 18px;
        margin-top: 15px;
    `;
    this.form.parentNode.appendChild(statusMessage);

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      statusMessage.textContent = this.message.loading;

      const formData = new FormData(this.form);

      postData('assets/question.php', formData)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = this.message.success;
        })
        .catch(() => {
          statusMessage.textContent = this.message.failure;
        })
        .finally(() => {
          this.clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  }
}
