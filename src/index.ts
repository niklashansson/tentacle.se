import { companyMetrics } from '$utils/companyMetrics';
import { deals } from '$utils/deals';

import { swiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiper();
  deals();
  companyMetrics();
});

/*<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/tentacle.se@c7f9ecdd6285608e9b14b7769585bd0f17846f9e/dist/index.min.js"></script>*/
