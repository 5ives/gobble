import { createContext } from "react";
import { DEFAULT_ROUTE } from "./useRouteContextConsts";
import { IRouteContext } from "./useRouteContextTypes";

const defaultSetRoute = () => {};

const defaultSearchContext : IRouteContext = { route: DEFAULT_ROUTE, setRoute: defaultSetRoute };

export const RouteContext = createContext<IRouteContext>(defaultSearchContext);
