import numeral from 'numeral';

export const deals = async function () {
  const tableEl = document.querySelector('[tentacle-deals-element="table"]');
  if (!tableEl) return;
  const resultTextEl = document.querySelector('[tentacle-deals-element="results"]');

  // Check if swedish or english
  const paths: Array<string> = window.location.pathname.split('/');
  const lang: string = paths.find((path: string) => 'en') ? 'en' : 'sv';

  // Check if landscape/portrait mobile
  const isMobile: boolean = window.innerWidth <= 767 ? true : false;

  // Get number of deals to display
  const limit = getDealsLimit() || null;

  // Get deals in swedish or english
  const deals = await fetchDeals(lang, limit);

  // Update results number element
  showResults(deals.length);

  // Append deals
  limit ? appendDeals(tableEl, deals.slice(0, limit)) : appendDeals(tableEl, deals);

  function appendDeals(tableEl, deals) {
    const geographyTitle = lang === 'sv' ? 'Geografi' : 'Geography';
    const propertyTypeTitle = lang === 'sv' ? 'Fastighetsslag' : 'Property Type';
    const indicativeYieldTitle = lang === 'sv' ? 'Indikativ Yield' : 'Indicative Yield';
    const areaTitle = lang === 'sv' ? 'Area kvm' : 'Area sqm';

    deals.forEach((deal) => {
      const tr = document.createElement('tr');
      tr.classList.add(`deals-table_row`);
      tr.style.cursor = 'pointer';
      tr.setAttribute('deal-id', deal.id);
      tr.innerHTML = `<td class="deals-table_cell">${
        isMobile ? `<span class="text-size-small text-color-grey">${geographyTitle}</span><br>` : ''
      }${deal.county}</td>
      <td class="deals-table_cell">${
        isMobile
          ? `<span class="text-size-small text-color-grey">${propertyTypeTitle}</span><br>`
          : ''
      }${deal.property_types.join(', ')}</td>
      <td class="deals-table_cell text-size-regular">${
        isMobile
          ? `<span class="text-size-small text-color-grey">${indicativeYieldTitle}</span><br>`
          : ''
      }${deal.yield_range ? deal.yield_range.join(' - ') + '%' : '-'}</td>
      <td class="deals-table_cell text-size-regular">${
        isMobile ? `<span class="text-size-small text-color-grey">${areaTitle}</span><br>` : ''
      }${deal.sqm_range ? deal.sqm_range.map((sqm) => formatSqm(sqm)).join(' - ') : ''}</td>`;
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
  async function fetchDeals(lang: string, limit: number) {
    let allDeals: Array<object> = [];
    let page = 1;

    while (true) {
      try {
        const res = await fetch(`https://app.tentacle.se/api/public-deals?page=${page}`, {
          headers: {
            referrer: 'https://app.tentacle.se',
            'Content-Type': 'application/javascript',
            'Accept-Language': lang,
          },
        });

        // if (res.status === 429) {
        //   const secondsToWait = Number(res.headers.get('retry-after'));
        //   await new Promise((resolve) => setTimeout(resolve, secondsToWait * 1000));

        //   return fetchDeals(lang, limit);
        // }

        if (!res.ok) return;

        const data = await res.json();

        allDeals = [...allDeals, ...data.data];

        if (data.meta.last_page === page || allDeals.length === limit) break;
      } catch (err) {
        console.error(err);
      }
      page++;
    }

    return allDeals;
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

    const indicativeYield = undefined;
    const indicativeYieldTitle = lang === 'sv' ? 'Indikativ Yield' : 'Indicative Yield';

    const operatingNet = deal.noi_range ? deal.noi_range.join(' - ') + ' Kr' : undefined;
    const operatingNetTitle = lang === 'sv' ? 'Driftnetto' : 'Operating Net';

    const exchangeableArea = undefined;
    const exchangeableAreaTitle = lang === 'sv' ? 'Utbytbar Area' : 'Exchangeable Area';

    values.push(
      { title: geographyTitle, value: geography, show: true },
      { title: propertyTypeTitle, value: propertyType, show: true },
      { title: indicativeYieldTitle, value: indicativeYield, show: false },
      { title: operatingNetTitle, value: operatingNet, show: true },
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
