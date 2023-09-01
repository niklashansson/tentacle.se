import { initListings } from '$utils/listings/controller';

import { swiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiper();
  initListings();
});

/*<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/tentacle.se@f8f81725fc0809ebb167670e8e9cba73f474deb4/dist/index.min.js"></script>*/
