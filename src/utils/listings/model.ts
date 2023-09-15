import { API_URL } from './config';

interface State {
  listings: Array<object>;
  resultsCount: number;
  activeListing: object;
}

interface Listing {
  county: string;
  deal_type: string;
  id: number;
  noi_range: number[];
  off_market_description: string;
  property_types: string[];
  psm_range: any;
  sqm_range: number[];
  vacancy: number;
  yield_range: number[];
}

export const state: State = {
  listings: [],
  resultsCount: NaN,
  activeListing: {},
};

export const fetchListings = async function () {
  try {
    const res = await fetch(API_URL, {
      headers: {
        referrer: 'https://app.tentacle.se',
        'Content-Type': 'application/javascript',
      },
    });
    const { data } = await res.json();

    data.forEach((listing: Listing) => {
      const newListing = generateListing(listing);
      state.listings.push(newListing);
    });
    state.resultsCount = getResultsCount(data);
  } catch (err) {
    console.error(err);
  }
};
const getResultsCount = function (data: Array<object>) {
  return data.length;
};
const generateListing = function (listing: Listing) {
  return {
    location: listing.county,
    id: listing.id,
    type: listing.property_types,
    yield: listing.yield_range,
    area: listing.sqm_range,
    vacancy: listing.vacancy,
  };
};

export const getListing = function (id) {
  const listing = state.listings.find((listing) => listing.id === +id);
  if (!listing) throw new Error('💥 Listing could not be found');
  return listing;
};
