import { companyMetrics } from '$utils/companyMetrics';
import { deals } from '$utils/deals';

import { swiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiper();
  deals();
  companyMetrics();
});

/*<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/tentacle.se@20652faf1c3e0b6ae224ba6fc2f2f609a972784f/dist/index.min.js"></script>*/
