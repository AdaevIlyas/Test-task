'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // burger
  const burgerBtn = document.querySelector('#menu-bar'),
    burgerMenu = document.querySelector('.header-burger');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('change');
    burgerMenu.classList.toggle('burger-active');
  })

  // cookie
  const cookie = document.querySelector('.cookie'),
    cookieBtns = cookie.querySelectorAll('a');

  cookie.style.display = 'block';

  let cookieRead = false;

  cookieBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cookie.style.display = 'none';
      cookieRead = true;
    });
  });

  // modal

  const modal = document.querySelector('.modal'),
    modalDark = document.querySelector('.modal-dark'),
    arr = [modal, modalDark],
    btnsOpen = document.querySelectorAll(['[data-modal]']),
    btnClose = modal.querySelector('.modal__close'),
    scroll = calcScroll(),
    // отчистить формы
    fields = document.querySelectorAll('input');

  btnsOpen.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cookie.style.display = 'none';
      arr.forEach(i => i.style.display = 'block');
      if (window.innerWidth > 375) {
        document.body.style.marginRight = `${scroll}px`;
      }
      document.body.style.overflow = 'hidden';
      burgerBtn.classList.remove('change')
      burgerMenu.classList.remove('burger-active')
    })
  })

  function closeModal() {
    if (!cookieRead) {
      cookie.style.display = 'block';
    }
    arr.forEach(i => i.style.display = 'none');
    document.body.style.overflow = 'auto';
    document.body.style.marginRight = `0px`;
    goodSub.style.display = 'none';

    fields.forEach(field => field.value = '')
    clearInputError()
  }

  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  btnClose.addEventListener('click', closeModal)
  modalDark.addEventListener('click', closeModal)


  // form

  const form = modal.querySelector('.modal-form'),
    btn = form.querySelector('.modal-form__btn'),
    errorField = form.querySelectorAll('.modal-form__error'),
    errorAll = form.querySelector('.modal-form__all-error'),
    newField = [...fields].filter(item => item.required),
    elementFlag = document.querySelector('.modal-form__flag'),
    elementFlagField = document.querySelector('.modal-form__flag input'),
    goodSub = document.querySelector('.good-sub'),
    goodSubClose = goodSub.querySelector(".good-sub__close"),
    goodSubBtn = goodSub.querySelector('.good-sub__btn'),
    goodSubCloseArr = [goodSubClose, goodSubBtn];

  form.addEventListener('input', () => {
    if (newField[0].value && newField[1].value && newField[2].value) {
      errorField.forEach(error => error.style.display = 'none');
      btn.disabled = false;
      clearInputError()
    } else {
      if (!newField[0].value) {
        reqMessage(newField[0], errorField[0], true)
      } else {
        reqMessage(newField[0], errorField[0], false)
      }
      if (!newField[1].value) {
        reqMessage(newField[1], errorField[1], true)
      } else {
        reqMessage(newField[1], errorField[1], false)
      }
      if (newField[2].value === '+7' || newField[2].value === '+7 ' || newField[2].value === '' || newField[2].value === " ") {
        reqMessage(elementFlag, errorField[2], true)
      } else {
        reqMessage(elementFlag, errorField[2], false)
      }
      errorAll.style.display = 'block';
      btn.disabled = true;
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.display = 'none';
    goodSub.style.display = 'block';
    btn.disabled = true;
  })

  goodSubCloseArr.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal()
    })
  })

  function reqMessage(element, elementError, boolError) {
    if (boolError) {
      elementError.style.display = 'block';
      element.classList.add('modal-form-field_error')
    } else {
      elementError.style.display = 'none';
      element.classList.remove('modal-form-field_error')
    }
  }

  function clearInputError() {
    reqMessage(newField[0], errorField[0], false)
    reqMessage(newField[1], errorField[1], false)
    reqMessage(elementFlag, errorField[2], false)
    errorAll.style.display = 'none';
  }


  // маска...

  const mask = (selector) => {
    function setCursorPosition(pos, elem) {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);

        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }

    function createMask(event) {
      let matrix = '+7 (___) ___-__-__',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  };
  mask('input[type="tel"]');
});
