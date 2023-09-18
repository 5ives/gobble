import { Input } from "@mantine/core";
import { SearchCuisinesInputWrapper } from "./SearchCuisinesInputStyles";

const SearchCuisinesInput = ({ value, onChange } : { value : string, onChange : any }) => {
    return (
        <SearchCuisinesInputWrapper>
            <Input placeholder="Search a cuisine" value={value} onChange={e => onChange(e.target.value)}/>
        </SearchCuisinesInputWrapper>
    );
};

export default SearchCuisinesInput;
