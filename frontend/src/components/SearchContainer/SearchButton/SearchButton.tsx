import { Button } from '@mantine/core';
import { SearchButtonRootStyle, SearchButtonWrapper } from './SearchButtonStyles';

const SearchButton = () => {
    return (
        <SearchButtonWrapper>
            <Button
                color='red'
                styles={(theme) => ({
                    root: SearchButtonRootStyle
                })}
            >
                Search
            </Button>
        </SearchButtonWrapper>
    );
};

export default SearchButton;
