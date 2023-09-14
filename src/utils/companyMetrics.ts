export const companyMetrics = async function () {
  // 1) Fetch metrics
  const { deals, investors, property_value: propertyValue } = await fetchMetrics();
  const roundedPropertyValue = roundValue(propertyValue);

  //   2) Populate Webflow text elements
  populateWebflow(deals, investors, roundedPropertyValue);

  async function fetchMetrics() {
    try {
      const req = fetch('https://app.tentacle.se/api/metrics');
      const data = (await req).json();

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  function roundValue(propertyValue: string) {
    return +propertyValue.slice(0, 2);
  }

  function populateWebflow(deals: number, investors: number, roundedPropertyValue: number) {
    const dealsTextEl = document.querySelector('[tentacle-metrics="deals"]');
    const investorsTextEl = document.querySelector('[tentacle-metrics="investors"]');
    const propertyValueTextEl = document.querySelector('[tentacle-metrics="value"]');

    if (dealsTextEl) dealsTextEl.textContent = deals.toString();
    if (investorsTextEl) investorsTextEl.textContent = investors.toString();
    if (propertyValueTextEl) propertyValueTextEl.textContent = roundedPropertyValue.toString();
  }
};
