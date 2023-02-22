import { useState } from 'react';
import MapContainer from './containers/MapContainer/MapContainer';
import SearchContainer from './containers/SearchContainer/SearchContainer';
import { SearchContext, defaultSearchInput } from './context/useSearchContext/useSearchContext';
import { ISearchInput } from './context/useSearchContext/useSearchContextTypes';

const App = () => {
	const [searchInput, setSearchInput] = useState<ISearchInput>(defaultSearchInput)
	const searchInputValue = { searchInput, setSearchInput };

	return (
		<SearchContext.Provider value={searchInputValue}>
			<div className="App">
				{ searchInput.isSubmitted ? <MapContainer /> : <SearchContainer /> }
			</div>
		</SearchContext.Provider>
	);
}

export default App;
