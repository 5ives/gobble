import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchNumberInput = ({ input, setInput, label }: { input: number, setInput: Function, label: string }) => {
    return (
        <InputGroup>
            <Form.Control
                placeholder={label}
                aria-label={label}
                onBlur={newInput => setInput(newInput)}
            />
        </InputGroup>
    )
}

export default SearchNumberInput;
