import { useState } from 'react';
import MapContainer from './containers/MapContainer/MapContainer';
import SearchContainer from './containers/SearchContainer/SearchContainer';
import { DEFAULT_RESTAURANTS } from './context/useRestaurantContext/useRestaurantContextConsts';
import { SearchContext, defaultSearchInput } from './context/useSearchContext/useSearchContext';
import { ISearchInput } from './context/useSearchContext/useSearchContextTypes';
import { Restaurant } from './types/restaurant.type';

import { RestaurantContext } from './context/useRestaurantContext/useRestaurantContext';

const App = () => {

	const [searchInput, setSearchInput] = useState<ISearchInput>(defaultSearchInput);
	const searchInputValue = { searchInput, setSearchInput };

	const [restaurants, setRestaurants] = useState<Restaurant[]>(DEFAULT_RESTAURANTS);
	const restaurantsValue = { restaurants, setRestaurants };

	return (
		<SearchContext.Provider value={searchInputValue}>
			<RestaurantContext.Provider value={restaurantsValue}>
				<div className="App">
					{ searchInput.isSubmitted ? <MapContainer /> : <SearchContainer /> }
				</div>
			</RestaurantContext.Provider>
		</SearchContext.Provider>
	);
}

export default App;
