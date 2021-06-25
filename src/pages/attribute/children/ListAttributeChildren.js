import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAttribute } from "../../../redux/slices/attribute";
import { addSelect, removeSelect } from "../../../redux/slices/select";
import { delay } from "../../../func";
import axios from "axios";
import { SERVER } from "../../../config";
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
export default function ListAttributeChildren(props) {
    const { id } = props;
    const [selectAll,setSelectAll] = useState(false);
    const select = useSelector((state) => state.select);
    const attribute = useSelector((state) => state.attribute.current.filter(attr => attr.parent_id === parseInt(id)));
    const [parent, setParent] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAttribute());
    }, [dispatch])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${SERVER}/attribute-parent/${id}`);
                setParent(response.data);
            } catch (err) {
                window.location = '/attributes';
            }
            
        })()
    }, [id])
    const handleChangeSelectAll = () => {
        if(selectAll) {
            const actionRemoves = removeSelect(select);
            dispatch(actionRemoves);
        } else {
            const actionAdd = addSelect(attribute.map(attr => attr.id));
            dispatch(actionAdd);
        }
        setSelectAll(!selectAll);
    }
    const handleRemove = async (id) => {
        try {
            await axios.delete(`${SERVER}/attribute/${id}`,{withCredentials: true});
            const actionRemove = removeSelect([id]);
            dispatch(actionRemove);
            dispatch(getAttribute());
        } catch (err) {
            toast.error("Đã có lỗi xảy ra", settings)
        }
    }
    const handleRemoves = async () => {
        try {
            await Promise.all(select.map((id) => axios.delete(`${SERVER}/attribute/${id}`,{withCredentials: true})));
            console.log("hello");
            const actionRemove = removeSelect(select);
            dispatch(actionRemove);
            dispatch(getAttribute());
            setSelectAll(false);
        } catch (err) {
            toast.error("Đã có lỗi xảy ra", settings)
        }
    }
    return (
        <Card>
            <Card.Header><div className="d-flex justify-content-between"><span><a href="/attributes">Thuộc tính</a> {">"} {parent && parent.name} </span> <Button variant="danger" size="sm" onClick={handleRemoves}>Xóa đã chọn</Button></div></Card.Header>
            <Card.Body>
                <Table striped bordered hover className="list">
                    <thead>
                        <tr>
                            <th style={{ width: '8%' }}><input type="checkbox" checked={selectAll} onChange={handleChangeSelectAll}/></th>
                            <th style={{ width: '40%' }}>Tên thuộc tính</th>
                            <th style={{ width: '52%' }}>Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attribute ? attribute.map((attr, index) => <Showitem key={index} data={attr} remove={handleRemove}/>): undefined}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}
function Showitem(props) {
    const { data,remove } = props;
    const select = useSelector((state) => state.select);
    const [pendingRemove, setPendingRemove] = useState(false);
    const dispatch = useDispatch();
    const handleChange = () => {
        if (select.includes(data.id)) {
            const actionRemove = removeSelect([data.id]);
            dispatch(actionRemove)
        } else {
            const actionAdd = addSelect([data.id]);
            dispatch(actionAdd)
        }
    }
    const handleRemove = async () => {
        setPendingRemove(true);
        await delay(1000);
        remove(data.id);
        setPendingRemove(false);
    }
    return (
        <tr>
            <td><input type="checkbox" checked={select.includes(data.id)} onChange={handleChange} /></td>
            <td>
            <b><a href={"/attributes/"+data.id+"/children/edit"}>{data.name}</a></b>
                <div className="table-action">
                    <a href={"/attributes/"+data.id+"/children/edit"}> Chỉnh sửa </a>|
                    <button onClick={handleRemove} disabled={pendingRemove} className="draft"> {pendingRemove ? "Đang xử lý..." : "Xóa"} </button>
                </div>
            </td>
            <td>{data.value}</td>
        </tr>
    )

}