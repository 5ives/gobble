import styled from "@emotion/styled";
import { SEARCH_CONTAINER_BOX_PADDING, SEARCH_CONTAINER_BOX_WIDTH } from "../../consts/component-styles";

export const SearchContainerWrapper = styled('div')`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SearchContainerBox = styled('div')`
    width: ${SEARCH_CONTAINER_BOX_WIDTH}px;
    padding: ${SEARCH_CONTAINER_BOX_PADDING}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
