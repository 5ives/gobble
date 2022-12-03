import React from 'react';
import { Dropdown } from "react-bootstrap"
import { TOP_TEN_FOODS } from "../../consts/foods";
import { ScrollDropdownMenu } from './SearchDropdownStyles';

const SearchDropdown = ({ food, setFood }: { food: string, setFood: Function }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" style={{ width: '16em' }}>
                { food.length === 0 ? 'Select a Food Category' : food }
            </Dropdown.Toggle>
            <ScrollDropdownMenu>
                {
                    TOP_TEN_FOODS.map(food => <Dropdown.Item onClick={ () => setFood(food) }>{food}</Dropdown.Item>)
                }
            </ScrollDropdownMenu>
        </Dropdown>
    )
}

export default SearchDropdown;