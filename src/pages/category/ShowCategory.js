import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { SITE_NAME } from "../../config";
import CreateCategory from "./CreateCategory";
import ListCategory from "./ListCategory";
export default function ShowCategory() {
    const { categoryType } = useParams();
    useEffect(() => {
        if(categoryType !== "product" && categoryType !== "post") window.location = '/dashboard';
        document.title = `CATEGORY ${categoryType.toUpperCase()} - ${SITE_NAME}`;
    },[categoryType])
    return (
        <>
            <Row>
                <Col lg={4}>
                    <CreateCategory type={categoryType}/>
                </Col>
                <Col lg={8}>
                    <ListCategory type={categoryType}/>
                </Col>
            </Row>
        </>
    )
}