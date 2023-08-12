document.addEventListener('DOMContentLoaded', () => {
  const slideContainer = document.querySelector('.slide');
  const prevButton = document.querySelector('.slide_prev_button');
  const nextButton = document.querySelector('.slide_next_button');

  const imageUrls = [
    'https://placekitten.com/400/100?image=1',
    'https://placekitten.com/400/100?image=2',
    'https://placekitten.com/400/100?image=3',
  ];

  let loadedImages = []; // 이미지 요소를 가지고 있을 배열
  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let timer = null;

  async function loadBannerImages() {
    const imagePromises = imageUrls.map(async (imageUrl) => {
      const response = await fetch(imageUrl); // fetch를 통해 이미지 파일 불러오기
      const image = new Image();
      image.src = URL.createObjectURL(await response.blob());
      return image;
    });

    loadedImages = await Promise.all(imagePromises); // 이미지 객체 저장
  }

  function switchToSlide(index) {
    slideContainer.style.backgroundImage = `url(${loadedImages[index].src})`;
  }

  function switchToNextSlide() {
    currentSlide = (currentSlide + 1) % loadedImages.length;
    switchToSlide(currentSlide);
  }

  function switchToPrevSlide() {
    currentSlide =
      (currentSlide - 1 + loadedImages.length) % loadedImages.length;
    switchToSlide(currentSlide);
  }

  prevButton.addEventListener('click', switchToPrevSlide);
  nextButton.addEventListener('click', switchToNextSlide);

  /** 모바일 터치 인식 */
  slideContainer.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    clearTimeout(timer);
  });

  slideContainer.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    if (touchEndX - touchStartX > 50) {
      switchToPrevSlide();
    } else if (touchStartX - touchEndX > 50) {
      switchToNextSlide();
    }
    startSlideTimer();
  });

  function startSlideTimer() {
    timer = setTimeout(() => {
      switchToNextSlide();
      startSlideTimer(); // 타이머 재귀적으로 호출
    }, 3000);
  }

  // 이미지 로드가 모두 완료되었을 경우 콘솔 출력
  loadBannerImages().then(() => {
    switchToSlide(currentSlide);
    console.log('모든 리소스가 로드되었습니다.');
    startSlideTimer();
  });

  // DOMContentLoaded로 Dom트리 구성이 완료되었을 때 콘솔 출력
  console.log('DOM 트리가 구성되었습니다.');
});
