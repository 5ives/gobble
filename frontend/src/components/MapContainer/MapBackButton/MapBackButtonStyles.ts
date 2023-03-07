import styled from "@emotion/styled";
import { BORDER_RADIUS, HEIGHT, MARGIN, WIDTH } from "../../../consts/spacing";

export const BackButtonWrapper = styled('div')`
    position: fixed;
    top: 10vh;
    left: 50vw;
    transform: translate(-50%, -50%);
`;

export const BackButtonRootStyle = {
    width: WIDTH.EXTRA_EXTRA_LARGE,
    height: HEIGHT.EXTRA_LARGE,
    borderRadius: BORDER_RADIUS.EXTRA_SMALL
}
