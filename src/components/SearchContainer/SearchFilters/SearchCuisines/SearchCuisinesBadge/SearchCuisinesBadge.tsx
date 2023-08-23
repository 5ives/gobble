import { Badge } from "@mantine/core";
import { SearchCuisinesBadgeWrapper } from "./SearchCuisinesBadgeStyles";

const CuisineBadge = ({ cuisine, onClick } : { cuisine : string, onClick : Function }) => {
    return (
        <SearchCuisinesBadgeWrapper>
            <Badge size="xl" color="gray" onClick={() => onClick(cuisine)}>{cuisine}</Badge>
        </SearchCuisinesBadgeWrapper>
    );
};

export default CuisineBadge;
