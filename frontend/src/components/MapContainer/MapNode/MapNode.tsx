import { Title, Text } from "@mantine/core";
import { MENU_ITEM_NAME_TEXT_SIZE, MENU_ITEM_PRICE_TEXT_SIZE, RESTAURANT_NAME_TITLE_SIZE } from "./MapNodeConsts";
import { MapNodeWrapper } from "./MapNodeStyles";
import { MapNodeProps } from "./MapNodeTypes";

const MapNode = ({ restaurantName, menuItemName, menuItemPrice }: MapNodeProps) => {
    return (
        <MapNodeWrapper>
            <Title order={ RESTAURANT_NAME_TITLE_SIZE }>{ restaurantName }</Title>
            <Text fz={ MENU_ITEM_NAME_TEXT_SIZE }>{ menuItemName }</Text>
            <Text fz={ MENU_ITEM_PRICE_TEXT_SIZE }>A${ menuItemPrice }</Text>
        </MapNodeWrapper>
    );
};

export default MapNode;
