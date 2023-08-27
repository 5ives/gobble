import { CUISINES } from "../../../../../consts/cuisines";
import SearchCuisineBadge from "../SearchCuisinesBadge/SearchCuisinesBadge";
import { SearchCuisineBadgesWrapper } from "./SearchCuisinesBadgesStyles";

const SearchCuisineBadges = ({ onClick } : { onClick : Function }) => {
    return (
        <SearchCuisineBadgesWrapper>
            { CUISINES.map((cuisine, i) => <SearchCuisineBadge key={i} cuisine={cuisine} onClick={onClick}/>) }
        </SearchCuisineBadgesWrapper>
    )
};

export default SearchCuisineBadges