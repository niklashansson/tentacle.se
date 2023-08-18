export class modalView {
  _data;
  _parentElement = document.querySelector('[tentacle-listing-element="list"]');
  _modal = this._parentElement.closest('[tentacle-listing-element="modal"]');
  _component = this._parentElement.closest('[tentacle-listing-element="component"]');

  render(data) {
    if (!this._parentElement) return;
    this.data = data;

    this._populatePropMarkup(this.data);
  }

  // Opens global modal component - hiding is made with Webflow animations
  showModal() {
    this._modal.style.display = 'flex';
    this._modal.style.opacity = '1';
    this._component.style.display = 'block';
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  _populatePropMarkup(listing) {
    const locationEl = this._parentElement.querySelector(
      '[tentacle-listing-element="location"]'
    ).lastChild;
    const typeEl = this._parentElement.querySelector('[tentacle-listing-element="type"]').lastChild;
    const yieldEl = this._parentElement.querySelector(
      '[tentacle-listing-element="yield"]'
    ).lastChild;
    const vacancyEl = this._parentElement.querySelector(
      '[tentacle-listing-element="vacancy"]'
    ).lastChild;

    if (locationEl && listing.location) locationEl.textContent = listing.location;
    if (typeEl && listing.type) typeEl.textContent = this.formatType(listing.type);
    if (yieldEl && listing.yield) yieldEl.textContent = this.formatYield(listing.yield);
    if (vacancyEl && listing.vacancy) vacancyEl.textContent = listing.vacancy;
  }

  formatType(arr) {
    return arr.join(', ');
  }

  formatYield(arr) {
    return `${arr[0]} - ${arr[1]}%`;
  }

  formatArea(arr) {
    return `${arr[0]} - ${arr[1]}`;
  }

  formatFirstUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default new modalView();
