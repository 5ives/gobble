import React from 'react';
import { Dropdown } from "react-bootstrap"
import { CUISINES } from "../../../consts/cuisines";
import { ScrollDropdownMenu } from './SearchDropdownStyles';

const SearchDropdown = ({ food, setFood }: { food: string, setFood: Function }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" style={{ width: '16em' }}>
                { food.length === 0 ? 'Select a Food Category' : food }
            </Dropdown.Toggle>
            <ScrollDropdownMenu>
                {
                    CUISINES.map(cuisine => <Dropdown.Item onClick={ () => setFood(cuisine) }>{cuisine}</Dropdown.Item>)
                }
            </ScrollDropdownMenu>
        </Dropdown>
    )
}

export default SearchDropdown;