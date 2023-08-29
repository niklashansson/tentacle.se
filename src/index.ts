import ListView from './listView';
import modalView from './modalView';
import * as model from './model';
import { swiper } from './swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiper();

  // const controlListings = async function () {
  //   try {
  //     // 1) Fetch listings
  //     await model.fetchListings();

  //     // 2) Clear list
  //     ListView.clear();

  //     // 3) Render listings and update results count
  //     ListView.renderListings(model.state.listings);
  //     ListView.updateResultsElement(model.state.resultsCount);

  //     // 4) Remove list loader
  //     ListView.toggleLoader();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const showListing = function (id) {
  //   // 1) Get listing obj from id
  //   const listing = model.getListing(id);

  //   // 2) Render items
  //   modalView.render(listing);

  //   // 3) Show modal
  //   modalView.showModal();
  // };

  // function init() {
  //   ListView.addHandlerInit(controlListings);
  //   ListView.addHandlerListingId(showListing);
  // }

  // init();
});

/*<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/tentacle.se@6a3c2d30319916d63e811e9d2e51fbf265f3230b/dist/index.min.js"></script>*/
