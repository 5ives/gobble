import { ISearchInput } from "../../../context/useSearchContext/useSearchContextTypes";
import SearchCuisines from "../SearchCuisines/SearchCuisines";
import { SearchFiltersWrapper } from "./SearchFiltersStyles";
import { SearchFiltersProps } from "./SearchFiltersTypes";
import { Divider } from '@mantine/core';
import SearchPrice from "../SearchPrice/SearchPrice";

const SearchFilters = ({ food, minPrice, maxPrice, setSearchInput } : SearchFiltersProps) => {

    const handleSetFood = (newFood : string) => {
        setSearchInput((searchInput : ISearchInput) => ({ ...searchInput, food: newFood }))
    };

    const handleSetMinPrice = (event: { target: { value: any; }; }) => {
        const newMinPrice = +event.target.value;
        setSearchInput((searchInput : ISearchInput) => ({ ...searchInput, minPrice: newMinPrice }))
    };

    const handleSetMaxPrice = (event: { target: { value: any; }; }) => {
        const newMaxPrice = +event.target.value;
        setSearchInput((searchInput : ISearchInput) => ({ ...searchInput, maxPrice: newMaxPrice }))
    };

    return (
        <SearchFiltersWrapper>
            <SearchCuisines/>
            <Divider my="sm"/>
            <SearchPrice/>
        </SearchFiltersWrapper>
    );
};

export default SearchFilters;
