import { companyMetrics } from '$utils/companyMetrics';
import { deals } from '$utils/deals';

import { swiper } from './utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiper();
  deals();
  companyMetrics();
});

/*<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/tentacle.se@6cec7c4e03805f3c8e57d96b204c70262c643fea/dist/index.min.js"></script>*/
