import { Badge } from "@mantine/core";
import { SearchCuisinesBadgeWrapper } from "./SearchCuisinesBadgeStyles";

const CuisineBadge = ({ cuisine } : { cuisine : string }) => {
    return (
        <SearchCuisinesBadgeWrapper><Badge size="xl" color="gray">{cuisine}</Badge></SearchCuisinesBadgeWrapper>
    );
};

export default CuisineBadge;
