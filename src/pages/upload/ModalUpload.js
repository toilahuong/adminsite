import { Button, Modal } from "react-bootstrap";
import RadioUpload from './RadioUpload';
export default function ModalUpload(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Thư viện hình ảnh
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.type === 'radio'? <RadioUpload onHide={props.onHide}/> : ''}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
