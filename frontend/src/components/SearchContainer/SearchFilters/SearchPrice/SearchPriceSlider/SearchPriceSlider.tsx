import { RangeSlider } from '@mantine/core';
import { SearchPriceSliderWrapper } from './SearchPriceSliderStyles';

const SearchPriceSlider = () => {
    return (
        <SearchPriceSliderWrapper>
            <RangeSlider defaultValue={[15, 30]} minRange={0} color="red"/>
        </SearchPriceSliderWrapper>
        
    );
};

export default SearchPriceSlider;
