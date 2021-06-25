import { Accordion, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function VariantProduct() {
    const variant = useSelector((state) => state.variant);
    return (
        <Accordion>
            {variant.map((item, index) =>
                <Card key={index}>
                    <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                        {
                            item.attributes.map((attr,idx) => {
                                return idx === 0 ? attr.label : ", " + attr.label;
                            })
                        }
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
    )
}