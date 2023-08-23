import { Input } from "@mantine/core";
import { SearchCuisinesInputWrapper } from "./SearchCuisinesInputStyles";

const SearchCuisinesInput = ({ value } : { value : string }) => {
    return (
        <SearchCuisinesInputWrapper>
            <Input placeholder="Search a cuisine" readOnly value={value}/>
        </SearchCuisinesInputWrapper>
    );
};

export default SearchCuisinesInput;
