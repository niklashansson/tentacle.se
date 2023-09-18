import numeral from 'numeral';

export const deals = async function () {
  const tableEl = document.querySelector('[tentacle-deals-element="table"]');
  if (!tableEl) return;
  const resultTextEl = document.querySelector('[tentacle-deals-element="results"]');

  // Check if swedish or english
  const paths: Array<string> = window.location.pathname.split('/');
  const lang: string = paths.find((path: string) => 'en') ? 'en' : 'sv';

  // Get deals in swedish or english
  const deals = await fetchDeals(lang);

  // Update results number element
  showResults(deals.length);

  // Get number of deals to display
  const limit = getDealsLimit();

  // Append deals
  limit ? appendDeals(tableEl, deals.slice(0, limit)) : appendDeals(tableEl, deals);

  function appendDeals(tableEl, deals) {
    deals.forEach((deal) => {
      const tr = document.createElement('tr');
      tr.classList.add(`deals-table_row`);
      tr.style.cursor = 'pointer';
      tr.setAttribute('deal-id', deal.id);
      tr.innerHTML = `<td class="deals-table_cell">${deal.county}</td>
      <td class="deals-table_cell">${deal.property_types.join(', ')}</td>
      <td class="deals-table_cell text-size-regular">${
        deal.yield_range ? deal.yield_range.join(' - ') + '%' : '-'
      }</td>
      <td class="deals-table_cell text-size-regular">${
        deal.sqm_range ? deal.sqm_range.map((sqm) => formatSqm(sqm)).join(' - ') : ''
      }</td>`;
      tableEl.appendChild(tr);
    });
  }

  // Table component attribute set in Webflow - limit amount of deals rendered
  function getDealsLimit() {
    const limit = tableEl?.getAttribute('tentacle-deals-limit');

    if (limit) return +limit;
  }

  function showResults(resultNum: number) {
    if (!resultTextEl) return;

    resultTextEl.textContent = resultNum.toString();
    resultTextEl.classList.remove('is-active');
  }

  // Formats square meter numbers >= 1000
  function formatSqm(number: number) {
    if (number >= 1000) {
      const string =
        lang === 'en'
          ? numeral(number).format('0,0')
          : numeral(number).format('0,0').replace(',', ' ').replace(',', ' ');
      return string;
    }
    return number;
  }

  // Fetch deals
  async function fetchDeals(lang: string) {
    try {
      const res = await fetch('https://app.tentacle.se/api/public-deals', {
        headers: {
          referrer: 'https://app.tentacle.se',
          'Content-Type': 'application/javascript',
          'Accept-Language': lang,
        },
      });
      const { data } = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchDeal(id: string, lang: string) {
    try {
      const res = await fetch(`https://app.tentacle.se/api/public-deals/${id}`, {
        headers: {
          referrer: 'https://app.tentacle.se',
          'Content-Type': 'application/javascript',
          'Accept-Language': lang,
        },
      });
      const { data } = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  const modalList = document.querySelector('[tentacle-modal-element="list"]');
  const modalComponent = document.querySelector('[tentacle-modal-element="component"]');
  if (!modalList || !modalComponent) return;

  async function renderModal(id: string) {
    clearModalList();

    // Get deal from tentacle API
    const deal = await fetchDeal(id, lang);

    // Prepare details + titles in array
    const specs = dealSpecs(deal);

    // Render details to modal
    appendSpecs(specs);

    // Display modal
    displayModal();
  }

  function displayModal() {
    modalComponent.style.display = 'flex';
    modalComponent.style.opacity = '1';
  }

  function appendSpecs(specs) {
    specs.forEach((spec) => {
      if (!spec.value && spec.show) return;

      const div = document.createElement('div');
      div.classList.add('deal-modal_item');

      div.innerHTML = `<p class="text-color-grey">${spec.title}</p>
      ${
        spec.show
          ? `<p class="text-size-medium">${spec.value}</p>`
          : '<div class="skeleton-text is-listing-2"></div>'
      }`;

      modalList?.appendChild(div);
    });
  }

  function dealSpecs(deal) {
    const values = [];

    const geography = deal.county;
    const geographyTitle = lang === 'sv' ? 'Geografi' : 'Geography';

    const propertyType = deal.property_types ? deal.property_types.join(', ') : undefined;
    const propertyTypeTitle = lang === 'sv' ? 'Fastighetsslag' : 'Property Type';

    const indicativeYield = deal.yield_range ? deal.yield_range.join(' - ') + '%' : undefined;
    const indicativeYieldTitle = lang === 'sv' ? 'Indikativ Yield' : 'Indicative Yield';

    const operatingNet = undefined;
    const operatingNetTitle = lang === 'sv' ? 'Driftnetto' : 'Operating Net';

    const exchangeableArea = undefined;
    const exchangeableAreaTitle = lang === 'sv' ? 'Utbytbar Area' : 'Exchangeable Area';

    values.push(
      { title: geographyTitle, value: geography, show: true },
      { title: propertyTypeTitle, value: propertyType, show: true },
      { title: indicativeYieldTitle, value: indicativeYield, show: true },
      { title: operatingNetTitle, value: operatingNet, show: false },
      { title: exchangeableAreaTitle, value: exchangeableArea, show: false }
    );

    return values;
  }

  function clearModalList() {
    modalList.innerHTML = '';
  }

  // Deal modal
  tableEl.addEventListener('click', (e) => {
    const row = e.target.closest('.deals-table_row');
    if (!row) return;
    const id = row.getAttribute('deal-id');

    renderModal(id);
  });
};
