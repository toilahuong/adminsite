import { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { getAttribute } from "../redux/slices/attribute";
import { getAttributeParent } from "../redux/slices/attributeParent";
import { addSelectAttribute } from "../redux/slices/selectAttribute";
import Select from 'react-select';
import { addVariant } from "../redux/slices/variant";
import { equar } from "../func";

export default function SelectAttributes() {
    const attributeParent = useSelector((state) => state.attributeParent.current);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAttributeParent());
        dispatch(getAttribute());
    }, [dispatch])
    const selectAttribute = useSelector((state) => state.selectAttribute);
    const variantAttributes = useSelector((state) => state.variant.map(_var => _var.attributes));
    const handleClick = () => {
        let A = [];
        let response = [];
        function back_track(i) {
            for (let j = 0; j < selectAttribute[i].attributes.length; j++) {
                A[i] = selectAttribute[i].attributes[j];
                if (i === selectAttribute.length - 1) {
                    const attributes = A.map((item) => item);
                    const check = variantAttributes.filter((attr) => equar(attr,attributes));
                    if(check.length === 0) {
                        const data = {
                            quantity: 0,
                            regular_price: 0,
                            sale_price: 0,
                            attributes: attributes
                        };
                        response.push(data);
                    }
                } else {
                    back_track(i + 1);
                }
            }
        }
        back_track(0);
        const actionAddVariant = addVariant(response);
        dispatch(actionAddVariant);
    }
    return (
        <Card className="mb-3">
            <Card.Header>
                <Card.Title> Thuộc tính </Card.Title>
            </Card.Header>
            <Card.Body>
                {attributeParent.map((attr, index) => <ParentAttributes data={attr} key={index} />)}
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
                <Button variant="primary" onClick={handleClick}>Tạo biến thể</Button>
            </Card.Footer>
        </Card>
    )
}
function ParentAttributes(props) {
    const { data } = props;
    const attributes = useSelector((state) => state.attribute.current.filter(attr => attr.parent_id === data.id).map(attr => ({ value: attr.id, label: attr.name })));

    const dispatch = useDispatch();
    const handleChange = (selectOptions) => {
        const select = [{
            id: data.id,
            attributes: [...selectOptions]
        }]
        const actionAdd = addSelectAttribute([...select]);
        dispatch(actionAdd);
    }
    return (
        <Form.Group controlId={"Form.ControlName-" + data.id}>
            <Form.Label>{data.name}</Form.Label>
            <Select
                isMulti
                name="colors"
                options={attributes}
                className="basic-multi-select mb-3"
                classNamePrefix="select"
                isClearable="true"
                onChange={handleChange}
            />
        </Form.Group>
    )
}