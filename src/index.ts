import ListView from './listView';
import modalView from './modalView';
import * as model from './model';

window.Webflow ||= [];
window.Webflow.push(() => {
  const controlListings = async function () {
    try {
      // 1) Fetch listings
      await model.fetchListings();

      // 2) Clear list
      ListView.clear();

      // 3) Render listings and update results count
      ListView.renderListings(model.state.listings);
      ListView.updateResultsElement(model.state.resultsCount);

      // 4) Remove list loader
      ListView.toggleLoader();
    } catch (err) {
      console.log(err);
    }
  };

  const showListing = function (id) {
    // 1) Get listing obj from id
    const listing = model.getListing(id);

    // 2) Render items
    modalView.render(listing);

    // 3) Show modal
    modalView.showModal();
  };

  function init() {
    ListView.addHandlerInit(controlListings);
    ListView.addHandlerListingId(showListing);
  }

  init();
});
