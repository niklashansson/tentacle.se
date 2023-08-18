import { API_URL } from './config';

export const state = {
  listings: [],
  resultsCount: '',
  activeListing: '',
};

export const fetchListings = async function () {
  try {
    const res = await fetch(API_URL, {
      headers: {
        referrer: 'https://dev.tentacle.se',
        'Content-Type': 'application/javascript',
      },
    });
    const { data } = await res.json();

    data.forEach((listing) => {
      const newListing = generateListing(listing);
      state.listings.push(newListing);
    });

    state.resultsCount = getResultsCount(data);
  } catch (err) {
    console.error(err);
  }
};

const getResultsCount = function (data) {
  return data.length;
};

const generateListing = function (listing) {
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
