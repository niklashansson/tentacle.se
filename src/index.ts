import { companyMetrics } from '$utils/companyMetrics';
import { deals } from '$utils/deals';

import { swiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiper();
  deals();
  companyMetrics();
});

/*<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/tentacle.se@b0409f150384adf5b01d059a44544356f816cea6/dist/index.min.js"></script>*/
