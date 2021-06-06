import axios from "axios";
import { Button, Col, Image, Modal } from "react-bootstrap"
import { SERVER } from "../../config"
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai'
import { toast } from "react-toastify";
import { useState } from "react";
import { removeFile } from "../../redux/slices/file";
import { useDispatch } from "react-redux";

export default function ShowFile(props) {
    const {item} = props;
    const dispatch = useDispatch();
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
        const remove = removeFile(item.id);
        dispatch(remove);
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
                    item={item}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            
        </Col>
    )
}
function ShowModal(props) {
  const {item,onHide} = props
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {item.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={item.url} fluid/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}