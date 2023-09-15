import { companyMetrics } from '$utils/companyMetrics';
import { deals } from '$utils/deals';
import { initListings } from '$utils/listings/controller';

import { swiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiper();
  deals();
  companyMetrics();
});

/*<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/tentacle.se@36bc3081b5923f773e988517361fd4dfac8fcb0b/dist/index.min.js"></script>*/
