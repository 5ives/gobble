import { useState } from 'react';
import MapContainer from './containers/MapContainer/MapContainer';
import SearchContainer from './containers/SearchContainer/SearchContainer';
import { DEFAULT_RESTAURANTS } from './context/useRestaurantContext/useRestaurantContextConsts';
import { SearchContext, defaultSearchInput } from './context/useSearchContext/useSearchContext';
import { ISearchInput } from './context/useSearchContext/useSearchContextTypes';
import { Restaurant } from './types/restaurant.type';

import { RestaurantContext } from './context/useRestaurantContext/useRestaurantContext';
import { DEFAULT_ROUTE } from './context/useRouteContext/useRouteContextConsts';
import { RouteContext } from './context/useRouteContext/useRouteContext';

const App = () => {

	const [searchInput, setSearchInput] = useState<ISearchInput>(defaultSearchInput);
	const searchInputValue = { searchInput, setSearchInput };

	const [restaurants, setRestaurants] = useState<Restaurant[]>(DEFAULT_RESTAURANTS);
	const restaurantsValue = { restaurants, setRestaurants };

	const [route, setRoute] = useState<string>(DEFAULT_ROUTE);
	const routeValue = { route, setRoute };

	return (
		<SearchContext.Provider value={searchInputValue}>
			<RestaurantContext.Provider value={restaurantsValue}>
				<RouteContext.Provider value={routeValue}>
					<div className="App">
						{ 
							route === '/' ? <SearchContainer />
							: route === '/map' ? <MapContainer />
							: <></>
						}
					</div>
				</RouteContext.Provider>
			</RestaurantContext.Provider>
		</SearchContext.Provider>
	);
}

export default App;
