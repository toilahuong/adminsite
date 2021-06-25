import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import CreateAttributeChildren from "./CreateAttributeChildren";
import ListAttributeChildren from "./ListAttributeChildren";

export default function ShowAttributeChildren() {
    const  { id } = useParams();
    return (
        <>
            <Row>
                <Col lg={4}>
                    <CreateAttributeChildren id={id}/>
                </Col>
                <Col lg={8}>
                    <ListAttributeChildren id={id} />
                </Col>
            </Row>
        </>
    )
}