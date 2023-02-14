import Heading from "../../common/Heading/Heading";
import SearchCuisineBadges from "./SearchCuisinesBadges/SearchCuisinesBadges";
import SearchCuisinesInput from "./SearchCuisinesInput/SearchCuisinesInput";

const SearchCuisines = () => {
    return (
        <>   
            <Heading>Cuisines</Heading>
            <SearchCuisinesInput/>
            <SearchCuisineBadges/>
        </>
    );
};

export default SearchCuisines;
