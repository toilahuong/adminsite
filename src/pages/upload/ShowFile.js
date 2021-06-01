import axios from "axios";
import { Button, Col, Image, Modal } from "react-bootstrap"
import { SERVER } from "../../config"
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai'
import { toast } from "react-toastify";
import { useState } from "react";

export default function ShowFile(props) {
    const {item,remove} = props;
    const [modalShow, setModalShow] = useState(false);
    const settings = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    const removeImage = async() => {
        const result = await axios.delete(`${SERVER}/library/${item.id}`,{withCredentials: true});
        console.log(result);
    }
    const onRemove = async (e) => {
        e.stopPropagation()
        await removeImage();
        await remove((curr) => curr.filter((value) => value !== item));
        toast.success('Đã xóa',settings)
    }
    
    return (
        <Col sm={6} md={4} lg={3}>
            <div className="item" onClick={e => e.stopPropagation()}>
                <div className="thumbnail">
                    <img loading="lazy" src={item.medium} alt={item.name} />
                </div>
                <div className="action">
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                       <AiOutlineEye className="react-icon" /> View
                    </Button>
                    <Button variant="danger" onClick={onRemove}>
                       <AiOutlineDelete className="react-icon" /> Delete
                    </Button>
                </div>
                <ShowModal
                    url={item.url}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            
        </Col>
    )
}
function ShowModal(props) {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={props.url} fluid/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}