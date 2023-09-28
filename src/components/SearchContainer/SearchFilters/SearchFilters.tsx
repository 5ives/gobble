// import { ISearchInput } from "../../../context/useSearchContext/useSearchContextTypes";
import SearchCuisines from "./SearchCuisines/SearchCuisines";
import { SearchFiltersWrapper } from "./SearchFiltersStyles";
import { SearchFiltersProps } from "./SearchFiltersTypes";
import { Divider } from '@mantine/core';
import SearchPrice from "./SearchPrice/SearchPrice";

const SearchFilters = ({ cuisine, minPrice, maxPrice, setSearchInput } : SearchFiltersProps) => {
    return (
        <SearchFiltersWrapper>
            <SearchCuisines/>
            <Divider my="sm"/>
            <SearchPrice/>
        </SearchFiltersWrapper>
    );
};

export default SearchFilters;
