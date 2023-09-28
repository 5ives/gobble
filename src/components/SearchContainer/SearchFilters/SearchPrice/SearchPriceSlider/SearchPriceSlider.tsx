import { RangeSlider } from '@mantine/core';
import { SearchPriceSliderWrapper } from './SearchPriceSliderStyles';

const SearchPriceSlider = ({ minPrice, maxPrice, onChange } : { minPrice : number, maxPrice : number, onChange : Function }) => {
    return (
        <SearchPriceSliderWrapper>
            <RangeSlider
                defaultValue={[minPrice, maxPrice]}
                minRange={0}
                color="red"
                onChangeEnd={val => onChange(val[0], val[1])}/>
        </SearchPriceSliderWrapper>
        
    );
};

export default SearchPriceSlider;
