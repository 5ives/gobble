import { useContext } from "react";
import { SearchContext } from "../../../../context/useSearchContext/useSearchContext";
import { ISearchContext, ISearchInput } from "../../../../context/useSearchContext/useSearchContextTypes";
import Heading from "../../../common/Heading/Heading";
import SearchPriceSlider from "./SearchPriceSlider/SearchPriceSlider";

const SearchPrice = () => {
    const { searchInput, setSearchInput } = useContext<ISearchContext>(SearchContext);

    const handlePriceChange = (newMinPrice : number, newMaxPrice : number) => {
        setSearchInput((searchInput : ISearchInput) => ({
            ...searchInput,
            minPrice: newMinPrice,
            maxPrice: newMaxPrice
        }));
    };
    
    return (
        <div>
            <Heading>Price</Heading>
            <SearchPriceSlider
                minPrice={searchInput.minPrice}
                maxPrice={searchInput.maxPrice}
                onChange={handlePriceChange}/>
        </div>
        
    )
};

export default SearchPrice;
