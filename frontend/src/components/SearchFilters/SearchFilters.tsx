import { ISearchInput } from "../../context/useSearchContext/useSearchContextTypes";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import SearchNumberInput from "../SearchNumberInput/SearchNumberInput";
import { SearchFiltersWrapper } from "./SearchFiltersStyles";
import { SearchFiltersProps } from "./SearchFiltersTypes";

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
            <SearchDropdown food={food} setFood={handleSetFood}/>
            <SearchNumberInput input={minPrice} setInput={handleSetMinPrice} label='Min Price'/>
            <SearchNumberInput input={maxPrice} setInput={handleSetMaxPrice} label='Max Price'/>
        </SearchFiltersWrapper>
    );
};

export default SearchFilters;
