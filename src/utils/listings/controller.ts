import listView from './listView';
import modalView from './modalView';
import * as model from './model';

export const initListings = function init() {
  listView.addHandlerInit(controlListings);
  listView.addHandlerListingId(showListing);
};

async function controlListings() {
  try {
    // 1) Fetch listings
    await model.fetchListings();

    // 2) Clear list
    listView.clear();

    // 3) Render listings and update results count
    listView.renderListings(model.state.listings);
    listView.updateResultsElement(model.state.resultsCount);

    // 4) Remove list loader
    listView.toggleLoader();
  } catch (err) {
    console.error(err);
  }
}

function showListing(id: number) {
  // 1) Get listing obj from id
  const listing = model.getListing(id);
  if (!listing) return;

  // 2) Render items
  modalView.render(listing);

  // 3) Show modal
  modalView.showModal();
}
