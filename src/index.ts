import { companyMetrics } from '$utils/companyMetrics';
import { deals } from '$utils/deals';
import { weglot } from '$utils/weglot';

import { swiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiper();
  deals();
  companyMetrics();
  weglot();
});

/*<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/tentacle.se@8d746338dc8c72b3ce88981a7353057b3be90df5/dist/index.min.js"></script>*/
