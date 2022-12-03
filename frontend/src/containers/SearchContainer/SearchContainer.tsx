import { SearchContext } from "../../context/useSearchContext/useSearchContext";
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import { useContext } from "react";
import { ISearchContext } from "../../context/useSearchContext/useSearchContextTypes";
import { SearchContainerWrapper } from "./SearchContainerStyles";

const SearchContainer = () => {
    const { searchInput, setSearchInput } = useContext<ISearchContext>(SearchContext)
    return (
        <SearchContainerWrapper>
            <SearchFilters { ...{ ...searchInput, setSearchInput } } />
        </SearchContainerWrapper>
    );
};

export default SearchContainer;
