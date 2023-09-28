import { Button } from "@mantine/core";
import { useContext } from "react";
import routes from "../../../consts/routes";
import { RouteContext } from "../../../context/useRouteContext/useRouteContext";
import { IRouteContext } from "../../../context/useRouteContext/useRouteContextTypes";
import { BackButtonRootStyle, BackButtonWrapper } from "./MapBackButtonStyles";

const MapBackButton = () => {
    const { setRoute } = useContext<IRouteContext>(RouteContext);

    const onClick = () => setRoute(routes.FILTERS_ROUTE);

    return (
        <BackButtonWrapper>
            <Button
                color='red'
                styles={() => ({ root: BackButtonRootStyle })}
                onClick={() => onClick()}
            >
                Back
            </Button>
        </BackButtonWrapper>
    );
};

export default MapBackButton;