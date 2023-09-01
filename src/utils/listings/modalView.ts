import View from './View';

class modalView extends View {
  _data: any;
  _parentElement = document.querySelector('[tentacle-listing-element="list"]') as HTMLDivElement;
  _modal = this._parentElement.closest('[tentacle-listing-element="modal"]') as HTMLDivElement;
  _component = this._parentElement.closest(
    '[tentacle-listing-element="component"]'
  ) as HTMLDivElement;

  render(data: object) {
    if (!this._parentElement || !this._modal || !this._component) return;
    this._data = data;
    this._populatePropMarkup(this._data);
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

  _populatePropMarkup(listing: object) {
    const locationEl = this._parentElement.querySelector(
      '[tentacle-listing-element="location"]'
    ).lastChild;
    const typeEl = this._parentElement.querySelector('[tentacle-listing-element="type"]').lastChild;
    const yieldEl = this._parentElement.querySelector(
      '[tentacle-listing-element="yield"]'
    ).lastChild;

    if (locationEl && listing.location) locationEl.textContent = listing.location;
    if (typeEl && listing.type) typeEl.textContent = this.formatType(listing.type);
    if (yieldEl && listing.yield) yieldEl.textContent = this.formatYield(listing.yield);
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
