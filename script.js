function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  const sliderImages = document.querySelectorAll('.slide-in');

  function checkSlide(e) {
      sliderImages.forEach(image => {
          const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
          //Перемотанное + то, что на экране => нижний край экрана
          // console.log(slideInAt);
          //Half way through the image
          const imageBottom = image.offsetTop + image.height;
          //Расстояние от верха экрана до картинки + высота картинки = низ картинки
          // console.log(imageBottom);
          //Bottom of the image
          const isHalfShown = slideInAt > image.offsetTop;
          //Если нижний край экрана дальше, чем расстояние от верха до картинки
          // console.log(isHalfShown);
          const isNotScrolledPast = window.scrollY < imageBottom;
          //Если расстояние до низа картинки, больше проскроленного
          // console.log(isNotScrolledPast);
          if (isHalfShown && isNotScrolledPast) {
            image.classList.add('active');
          } else {
            image.classList.remove('active');
          }
      });
  }

  window.addEventListener('scroll', debounce(checkSlide));
