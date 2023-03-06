import { Button } from '@mantine/core';
import { useContext } from 'react';
import { CUISINES } from '../../../consts/cuisines';
import { RestaurantContext } from '../../../context/useRestaurantContext/useRestaurantContext';
import { IRestaurantContext } from '../../../context/useRestaurantContext/useRestaurantContextTypes';
import { SearchContext } from '../../../context/useSearchContext/useSearchContext';
import { ISearchContext, ISearchInput } from '../../../context/useSearchContext/useSearchContextTypes';
import { getRestaurants } from '../../../services/RestaurantService';
import { SearchButtonRootStyle, SearchButtonWrapper } from './SearchButtonStyles';

const SearchButton = () => {
    const { searchInput, setSearchInput } = useContext<ISearchContext>(SearchContext);
    const { setRestaurants } = useContext<IRestaurantContext>(RestaurantContext);

    const onClick = async () => {
        if(!isSearchInputValid()) return;
        setRestaurants(await getRestaurants(searchInput));
        setSearchInput((searchInput : ISearchInput) => ({ ...searchInput, isSubmitted: true }));
    };

    const isSearchInputValid = () => {
        const uppercasedCuisine = searchInput.cuisine[0].toUpperCase() + searchInput.cuisine.slice(1);
        if (!CUISINES.includes(uppercasedCuisine)) return false;
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
