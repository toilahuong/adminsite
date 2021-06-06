import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/slices/category";

export default function SelectCheckboxCategories(props) {
    const {handleChange, selectCat,type } = props;
    const category = useSelector((state) => {
        const current = state.category.current;
        if(current) {
            return current.filter((cat) => cat.category_type === type);
        } else {
            return current;
        }
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch])
    return category.map((item, index) =>
        <li key={index}>
            <Form.Group className="mb-3" controlId={"formBasicCheckbox" + item.id}>
                <Form.Check type="checkbox" value={item.id} name="categories[]" onChange={() => handleChange(item.id)} checked={selectCat.includes(item.id)} label={item.name} />
            </Form.Group>
            {item.childrens ? <ul><SelectCheckboxCategories handleChange={handleChange} selectCat={selectCat} data={item.childrens} /></ul> : ''}
        </li>
    )
}