import { Input } from "@mantine/core";
import { SearchCuisinesInputWrapper } from "./SearchCuisinesInputStyles";

const SearchCuisinesInput = () => {
    return (
        <SearchCuisinesInputWrapper><Input placeholder="Search a cuisine"/></SearchCuisinesInputWrapper>
    );
};

export default SearchCuisinesInput;
