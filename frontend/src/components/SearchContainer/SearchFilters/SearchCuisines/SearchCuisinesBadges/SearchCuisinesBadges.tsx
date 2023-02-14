import { CUISINES } from "../../../../../consts/cuisines";
import SearchCuisineBadge from "../SearchCuisinesBadge/SearchCuisinesBadge";
import { SearchCuisineBadgesWrapper } from "./SearchCuisinesBadgesStyles";

const SearchCuisineBadges = () => {
    return (
        <SearchCuisineBadgesWrapper>
            {
                CUISINES.map(cuisine => <SearchCuisineBadge cuisine={cuisine}/>)
            }
        </SearchCuisineBadgesWrapper>
    )
};

export default SearchCuisineBadges