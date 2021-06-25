import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { SERVER } from "../../../config";
import { useParams } from "react-router";
import { toast } from "react-toastify";
const settings = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
export default function EditAttributeChildren() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${SERVER}/attribute/${id}`);
                setName(response.data.name);
                setValue(response.data.value || "")
            } catch (error) {
                window.location = '/'
            }

        })();
    }, [id])
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!name) throw new Error("Tên thuộc không được để trống")
            const newData = {
                name: name,
                value: value,
            }
            await axios.put(`${SERVER}/attribute/${id}`, newData, { withCredentials: true });
            toast.success('Cập nhật thành công', settings)
        } catch (err) {
            toast.error('Đã xảy ra lỗi', settings)
        }
    }
    return (
        <Card>
            <Card.Header>
                <Card.Title>Chỉnh sửa thuộc tính </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="Form.ControlName">
                        <Form.Label>Tên thuộc tính</Form.Label>
                        <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter..." />
                    </Form.Group>
                    <Form.Group controlId="Form.ControlValue">
                        <Form.Label>Giá trị</Form.Label>
                        <Form.Control type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" variant="primary" size="sm">Cập nhật</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}