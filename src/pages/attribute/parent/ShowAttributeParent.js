import { Col, Row } from "react-bootstrap";
import CreateAttributeParent from "./CreateAttributeParent";
import ListAttributeParent from "./ListAttributeParent";

export default function ShowAttributeParent() {
    return (
        <>
            <Row>
                <Col lg={4}>
                    <CreateAttributeParent/>
                </Col>
                <Col lg={8}>
                    <ListAttributeParent/>
                </Col>
            </Row>
        </>
    )
}