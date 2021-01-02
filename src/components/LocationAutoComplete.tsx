import { AutoComplete } from 'antd';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { connectAutoComplete } from 'react-instantsearch-dom';

// algoliasearch doesn't accept undefined, must ensure it's a string
const algoliaAppID = `${process.env.REACT_APP_ALGOLIA_APP_ID}`;
const algoliaAdminKey = `${process.env.REACT_APP_ALGOLIA_ADMIN_KEY}`;

const searchClient = algoliasearch(algoliaAppID, algoliaAdminKey);

const AutoComponent = connectAutoComplete(({ hits, refine, currentRefinement }) => {
  console.log(currentRefinement);
  const options = hits.map((hit) => ({ label: hit.name, value: hit.objectID }));
  return <AutoComplete options={options} onChange={refine} />;
});

function LocationAutoComplete() {
  return (
    <InstantSearch indexName="locations" searchClient={searchClient}>
      <AutoComponent />
    </InstantSearch>
  );
}

export default LocationAutoComplete;
