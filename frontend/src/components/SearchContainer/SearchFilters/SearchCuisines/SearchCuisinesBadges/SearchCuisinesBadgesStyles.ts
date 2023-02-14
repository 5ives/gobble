import styled from "@emotion/styled";
import { CUISINE_BADGES_HEIGHT } from "../../../../../consts/component-styles";
import { MARGIN } from "../../../../../consts/spacing";

export const SearchCuisineBadgesWrapper = styled('div')`
    height: ${CUISINE_BADGES_HEIGHT};
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    margin: ${MARGIN.SMALL_MEDIUM} 0;

    /* Hides scrollbar */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar { /* Chrome */
        display: none;
    }
`;