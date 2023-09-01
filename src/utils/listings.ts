// import { API_URL } from '$utils/listings/config';

// // Elements
// const list = document.querySelector('[tentacle-listing-element="list"]') as HTMLDivElement;
// const modal = list.closest('[tentacle-listing-element="modal"]') as HTMLDivElement;
// const component = list.closest('[tentacle-listing-element="component"]') as HTMLDivElement;

// console.log(list);

// const state: State = {
//   listings: [],
//   resultsCount: NaN,
//   activeListing: {},
// };

// export const listings = async function () {
//   // 1) Fetch Tentacle listings
//   await fetchListings();

//   // 2) Clear element list
//   clearHTML(list);
// };

// async function fetchListings() {
//   try {
//     const res = await fetch(API_URL, {
//       headers: {
//         referrer: 'https://dev.tentacle.se',
//         'Content-Type': 'application/javascript',
//       },
//     });
//     const { data } = await res.json();

//     data.forEach((listing: Listing) => {
//       const newListing = generateListing(listing);
//       state.listings.push(newListing);
//     });

//     state.resultsCount = getResultsCount(data);
//   } catch (err) {
//     console.error(err);
//   }
// }

// function getResultsCount(data: Array<object>) {
//   return data.length;
// }

// function generateListing(listing: Listing) {
//   return {
//     id: listing.id,
//     location: listing.county,
//     description: listing.off_market_description,
//     types: listing.property_types,
//     yield: listing.yield_range,
//     area: listing.sqm_range,
//     vacancy: listing.vacancy,
//   };
// }

// function clearHTML(el: Element) {
//   el.innerHTML = '';
// }

// interface State {
//   listings: any;
//   resultsCount: number;
//   activeListing: object;
// }

// interface Listing {
//   county: string;
//   deal_type: string;
//   id: number;
//   noi_range: number[];
//   off_market_description: string;
//   property_types: string[];
//   psm_range: any;
//   sqm_range: number[];
//   vacancy: number;
//   yield_range: number[];
// }
