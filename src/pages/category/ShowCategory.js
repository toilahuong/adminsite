import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CreateCategory from "./CreateCategory";
export default function ShowCategory() {
    const { categoryType } = useParams();
    return (
        <>
            <Row>
                <Col md={4}>
                    <CreateCategory />
                </Col>
                <Col md={8}>
                    Show
                </Col>
            </Row>
        </>
    )
}