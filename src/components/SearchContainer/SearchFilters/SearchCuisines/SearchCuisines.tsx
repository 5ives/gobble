import { useContext } from "react";
import { SearchContext } from "../../../../context/useSearchContext/useSearchContext";
import { ISearchContext, ISearchInput } from "../../../../context/useSearchContext/useSearchContextTypes";
import Heading from "../../../common/Heading/Heading";
import SearchCuisineBadges from "./SearchCuisinesBadges/SearchCuisinesBadges";
import SearchCuisinesInput from "./SearchCuisinesInput/SearchCuisinesInput";

const SearchCuisines = () => {
    const { searchInput, setSearchInput } = useContext<ISearchContext>(SearchContext);

    const handleCuisineChange = (newCuisine : string) => {
        const lowercasedCuisine = newCuisine.toLowerCase();
        setSearchInput((searchInput : ISearchInput) => ({ ...searchInput, cuisine: lowercasedCuisine }))
    };

    return (
        <>   
            <Heading>Cuisines</Heading>
            <SearchCuisinesInput value={searchInput.cuisine}/>
            <SearchCuisineBadges onClick={handleCuisineChange}/>
        </>
    );
};

export default SearchCuisines;
