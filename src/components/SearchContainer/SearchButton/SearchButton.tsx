import { Button } from '@mantine/core';
import { useContext } from 'react';
import { CUISINES } from '../../../consts/cuisines';
import routes from '../../../consts/routes';
import { RestaurantContext } from '../../../context/useRestaurantContext/useRestaurantContext';
import { IRestaurantContext } from '../../../context/useRestaurantContext/useRestaurantContextTypes';
import { RouteContext } from '../../../context/useRouteContext/useRouteContext';
import { IRouteContext } from '../../../context/useRouteContext/useRouteContextTypes';
import { SearchContext } from '../../../context/useSearchContext/useSearchContext';
import { ISearchContext } from '../../../context/useSearchContext/useSearchContextTypes';
import { getMenuItems, getRestaurantById, getRestaurants, searchRestaurants } from '../../../services/RestaurantService';
import { SearchButtonRootStyle, SearchButtonWrapper } from './SearchButtonStyles';

const SearchButton = () => {
    const { searchInput } = useContext<ISearchContext>(SearchContext);
    const { setRestaurants } = useContext<IRestaurantContext>(RestaurantContext);
    const { setRoute } = useContext<IRouteContext>(RouteContext);

    const onClick = async () => {
        if(!isSearchInputValid()) return;
        const targetRestaurants = await searchRestaurants(searchInput.cuisine, searchInput.minPrice, searchInput.maxPrice);
        setRestaurants(targetRestaurants);
        setRoute(routes.MAP_ROUTE);
    };

    const isSearchInputValid = () => {
        if (searchInput.minPrice < 0 || searchInput.maxPrice > 100) return false;
        return true;
    };

    return (
        <SearchButtonWrapper>
            <Button
                color='red'
                styles={() => ({ root: SearchButtonRootStyle })}
                onClick={() => onClick()}
            >
                Search
            </Button>
        </SearchButtonWrapper>
    );
};

export default SearchButton;
