import { Button, Card, Col, Form, Nav, Row } from "react-bootstrap";
import { SERVER, SITE_NAME } from "../../config";
import { useEffect, useState } from "react";
import EditorTextarea from "../../components/EditorTextarea";
import { useDispatch, useSelector } from "react-redux";
import ModalUpload from "../upload/ModalUpload";
import axios from "axios";
import { removeSelectCheckbox, removeSelectRadio,setSelectCheckbox } from "../../redux/slices/file";
import { toast } from "react-toastify";
import moment from "moment";
import ImagesSelected from "../../components/ImagesSelected";
import SelectCheckboxCategories from "../../components/SelectCheckboxCategories";
import SelectAttributes from "../../components/SelectAttributes";
import { useParams } from "react-router";
import { addSelect } from "../../redux/slices/select";
import Loading from "../loading/Loading";

export default function CreatePost() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState('public');
    const [postDate, setPostDate] = useState();
    const [details, setDetails] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [regularPrice, setRegularPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
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
        document.title = `Chỉnh sửa sản phẩm - ${SITE_NAME}`
    }, [])
    useEffect(() => {
        (async() => {
            const response = await axios.get(`${SERVER}/product/${id}`);
            console.log(response.data);
            setThumbnail(response.data.thumb);
            setImages(response.data.images);
            const addSelectCheckbox = setSelectCheckbox(response.data.images.map(image => image.id));
            dispatch(addSelectCheckbox);
            setStatus(response.data.status);
            setPostDate(moment(response.data.post_date).format('YYYY-MM-DDTHH:mm:ss'));
            setDetails(response.data.details || "");
            setDescription(response.data.setDescription || "");
            setName(response.data.name);
            setSku(response.data.sku);
            setRegularPrice(response.data.regular_price);
            setSalePrice(response.data.sale_price);
            setStartTime(moment(response.data.sale_start_time).format('YYYY-MM-DDTHH:mm:ss'));
            setEndTime(moment(response.data.sale_end_time).format('YYYY-MM-DDTHH:mm:ss'));
            setSelectCategories(response.data.categories.map(cat => cat.id));
            const actionAddSelect = addSelect(response.data.attributes.map(attr => attr.id));
            dispatch(actionAddSelect);
            setLoading(false)
        })()
    },[id,dispatch])
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
            setSaving(true);
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
            const response = await axios.put(`${SERVER}/product/${id}`, data, { withCredentials: true });
            if(response.data.isUpdate === false) throw new Error("Đã xảy ra lỗi");
            toast.success("Cập nhật thành công", settings);
            setSaving(false);
        } catch (error) {
            setSaving(false);
            if (error.response.data.errors) {
                error.response.data.errors.forEach((elm) => {
                    toast.error(elm.msg, settings);
                })
            } else {
                toast.error("Đã xảy ra lỗi, vui lòng thử lại", settings);
            }
        }
    }
    const autosave = async (value) => {
        try {
            setSaving(true);
            const response = await axios.put(`${SERVER}/product/${id}/autosave`, {
                details: value
            }, { withCredentials: true });
            if(response.data.isUpdate === false) throw new Error("Đã xảy ra lỗi");
            setTimeout(() => {setSaving(false)},500)
            return true;
        } catch (error) {
            setSaving(false);
            if (error.response && error.response.data.errors) {
                error.response.data.errors.forEach((elm) => {
                    console.log(elm.msg)
                })
            } else {
                console.log("Đã xảy ra lỗi, vui lòng thử lại")
            }
            return false;
        }
    }
    if(loading) return <Loading />
    return (
        <Form className="p-3" onSubmit={handleFormSubmit}>
            <Row>
                <Col lg={8}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter...." />
                    </Form.Group>
                    <Form.Group className="content mb-3" controlId="formDetails">
                        <Form.Label>Nội dung</Form.Label>
                        <EditorTextarea data={details} autosave={autosave} action={(data) => setDetails(data)} />
                    </Form.Group>
                    <Form.Group className="description mb-3" controlId="formDescription">
                        <Form.Label>Mô tả ngắn</Form.Label>
                        <EditorTextarea data={description} action={(data) => setDescription(data)} />
                    </Form.Group>
                    <Card className="mb-3">
                        <Card.Header>
                            <Card.Title>Thư viện ảnh </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="outline-info" size="sm" onClick={() => setModalShowCheckbox(true)} block>Chọn ảnh</Button>
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
                                    <Form.Group controlId="formDateTime">
                                        <Form.Label className="mr-3">
                                            Đăng ngay:
                                        </Form.Label>
                                        <Form.Control type="datetime-local" className="d-inline-block w-auto" onChange={(e) => setPostDate(e.target.value)} defaultValue={postDate} size="sm" />
                                    </Form.Group>
                                </Nav.Item>
                            </Nav>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end">
                            <Button type="submit" variant="primary" size="sm" disabled={saving}>{saving? "Đang cập nhật..." : "Cập nhật"}</Button>
                        </Card.Footer>
                    </Card>
                    <Card className="mb-4">
                        <Card.Header>
                            <Card.Title>Chuyên mục </Card.Title>
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
                            <Card.Title>Ảnh đại diện </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="outline-info" size="sm" onClick={() => setModalShowRadio(true)} block>Chọn ảnh</Button>
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
                            <Card.Title>Thông tin sản phẩm </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3" controlId="formSku">
                                <Form.Label>Mã sản phẩm:</Form.Label>
                                <Form.Control type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Enter...." />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formRegularPrice">
                                <Form.Label>Giá sản phẩm: VNĐ</Form.Label>
                                <Form.Control type="number" value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} min="0" placeholder="Enter...." />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formSalePrice">
                                <Form.Label>Giá Khuyễn mãi: VNĐ</Form.Label>
                                <Form.Control type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} min="0" placeholder="Enter...." />
                            </Form.Group>
                            <Form.Group controlId="formStartTime">
                                <Form.Label>Thời gian bắt đầu</Form.Label>
                                <Form.Control type="datetime-local" onChange={(e) => setStartTime(e.target.value)} defaultValue={startTime} size="sm" />
                            </Form.Group>
                            <Form.Group controlId="formEndTime">
                                <Form.Label>Thời gian kết thúc</Form.Label>
                                <Form.Control type="datetime-local" onChange={(e) => setEndTime(e.target.value)} defaultValue={endTime} size="sm" />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Form>
    )
}