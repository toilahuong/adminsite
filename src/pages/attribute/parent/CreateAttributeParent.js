import axios from "axios";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SERVER } from "../../../config";
import { getAttributeParent } from "../../../redux/slices/attributeParent";
export default function CreateAttributeParent() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if(!name) throw new Error("Tên chuyên mục không được để trống")
            const newData = {
                name: name,
                desc: desc,
            }
            const response = await axios.post(`${SERVER}/attribute-parent`,newData,{withCredentials: true});
            setName('');
            setDesc('');
            dispatch(getAttributeParent());
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
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control as="textarea" rows="3" value={desc} onChange={(e) => setDesc(e.target.value)}/>
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