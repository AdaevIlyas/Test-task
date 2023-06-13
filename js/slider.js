'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider'),
    btnPrev = document.querySelector('.slider__prev'),
    btnNext = document.querySelector('.slider__next'),
    sliderWrapper = document.querySelector('.slider__wrapper'),
    sliderInner = document.querySelector('.slider__inner'),
    slides = document.querySelectorAll('.slider__slide'),
    sliderWrapperWidth = parseInt(window.getComputedStyle(sliderWrapper).width);

  let whatSlide = 0;
  let whatSlideWidth = 0;

  sliderInner.style.cssText =
    `
  display: flex;
  width: ${100 * slides.length}%;
  `;

  let dots = document.createElement('div'),
    dotsArr = [];
  dots.classList.add('dots');
  sliderWrapper.append(dots);

  for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement('button');
    dot.classList.add('dot');
    dotsArr.push(dot);
    dots.append(dot);

    if (i == whatSlide) {
      dot.classList.add('dot-active');
    }
  }

  btnNext.addEventListener('click', (e) => {
    const eventBtn = e.target.parentElement;

    if (whatSlideWidth == sliderWrapperWidth * (slides.length - 1)) {
      whatSlideWidth = 0;
      whatSlide = 0;
    } else {
      whatSlideWidth += sliderWrapperWidth;
      whatSlide++;
    }

    animationNext(eventBtn)

    dotsArr.forEach(item => item.classList.remove('dot-active'));
    dotsArr[whatSlide].classList.add('dot-active');
  });



  btnPrev.addEventListener('click', (e) => {
    const eventBtn = e.target.parentElement;

    if (whatSlideWidth == 0) {
      whatSlideWidth = sliderWrapperWidth * (slides.length - 1);
      whatSlide = slides.length - 1;
    } else {
      whatSlideWidth -= sliderWrapperWidth;
      whatSlide--;
    }

    animationPrev(eventBtn)

    dotsArr.forEach(item => item.classList.remove('dot-active'));
    dotsArr[whatSlide].classList.add('dot-active');
  });

  dotsArr.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      animationDot(i);

      whatSlideWidth = sliderWrapperWidth * i;
      whatSlide = i;

      dotsArr.forEach(item => item.classList.remove('dot-active'));
      dotsArr[whatSlide].classList.add('dot-active');
    });
  });

  function animationNext(eventBtn) {
    eventBtn.disabled = true;
    setTimeout(() => eventBtn.disabled = false, 680);


    let pos = whatSlideWidth - sliderWrapperWidth;
    if (pos == -700) {
      pos = 700
      const id = setInterval(frame, 10);
      function frame() {
        if (pos === whatSlideWidth) {
          clearInterval(id);
        } else {
          pos -= 25;
          sliderInner.style.transform = `translateX(${pos}px)`;
        }
      }
    } else {
      const id = setInterval(frame, 10);
      function frame() {
        if (pos === whatSlideWidth) {
          clearInterval(id);
        } else {
          pos += 25;
          sliderInner.style.transform = `translateX(-${pos}px)`;
        }
      }
    }

  }

  function animationPrev(eventBtn) {
    eventBtn.disabled = true;
    setTimeout(() => eventBtn.disabled = false, 680);

    let pos = whatSlideWidth + sliderWrapperWidth;
    const id = setInterval(frame, 10);
    function frame() {
      if (pos === whatSlideWidth) {
        clearInterval(id);
      } else {
        pos -= 25;
        sliderInner.style.transform = `translateX(-${pos}px)`;
      }
    }
  }



  function animationDot(i) {
    if (i != whatSlide) {
      toggleDots(true)
      let pos = whatSlideWidth;

      if (whatSlide < i) {
        const id = setInterval(frame, 15);
        function frame() {
          if (pos === whatSlideWidth) {
            clearInterval(id);
            toggleDots(false)
          } else {
            pos += 50;
            sliderInner.style.transform = `translateX(-${pos}px)`;
          }
        }
      } else {
        const id = setInterval(frame, 15);
        function frame() {
          if (pos === whatSlideWidth) {
            clearInterval(id);
            toggleDots(false)
          } else {
            pos -= 50;
            sliderInner.style.transform = `translateX(-${pos}px)`;
          }
        }
      }
    }
  }

  function toggleDots(bool) {
    dotsArr.forEach(dot => {
      dot.disabled = bool;
    })
    document.querySelectorAll('.slider__btn').forEach(btn => btn.disabled = bool)
  }
});