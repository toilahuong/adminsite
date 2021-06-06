import { Button, Card, Col, Form, Nav, Row } from "react-bootstrap";
import { SERVER, SITE_NAME } from "../../config";
import { useEffect, useState } from "react";
import EditorTextarea from "../../components/EditorTextarea";
import { useDispatch, useSelector } from "react-redux";
import ModalUpload from "../upload/ModalUpload";
import axios from "axios";
import { removeSelectRadio } from "../../redux/slices/file";
import { toast } from "react-toastify";
import moment from "moment";
import ImagesSelected from "../../components/ImagesSelected";

export default function CreatePage() {
    const [thumbnail, setThumbnail] = useState(null);
    const [status, setStatus] = useState('public');
    const [postDate, setPostDate] = useState(moment().format('YYYY-MM-DDTHH:mm:ss'));
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const file = useSelector((state) => state.file);
    const dispatch = useDispatch();
    const settings = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    useEffect(() => {
        document.title = `Tạo bài viết mới - ${SITE_NAME}`
    }, [])
    useEffect(() => {
        (async () => {
            if (file.selectRadio) {
                const response = await axios.get(`${SERVER}/library/${file.selectRadio}`);
                setThumbnail(response.data);
            }
        })();

    }, [file.selectRadio])
    const handleRemoveThumbnail = () => {
        const actionRemoveSelected = removeSelectRadio();
        dispatch(actionRemoveSelected);
        setThumbnail(null);
    }

    const handleChangeContent = (data) => {
        setContent(data);
    }
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const data = {
                title: title,
                content: content,
                thumbnail: thumbnail ? thumbnail.id : null,
                status: status,
                post_type: "page",
                postDate: postDate,
            }
            const response = await axios.post(`${SERVER}/post`, data, { withCredentials: true });
            window.location = `/pages/${response.data.id}/edit`;
        } catch (error) {
            if (error.response.data.errors) {
                error.response.data.errors.forEach((elm) => {
                    toast.error(elm.msg, settings);
                })
            } else {
                toast.error("Đã xảy ra lỗi, vui lòng thử lại", settings);
            }
        }
    }
    return (
        <Form className="p-3" onSubmit={handleFormSubmit}>
            <Row>
                <Col lg={8}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Enter...." />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nội dung</Form.Label>
                        <EditorTextarea data="" action={handleChangeContent} />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Card className="mb-4">
                        <Card.Header>
                            <Card.Title>Đăng </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="outline-primary" size="sm">Lưu nháp</Button>
                            <Nav className="flex-column mt-3">
                                <Nav.Item>
                                    <Form.Group controlId="formStatus">
                                        <Form.Label className="mr-3">
                                            Trạng thái:
                                        </Form.Label>
                                        <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)} className="d-inline-block w-auto" size="sm">
                                            <option value="draft">Lưu nháp</option>
                                            <option value="public">Công khai</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Nav.Item>
                                <Nav.Item>
                                    <Form.Group controlId="formStatus">
                                        <Form.Label className="mr-3">
                                            Đăng ngay:
                                        </Form.Label>
                                        <Form.Control type="datetime-local" className="d-inline-block w-auto" onChange={(e) => setPostDate(e.target.value)} defaultValue={postDate} size="sm"/>
                                    </Form.Group>
                                </Nav.Item>
                            </Nav>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end">
                            <Button type="submit" variant="primary" size="sm">Đăng bài</Button>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title>Ảnh đại diện </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="outline-info" size="sm" onClick={() => setModalShow(true)} block>Chọn ảnh</Button>
                            {thumbnail !== null ? <ImagesSelected item={thumbnail} remove={handleRemoveThumbnail} /> : ''}
                            <ModalUpload
                                show={modalShow}
                                type="radio"
                                size="fullscreen"
                                onHide={() => setModalShow(false)}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Form>
    )
}
