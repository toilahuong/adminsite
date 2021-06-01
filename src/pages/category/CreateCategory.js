import { Card,Button } from "react-bootstrap";

export default function CreateCategory() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Tạo chuyên mục </Card.Title>
            </Card.Header>
            <Card.Body>
                <Button variant="outline-primary" size="sm">Lưu nháp</Button>
                
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
                <Button variant="primary" size="sm">Đăng bài</Button>
            </Card.Footer>
        </Card>
    )
}