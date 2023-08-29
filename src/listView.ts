import View from './View';

class ListView extends View {
  // _data;
  // _parentElement = document.querySelector('[tentacle-listings-element="list"]');
  // _listingTemplateElement = this._parentElement.querySelector('[tentacle-listings-element="item"]');
  // _listingResultsElement = document.querySelector('[tentacle-listings-element="results"]');
  // _listingLoaderElement = document.querySelector('[tentacle-listings-element="loader"]');
  // renderListings(data) {
  //   if (!this._parentElement) return;
  //   this._data = data;
  //   const limit = this.getListingsLimit();
  //   limit
  //     ? this._data.slice(0, limit).forEach((listing) => {
  //         this._parentElement.append(this._generateListingMarkup(listing));
  //       })
  //     : this._data.forEach((listing) => {
  //         this._parentElement.append(this._generateListingMarkup(listing));
  //       });
  // }
  // updateResultsElement(count) {
  //   if (!this._listingResultsElement) return;
  //   this._listingResultsElement.textContent = `(${count})`;
  // }
  // clear() {
  //   this._parentElement.innerHTML = '';
  // }
  // getListingsLimit() {
  //   const limit = this._parentElement.getAttribute('tentacle-listings-limit');
  //   if (!limit) return;
  //   return +limit;
  // }
  // _generateListingMarkup(listing) {
  //   if (!this._listingTemplateElement) return;
  //   const listingElement = this._listingTemplateElement.cloneNode(true);
  //   const locationText = listingElement.querySelector('[tentacle-listings-element="location"]');
  //   const typeText = listingElement.querySelector('[tentacle-listings-element="type"]');
  //   const yieldText = listingElement.querySelector('[tentacle-listings-element="yield"]');
  //   const areaText = listingElement.querySelector('[tentacle-listings-element="area"]');
  //   // Sets listing id on element - used as reference for opening listing
  //   if (listingElement) listingElement.setAttribute('data-listing-id', listing.id);
  //   if (locationText) locationText.textContent = listing.location;
  //   if (typeText) typeText.textContent = this.formatType(listing.type);
  //   if (yieldText && listing.yield) yieldText.textContent = this.formatYield(listing.yield);
  //   if (areaText && listing.area) areaText.textContent = this.formatArea(listing.area);
  //   return listingElement;
  // }
  // toggleLoader() {
  //   this._parentElement.classList.toggle('listing-1_list-is-loading');
  //   this._listingLoaderElement.classList.toggle('listing-1_loader-is-loading');
  //   this._listingResultsElement.classList.toggle('listing-1_results-count-loading');
  // }
  // // Event handlers
  // addHandlerInit(handler) {
  //   window.addEventListener('load', function (e) {
  //     handler();
  //   });
  // }
  // addHandlerListingId(handler) {
  //   this._parentElement.addEventListener('click', function (e) {
  //     const listing = e.target.closest("[tentacle-listings-element='item']");
  //     if (!listing) return;
  //     handler(listing?.dataset?.listingId);
  //   });
  // }
}

export default new ListView();
