import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SERVER } from "../../config";
import ModalUpload from "../upload/ModalUpload";
import { removeSelectRadio } from '../../redux/slices/file'
import { getCategory } from "../../redux/slices/category";
import HTMLReactParser from "html-react-parser";
import ImagesSelected from "../../components/ImagesSelected";
import { useParams } from "react-router";
import { toast } from "react-toastify";
const settings = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
export default function EditCategory(props) {
    const { id } = useParams();
    const [type, setType] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState(0);
    const [description, setDescription] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const file = useSelector((state) => state.file);
    const category = useSelector((state) => {
        const current = state.category.current;
        if(current) {
            return current.filter((cat) => cat.category_type === type && cat.id !== parseInt(id));
        } else {
            return current;
        }
    });
    const dispatch = useDispatch();
    useEffect(() => {
        (async() => {
            const response = await axios.get(`${SERVER}/category/${id}`);
            setName(response.data.name);
            setThumbnail(response.data.library)
            setDescription(response.data.description);
            setParentId(response.data.parent_id);
            setType(response.data.category_type)
        })();
    },[id])
    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch])

    useEffect(() => {
        (async () => {
            if (file.selectRadio) {
                const response = await axios.get(`${SERVER}/library/${file.selectRadio}`);
                setThumbnail(response.data);
            }
        })();

    }, [file.selectRadio])
    const handleRemove = () => {
        const actionRemoveSelected = removeSelectRadio();
        dispatch(actionRemoveSelected);
        setThumbnail(null);
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if(!name) throw new Error("Tên chuyên mục không được để trống")
            const newData = {
                name: name,
                description: description,
                category_type: type,
                parent_id: parentId,
                thumbnail: thumbnail ? thumbnail.id : null
            }
            await axios.put(`${SERVER}/category/${id}`,newData,{withCredentials: true});
            dispatch(getCategory());
            toast.success('Cập nhật thành công',settings)
        } catch (err) {
            toast.error('Đã xảy ra lỗi',settings)
        }
    }
    return (
        <Card>
            <Card.Header>
                <Card.Title>Tạo chuyên mục </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="Form.ControlName">
                        <Form.Label>Chỉnh sửa chuyên mục</Form.Label>
                        <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter..." />
                    </Form.Group>
                    <Form.Group controlId="Form.ControlParent">
                        <Form.Label>Chuyên mục mẹ</Form.Label>
                        <Form.Control as="select" size="5" onChange={(e) => setParentId(e.target.value)} value={parentId}>
                            <option value="0">Chuyên mục mẹ</option>
                            {category && HTMLReactParser(String(optionTreeCategory(category, '')))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Form.ControlDescription">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlThumbail">
                        <Form.Label className="d-block">Ảnh đại diện</Form.Label>
                        <Button variant="outline-info" size="sm" onClick={() => setModalShow(true)}>Chọn ảnh</Button>
                        {thumbnail !== null ? <ImagesSelected item={thumbnail} remove={handleRemove} /> : ''}
                    </Form.Group>
                    <ModalUpload
                        show={modalShow}
                        type="radio"
                        size="fullscreen"
                        onHide={() => setModalShow(false)}
                    />
                    <Form.Group>
                        <Button type="submit" variant="primary" size="sm">Cập nhật</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}
function optionTreeCategory(categories, char) {
    let html = ``;
    categories.forEach((item) => {
        html+= `<option value=${item.id}>${char} ${item.name}</option>`;
        html += item.childrens ? optionTreeCategory(item.childrens, char + '—') : '';

    })
    return html;
}
