import styled from "@emotion/styled";
import { Dropdown } from "react-bootstrap";
import { DROPDOWN_ITEM_HEIGHT, DROPDOWN_MENU_PADDING } from "../../consts/component-styles";

export const ScrollDropdownMenu = styled(Dropdown.Menu)`
    height: ${DROPDOWN_ITEM_HEIGHT * 5 + DROPDOWN_MENU_PADDING * 2}px;
    overflow-y: auto;
    width: 100%;

    /* Hides scrollbar */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar { /* Chrome */
        display: none;
    }
`;