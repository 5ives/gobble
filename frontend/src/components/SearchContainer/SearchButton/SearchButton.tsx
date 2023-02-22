import { Button } from '@mantine/core';
import { useContext } from 'react';
import { CUISINES } from '../../../consts/cuisines';
import { SearchContext } from '../../../context/useSearchContext/useSearchContext';
import { ISearchContext, ISearchInput } from '../../../context/useSearchContext/useSearchContextTypes';
import { SearchButtonRootStyle, SearchButtonWrapper } from './SearchButtonStyles';

const SearchButton = () => {
    const { searchInput, setSearchInput } = useContext<ISearchContext>(SearchContext);

    const onClick = () => {
        if(!isSearchInputValid()) return;
        setSearchInput((searchInput : ISearchInput) => ({ ...searchInput, isSubmitted: true }));
    };

    const isSearchInputValid = () => {
        if (!CUISINES.includes(searchInput.cuisine)) return false;
        if (searchInput.minPrice < 0 || searchInput.maxPrice > 100) return false;
        return true;
    };

    return (
        <SearchButtonWrapper>
            <Button
                color='red'
                styles={() => ({
                    root: SearchButtonRootStyle
                })}
                onClick={() => onClick()}
            >
                Search
            </Button>
        </SearchButtonWrapper>
    );
};

export default SearchButton;
