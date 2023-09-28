import { MenuItem } from "./menu-item.type";

export type Restaurant = {
    name: string;
    lat: number;
    long: number;
    menuItems: MenuItem[];
};
