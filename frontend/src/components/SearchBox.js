import React, {useState} from 'react'
import { Button, Form } from "react-bootstrap";

const SearchBox = ({history}) => {

    const [keyword, setKeyword] = useState("");

    const submitSearchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push(`/`);
        }
    }

    return (
        <div className="SearchBox"> 
            <Form onSubmit={submitSearchHandler} inline>
                <Form.Control
                    type="text"
                    name="globalSearch"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="mr-sm-2 ml-sm-5"
                    placeholder="Search Products...">
                </Form.Control>
                <Button type="submit" variant="outline-success" className="p-2">Search</Button>
            </Form>
        </div>
    )
}

export default SearchBox
