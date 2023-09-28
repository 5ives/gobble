import { useContext } from "react";
import { SearchContext } from "../../context/useSearchContext/useSearchContext";
import { ISearchContext } from "../../context/useSearchContext/useSearchContextTypes";
import SearchFilters from "../../components/SearchContainer/SearchFilters/SearchFilters";
import { SearchContainerBox, SearchContainerWrapper } from "./SearchContainerStyles";
import SearchButton from "../../components/SearchContainer/SearchButton/SearchButton";

const SearchContainer = () => {
    const { searchInput, setSearchInput } = useContext<ISearchContext>(SearchContext);
    return (
        <SearchContainerWrapper>
            <SearchContainerBox>
                <SearchFilters { ...{ ...searchInput, setSearchInput } } />
                <SearchButton />
            </SearchContainerBox>
        </SearchContainerWrapper>
    );
};

export default SearchContainer;
