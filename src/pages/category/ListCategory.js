import axios from "axios";
import HTMLReactParser from "html-react-parser";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SERVER } from "../../config";
import { delay } from "../../func";
import { getCategory } from "../../redux/slices/category";
import { addSelect, removeSelect } from "../../redux/slices/select";
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
export default function ListCategory(props) {
    const {type} = props;
    const [selectAll, setSelectAll] = useState(false);
    const [dataIds, setDataIds] = useState([]);
    const select = useSelector((state) => state.select);
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
        (async() =>{
            const response = await axios.get(`${SERVER}/category/all`,{params: {category_type: type}});
            const ids = response.data.rows.map((item) => item.id);
            setDataIds(ids);
         })()
    },[type])
    const handleRemoveItem = async (id) => {
        try {
            const response = await axios.delete(`${SERVER}/category/${id}`, {withCredentials: true});
            console.log(response);
            dispatch(getCategory());
            toast.success("Đã xóa thành công", settings)
        } catch (err) {
            console.log(err);
            toast.error("Đã có lỗi xảy ra", settings)
        }
    }
    const handleRemoveItems = async () => {
        try {
            setSelectAll(false);
            await Promise.all(select.map(async (id) => {
                await axios.delete(`${SERVER}/category/${id}`, {withCredentials: true});
                const actionRemove = removeSelect([id]);
                dispatch(actionRemove);
            }))
            dispatch(getCategory());
        } catch (err) {
            console.log(err);
        }
    }
    const handleChangeSelectAll = () => {
        if (selectAll) {
            const actionRemoves = removeSelect(dataIds);
            dispatch(actionRemoves);
        } else {
            const ids = dataIds.filter((id) => !select.includes(id))
            const actionAdd = addSelect(ids);
            dispatch(actionAdd);
        }
        setSelectAll(!selectAll);
    }
    const handleSetDefault = async (id) => {
        try {
            const response = await axios.put(`${SERVER}/category/${id}/${type}`,{}, {withCredentials: true});
            console.log(response);
            dispatch(getCategory());
            toast.success("Cập nhật thành công", settings)
        } catch (err) {
            console.log(err);
            toast.error("Đã có lỗi xảy ra", settings)
        }
    }
    return (
        <div className="category-list">
            <Card>
                <Card.Header><div className="d-flex justify-content-between"><span>Chuyên mục: {type.toUpperCase()}</span> <Button variant="danger" size="sm" onClick={handleRemoveItems}>Xóa đã chọn</Button></div></Card.Header>
                <Card.Body>
                    <Table striped bordered hover className="list">
                        <thead>
                            <tr>
                                <th style={{width: '8%'}}><input type="checkbox" checked={selectAll} onChange={handleChangeSelectAll}/></th>
                                <th style={{width: '30%'}}>Tên chuyên mục</th>
                                <th style={{width: '42%'}}>Mô tả</th>
                                <th style={{width: '20%'}}>Đường dẫn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && HTMLReactParser(String(trTreeCategory(data,select,'')),{
                                replace: ({ attribs }) => {
                                    if (attribs && attribs.rmid) {
                                        return <ButtonRemove handleRemove={handleRemoveItem} id={attribs.rmid}/>;
                                    }
                                    if (attribs && attribs.type === 'checkbox') {
                                        return <SelectList id={parseInt(attribs.value)}/>;
                                    }
                                    if (attribs && attribs.sdid) {
                                        return <ButtonSetDefault handleSetDefault={handleSetDefault} id={attribs.sdid}/>;
                                    }
                                }
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        </div>
    );
}
const  trTreeCategory = (categories,select,char) => {
    let html = ``;
    categories.forEach((item) => {
        html+= `<tr class="${select.includes(item.id) ? 'select' : undefined}"><td><input type="checkbox" value="${item.id}"/></td><td style="font-weight: 500"><a href="/category/${item.id}/edit" style="font-size: 14px;">${char} ${item.name}</a>${item.default ? " (Mặc định)" : ''}<div class="table-action"><a href="/category/${item.id}/edit"> Chỉnh sửa </a>${!item.default ? `|<button sdid="${item.id}"> Mặc định </button>|<button rmid="${item.id}"> Xóa </button>` : ''}</div></td><td>${item.description}</td><td>${item.slug}</td></tr>`
        html += item.childrens ? trTreeCategory(item.childrens,select, char + '—') : '';
    });
    return html;
}
function SelectList(props) {
    const {id} = props;
    const select = useSelector((state) => state.select);
    const dispatch = useDispatch();
    const handleChange = () => {
        if (select.includes(id)) {
            const actionRemove = removeSelect([id]);
            dispatch(actionRemove)
        } else {
            const actionAdd = addSelect([id]);
            dispatch(actionAdd)
        }
    }
    return <input type="checkbox" checked={select.includes(id)} onChange={handleChange} />
}
function ButtonRemove(props) {
    const {handleRemove,id} = props;
    const [removing,setRemoving] = useState(false);
    const remove = async () =>  {
        setRemoving(true);
        await delay(1000);
        handleRemove(parseInt(id))
        setRemoving(false);
    }
    return <button className="draft" size="sm" disabled={removing} onClick={remove}>{removing ? "Đang xóa..." : "Xóa"}</button>
}
function ButtonSetDefault(props) {
    const {handleSetDefault,id} = props;
    const [pending,setPending] = useState(false);
    const setDefault = async () =>  {
        setPending(true);
        await delay(1000);
        handleSetDefault(parseInt(id))
        setPending(false);
    }
    return <button className="default" size="sm" disabled={pending} onClick={setDefault}>{pending ? "Đang xử lý..." : "Mặc định"}</button>
}