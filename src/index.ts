import { companyMetrics } from '$utils/companyMetrics';
import { initListings } from '$utils/listings/controller';

import { swiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiper();
  initListings();
  companyMetrics();
});

/*<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/tentacle.se@68ef66a36e03c1cf6a89523d5f1ca52c02f79639/dist/index.min.js"></script>*/
