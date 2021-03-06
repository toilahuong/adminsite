import { Button, Card, Col, Form, Nav, Row } from "react-bootstrap";
import { SERVER, SITE_NAME } from "../../config";
import { useEffect, useState } from "react";
import EditorTextarea from "../../components/EditorTextarea";
import { useDispatch, useSelector } from "react-redux";
import ModalUpload from "../upload/ModalUpload";
import axios from "axios";
import { removeSelectCheckbox, removeSelectRadio } from "../../redux/slices/file";
import { toast } from "react-toastify";
import moment from "moment";
import ImagesSelected from "../../components/ImagesSelected";
import SelectCheckboxCategories from "../../components/SelectCheckboxCategories";
import SelectAttributes from "../../components/SelectAttributes";
import VariantProduct from "../../components/VariantProduct";

export default function CreatePost() {
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState('public');
    const [postDate, setPostDate] = useState(moment().format('YYYY-MM-DDTHH:mm:ss'));
    const [details, setDetails] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [regularPrice, setRegularPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [startTime, setStartTime] = useState(moment().format('YYYY-MM-DDTHH:mm:ss'));
    const [endTime, setEndTime] = useState(moment().format('YYYY-MM-DDTHH:mm:ss'));
    const [selectCategories, setSelectCategories] = useState([]);
    const [modalShowRadio, setModalShowRadio] = useState(false);
    const [modalShowCheckbox, setModalShowCheckbox] = useState(false);
    const file = useSelector((state) => state.file);
    const selectAttributes = useSelector((state) => state.select);
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
        document.title = `T???o s???n ph???m m???i - ${SITE_NAME}`
    }, [])
    useEffect(() => {
        (async () => {
            if (file.selectRadio) {
                const response = await axios.get(`${SERVER}/library/${file.selectRadio}`);
                setThumbnail(response.data);
            }
        })();

    }, [file.selectRadio])
    useEffect(() => {
        (async () => {
            const result = await Promise.all(file.selectCheckbox.map(async (id) => {
                const res = await axios.get(`${SERVER}/library/${id}`);;
                return res.data;
            }));
            setImages(result);
        })();

    }, [file.selectCheckbox])
    const handleRemoveThumbnail = () => {
        const actionRemoveSelected = removeSelectRadio();
        dispatch(actionRemoveSelected);
        setThumbnail(null);
    }
    const handleRemoveImage = (id) => {
        const actionRemoveSelectCheckbox = removeSelectCheckbox(parseInt(id));
        dispatch(actionRemoveSelectCheckbox);
    }
    const handleChangeCheckbox = (id) => {
        const idx = selectCategories.indexOf(id);
        let list = [...selectCategories];
        console.log(list)
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(id);
        }
        setSelectCategories(list)
    }
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const data = {
                name: name,
                details: details,
                description: description,
                thumbnail: thumbnail ? thumbnail.id : null,
                sku: sku,
                regular_price: regularPrice,
                sale_price: salePrice,
                sale_start_time: startTime,
                sale_end_time: endTime,
                status: status,
                post_date: postDate,
                categories: selectCategories,
                attributes: selectAttributes,
                images: file.selectCheckbox,
            }
            console.log(data);
            const response = await axios.post(`${SERVER}/product`, data, { withCredentials: true });
            console.log(response);
            window.location = `/products/${response.data.id}/edit`;
        } catch (error) {
            if (error.response.data.errors) {
                error.response.data.errors.forEach((elm) => {
                    toast.error(elm.msg, settings);
                })
            } else {
                toast.error("???? x???y ra l???i, vui l??ng th??? l???i", settings);
            }
        }
    }
    return (
        <Form className="p-3" onSubmit={handleFormSubmit}>
            <Row>
                <Col lg={8}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Ti??u ?????</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter...." />
                    </Form.Group>
                    <Form.Group className="content mb-3" controlId="formDetails">
                        <Form.Label>N???i dung</Form.Label>
                        <EditorTextarea data={details} action={(data) => setDetails(data)} />
                    </Form.Group>
                    <Form.Group className="description mb-3" controlId="formDescription">
                        <Form.Label>M?? t??? ng???n</Form.Label>
                        <EditorTextarea data={description} action={(data) => setDescription(data)} />
                    </Form.Group>
                    <Card className="mb-3">
                        <Card.Header>
                            <Card.Title>Th?? vi???n ???nh </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="outline-info" size="sm" onClick={() => setModalShowCheckbox(true)} block>Ch???n ???nh</Button>
                            <Row>
                                {images.map((item,index) => <Col key={index} md={3} sm={4} xs={6}><ImagesSelected item={item} remove={handleRemoveImage} /></Col>)}
                            </Row>
                            <ModalUpload
                                show={modalShowCheckbox}
                                type="checkbox"
                                size="fullscreen"
                                onHide={() => setModalShowCheckbox(false)}
                            />
                        </Card.Body>
                    </Card>
                    <SelectAttributes />
                    <VariantProduct />
                </Col>
                <Col lg={4}>
                    <Card className="mb-4">
                        <Card.Header>
                            <Card.Title>????ng </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="outline-primary" size="sm">L??u nh??p</Button>
                            <Nav className="flex-column mt-3">
                                <Nav.Item>
                                    <Form.Group controlId="formStatus">
                                        <Form.Label className="mr-3">
                                            Tr???ng th??i:
                                        </Form.Label>
                                        <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)} className="d-inline-block w-auto" size="sm">
                                            <option value="draft">L??u nh??p</option>
                                            <option value="public">C??ng khai</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Nav.Item>
                                <Nav.Item>
                                    <Form.Group controlId="formDateTime">
                                        <Form.Label className="mr-3">
                                            ????ng ngay:
                                        </Form.Label>
                                        <Form.Control type="datetime-local" className="d-inline-block w-auto" onChange={(e) => setPostDate(e.target.value)} defaultValue={postDate} size="sm" />
                                    </Form.Group>
                                </Nav.Item>
                            </Nav>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end">
                            <Button type="submit" variant="primary" size="sm">????ng b??i</Button>
                        </Card.Footer>
                    </Card>
                    <Card className="mb-4">
                        <Card.Header>
                            <Card.Title>Chuy??n m???c </Card.Title>
                        </Card.Header>
                        <Card.Body style={{ maxHeight: '250px', overflowY: 'auto' }}>
                            <ul className="select-category">
                                <SelectCheckboxCategories type="product" handleChange={handleChangeCheckbox} selectCat={selectCategories} />
                            </ul>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end">
                            <Button variant="primary" size="sm" onClick={() => setSelectCategories([])}>Clear</Button>
                        </Card.Footer>
                    </Card>
                    <Card className="mb-4">
                        <Card.Header>
                            <Card.Title>???nh ?????i di???n </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="outline-info" size="sm" onClick={() => setModalShowRadio(true)} block>Ch???n ???nh</Button>
                            {thumbnail !== null ? <ImagesSelected item={thumbnail} remove={handleRemoveThumbnail} /> : ''}
                            <ModalUpload
                                show={modalShowRadio}
                                type="radio"
                                size="fullscreen"
                                onHide={() => setModalShowRadio(false)}
                            />
                        </Card.Body>
                    </Card>
                    <Card className="mb-4">
                        <Card.Header>
                            <Card.Title>Th??ng tin s???n ph???m </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3" controlId="formSku">
                                <Form.Label>M?? s???n ph???m:</Form.Label>
                                <Form.Control type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Enter...." />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formRegularPrice">
                                <Form.Label>Gi?? s???n ph???m: VN??</Form.Label>
                                <Form.Control type="number" value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} min="0" placeholder="Enter...." />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formSalePrice">
                                <Form.Label>Gi?? Khuy???n m??i: VN??</Form.Label>
                                <Form.Control type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} min="0" placeholder="Enter...." />
                            </Form.Group>
                            <Form.Group controlId="formStartTime">
                                <Form.Label>Th???i gian b???t ?????u</Form.Label>
                                <Form.Control type="datetime-local" onChange={(e) => setStartTime(e.target.value)} defaultValue={startTime} size="sm" />
                            </Form.Group>
                            <Form.Group controlId="formEndTime">
                                <Form.Label>Th???i gian k???t th??c</Form.Label>
                                <Form.Control type="datetime-local" onChange={(e) => setEndTime(e.target.value)} defaultValue={endTime} size="sm" />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Form>
    )
}