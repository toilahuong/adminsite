import axios from "axios";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SERVER } from "../../../config";
import { getAttribute } from "../../../redux/slices/attribute";
export default function CreateAttributeChildren(props) {
    const { id } = props;
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if(!name) throw new Error("Tên chuyên mục không được để trống")
            const newData = {
                name: name,
                value: value,
                parent_id: id,
            }
            const response = await axios.post(`${SERVER}/attribute`,newData,{withCredentials: true});
            setName('');
            setValue('');
            dispatch(getAttribute());
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
            <div className="category-create">
                <Card>
                    <Card.Header>
                        <Card.Title>Tạo thuộc tính </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="Form.ControlName">
                                <Form.Label>Tên thuộc tính</Form.Label>
                                <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter..." />
                            </Form.Group>
                            <Form.Group controlId="Form.ControlValue">
                                <Form.Label>Giá trị</Form.Label>
                                <Form.Control type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" variant="primary" size="sm">Tạo thuộc tính</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
    )
}