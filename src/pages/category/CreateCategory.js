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
export default function CreateCategory(props) {
    const {type} = props;
    const [thumbnail, setThumbnail] = useState(null);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState(0);
    const [description, setDescription] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const file = useSelector((state) => state.file);
    const data = useSelector((state) => {
        const current = state.category.current;
        if(current) {
            return current.filter((cat) => cat.category_type === type);
        } else {
            return current;
        }
    });
    const dispatch = useDispatch();
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
            console.log(newData);
            const response = await axios.post(`${SERVER}/category`,newData,{withCredentials: true});
            dispatch(getCategory());
            setThumbnail(null);
            setName('');
            setDescription('');
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
            <div className="category-create">
                <Card>
                    <Card.Header>
                        <Card.Title>Tạo chuyên mục </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="Form.ControlName">
                                <Form.Label>Tên chuyên mục</Form.Label>
                                <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter..." />
                            </Form.Group>
                            <Form.Group controlId="Form.ControlParent">
                                <Form.Label>Chuyên mục mẹ</Form.Label>
                                <Form.Control as="select" size="5" onChange={(e) => setParentId(e.target.value)}>
                                    <option value="0">Chuyên mục mẹ</option>
                                    {data && HTMLReactParser(String(optionTreeCategory(data,'')))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="Form.ControlDescription">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlThumbail">
                                <Form.Label>Ảnh đại diện</Form.Label>
                                <Button variant="outline-info" size="sm" onClick={() => setModalShow(true)} block>Chọn ảnh</Button>
                                {thumbnail !== null ? <ImagesSelected item={thumbnail} remove={handleRemove} /> : ''}
                            </Form.Group>
                            <ModalUpload
                                show={modalShow}
                                type="radio"
                                size="fullscreen"
                                onHide={() => setModalShow(false)}
                            />
                            <Form.Group>
                                <Button type="submit" variant="primary" size="sm">Tạo chuyên mục</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
    )
}
function optionTreeCategory(categories, char) {
    let html = ``;
    categories.forEach((item) => {
        html+= `<option value=${item.id}>${char} ${item.name}</option>`;
        html += item.childrens ? optionTreeCategory(item.childrens, char + '—') : '';

    })
    return html;
}
