import 'swiper/css';

import { Swiper } from 'swiper';
import { Controller, Manipulation, Navigation, Pagination } from 'swiper/modules';

export const swiper = function () {
  const listElements = Array.from(document.querySelectorAll('[swiper="component"]'));

  if (listElements.length === 0) return;

  // Make each instance unique
  const swiperElements = listElements.map((component, i) => {
    const instance = component.querySelector('.swiper');
    if (!instance) return;
    instance.classList.add(`is-swiper-${i + 1}`);

    const btnNext = component.querySelector('.swiper-next');
    const btnPrev = component.querySelector('.swiper-prev');

    return {
      componentEl: component,
      instance: instance,
      btnNext: btnNext,
      btnPrev: btnPrev,
    };
  });

  const swiperInstances = [];

  const getSwiperTitles = function (componentEl) {
    const slides = componentEl.querySelectorAll('.swiper-slide');
    if (!slides) return;
    const titles = [];

    slides.forEach((slide) => {
      const { title } = slide.dataset;
      if (!title) return;
      titles.push(title);
    });

    return titles;
  };

  // Create swiper
  swiperElements.forEach((component) => {
    swiperInstances.push(newSwiper(component));
  });

  function newSwiper(component) {
    const options = component.componentEl.getAttribute('swiper-options') || 1;

    const titles = getSwiperTitles(component.componentEl);

    const optionVariants = [
      {
        modules: [Navigation, Manipulation, Controller],
        speed: 800,
        loop: false,
        grabCursor: true,
        spaceBetween: 24,
        centeredSlides: false,
        slidesPerView: 2,
        preventClicksPropagation: false,
        navigation: {
          nextEl: component.btnNext,
          prevEl: component.btnPrev,
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1.125,
            spaceBetween: 24,
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 1.5,
            spaceBetween: 24,
          },
          // when window width is >= 992px
          992: {
            slidesPerView: 1.5,
            spaceBetween: 24,
          },
        },
        slideActiveClass: 'swiper-active',
      },
      {
        modules: [Pagination, Controller],
        speed: 800,
        loop: false,
        spaceBetween: 24,
        centeredSlides: false,
        slidesPerView: 2,
        pagination: {
          el: component.componentEl.querySelector('.tabs-1_pagination'),
          clickable: true,
          bulletClass: 'tabs-1_bullet',
          bulletActiveClass: 'tabs-1_bullet-active',
          renderBullet: function (index, className) {
            return `<div class="${className}">${titles[index]}</div>`;
          },
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1.125,
            spaceBetween: 24,
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 1.5,
            spaceBetween: 24,
          },
          // when window width is >= 992px
          992: {
            slidesPerView: 1.5,
            spaceBetween: 24,
          },
        },
        slideActiveClass: 'swiper-active',
        slideToClickedSlide: true,
      },
    ];

    const swiper = new Swiper(component.instance, optionVariants[options - 1]);

    return swiper;
  }
};
