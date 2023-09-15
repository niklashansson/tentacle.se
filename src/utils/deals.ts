export const deals = async function () {
  const tableEl = document.querySelector('[tentacle-deals-element="table"]');
  if (!tableEl) return;

  // Check if swedish or english
  const paths: Array<string> = window.location.pathname.split('/');
  const lang: string = paths.find((path) => 'en') ? 'en' : 'sv';

  // Get deals in swedish or english
  const deals = await fetchDeals(lang);

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

  function getDealsLimit() {
    const limit = tableEl?.getAttribute('tentacle-deals-limit');

    if (limit) return +limit;
  }

  // Formats square meter numbers >= 1000
  function formatSqm(number) {
    if (number >= 1000) {
      const origNumber = number.toString().split('');
      origNumber.splice(1, 0, ' ');

      const formattedNumber = origNumber.join('');
      return formattedNumber;
    }
    return number;
  }

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
};
