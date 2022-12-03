import { useState } from 'react';
import MapContainer from './containers/MapContainer/MapContainer';
import SearchContainer from './containers/SearchContainer/SearchContainer';
import { SearchContext, defaultSearchInput } from './context/useSearchContext/useSearchContext';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from './context/useSearchContext/useSearchContextConsts';
import { ISearchInput } from './context/useSearchContext/useSearchContextTypes';

const App = () => {
	const [searchInput, setSearchInput] = useState<ISearchInput>(defaultSearchInput)
	const searchInputValue = { searchInput, setSearchInput };
	return (
		<SearchContext.Provider value={searchInputValue}>
			<div className="App">
				{
					searchInput.food === '' ||
					searchInput.maxPrice === DEFAULT_MAX_PRICE ||
					searchInput.minPrice === DEFAULT_MIN_PRICE
						? <SearchContainer/> 
						: <MapContainer />
				}
			</div>
		</SearchContext.Provider>
	);
}

export default App;
