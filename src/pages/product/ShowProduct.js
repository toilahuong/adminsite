import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, FormControl, Image, Pagination, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { SERVER, SITE_NAME } from "../../config";
import { useQuery, delay, removeTags } from "../../func";
import { addSelect, removeSelect } from "../../redux/slices/select";
import EmptyImage from '../../assets/images/empty.jpg'
import { toast } from "react-toastify";
import { getCategory } from "../../redux/slices/category";
import Showpage from "../../components/Showpage";
import ShowCategory from "../../components/ShowCategory";
import { Link } from "react-router-dom";
const settings = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
moment.locale('vi');
export default function ShowPost() {
    const query = useQuery();
    const history = useHistory()
    const page = query.get("page")
    const name = query.get("name")
    const [data, setData] = useState();
    const [count, setCount] = useState();
    const [limit, setLimit] = useState(query.get("limit"));
    const [status, setStatus] = useState(query.get("status"));
    const [category, setCategory] = useState(query.get("category"));
    const [dataIds, setDataIds] = useState();
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const select = useSelector((state) => state.select);
    const dispatch = useDispatch();
    const typingTimeoutRef = useRef(null);
    const getData = useCallback(async () => {
        try {
            document.title = `Tất cả sản phẩm - ${SITE_NAME}`
            const response = await axios.get(`${SERVER}/product`,
                {
                    params: {
                        limit: limit || 25,
                        name: name || '',
                        status: status,
                        category: category || null,
                        page: page || 1
                    }
                });
            setData(response.data.rows);
            setCount(response.data.count);
            setDataIds(() => response.data.rows.map(item => item.id));
        } catch (error) {
            console.log(error)
        }
    }, [limit, name, status, page, category])
    useEffect(() => {
        getData();
    }, [getData])
    const handleRemoveProducts = async () => {
        try {
            setSelectAll(false);
            await Promise.all(select.map(async (id) => {
                if (status !== "trash") await axios.put(`${SERVER}/product/${id}/trast`, {}, { withCredentials: true })
                else await axios.delete(`${SERVER}/product/${id}`, { withCredentials: true })
                const actionRemove = removeSelect([id]);
                dispatch(actionRemove);
            }))
            getData()
            toast.success(status !== "trash" ? "Đã bỏ vào thùng rác" : "Đã xóa thành công", settings)
        } catch (err) {
            toast.error("Đã xảy ra lỗi", settings)
        }
    }
    const handleRemoveProduct = async (id) => {
        try {


            if (status !== "trash") await axios.put(`${SERVER}/product/${id}/trast`, {}, { withCredentials: true })
            else await axios.delete(`${SERVER}/product/${id}`, { withCredentials: true })
            setData((curr) => curr.filter(item => item.id !== id));
            const actionRemove = removeSelect([id]);
            dispatch(actionRemove);
            toast.success(status !== "trash" ? "Đã bỏ vào thùng rác" : "Đã xóa thành công", settings)
        } catch (err) {
            console.log(err);
            toast.success("Đã xảy ra lỗi", settings)
        }
    }
    const handleRestoreProducts = async () => {
        try {
            setSelectAll(false);
            await Promise.all(select.map(async (id) => {
                await axios.put(`${SERVER}/product/${id}/restore`, {}, { withCredentials: true })
                const actionRemove = removeSelect([id]);
                dispatch(actionRemove);
            }))
            getData()
            toast.success("Đã khôi phục thành công", settings)
        } catch (err) {
            toast.error("Đã xảy ra lỗi", settings)
        }
    }
    const handleRestoreProduct = async (id) => {
        try {


            await axios.put(`${SERVER}/Product/${id}/restore`,{}, { withCredentials: true })
            setData((curr) => curr.filter(item => item.id !== id));
            const actionRemove = removeSelect([id]);
            dispatch(actionRemove);
            toast.success("Đã khôi phục thành công", settings)
        } catch (err) {
            console.log(err);
            toast.success("Đã xảy ra lỗi", settings)
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
    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            query.set("title", e.target.value)
            history.push({ search: query.toString() })
        }, 500)
    }
    function handleLimitChange(e) {
        setLimit(e.target.value);
        query.set("limit", e.target.value)
        history.push({ search: query.toString() })
    }
    function handleStatusChange(e) {
        setStatus(e.target.value);
        query.set("status", e.target.value)
        history.push({ search: query.toString() })
    }
    function handleCategoryChange(e) {
        setCategory(e.target.value);
        query.set("category", e.target.value)
        history.push({ search: query.toString() })
    }
    return (
        <Card>
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="m-0">Danh sách bài viết</h5>
                    <ul className="d-flex" style={{ margin: '0', listStyle: 'none' }}>
                        {status === "trash" ? <li className="mr-2"><Button variant="primary" onClick={handleRestoreProducts}>Khôi phục</Button></li> : undefined}
                        <li className="mr-2"><Button variant="danger" onClick={handleRemoveProducts}>{status === "trash" ? "Xóa đã chọn" : "Bỏ vào thùng rác"}</Button></li>
                        <li className="mr-2">
                            <FormControl as="select" onChange={handleStatusChange} value={status || ""}>
                                <option value="">Trạng thái</option>
                                <option value="public">Công khai</option>
                                <option value="draft">Nháp</option>
                                <option value="trash">Thùng rác</option>
                            </FormControl>
                        </li>

                        <li className="mr-2">
                            <FormControl as="select" onChange={handleLimitChange} value={limit || ""}>
                                <option value="">Hiển thị</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </FormControl>
                        </li>
                        <li className="mr-2">
                            <FormControl as="select" onChange={handleCategoryChange} value={category || ""}>
                                <option value="">Chọn chuyên mục</option>
                                <SelectCategories />
                            </FormControl>
                        </li>
                        <li>
                            <FormControl type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Tìm kiếm..." />
                        </li>
                    </ul>
                </div>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover className="list">
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}><input type="checkbox" checked={selectAll} onChange={handleChangeSelectAll} /></th>
                            <th style={{ width: '10%' }}>Avatar</th>
                            <th style={{ width: '20%' }}>Tiêu đề</th>
                            <th style={{ width: '20%' }}>Nội dung</th>
                            <th style={{ width: '20%' }}>Chuyên mục</th>
                            <th style={{ width: '10%' }}>Tác giả</th>
                            <th style={{ width: '15%' }}>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => <Showitem key={index} remove={handleRemoveProduct} restore={handleRestoreProduct} item={item} />)}
                    </tbody>
                </Table>
                <Pagination>
                    <Showpage count={parseInt(count)} limit={parseInt(limit)} page={parseInt(page)} />
                </Pagination>
            </Card.Body>
        </Card>

    )
}
function Showitem(props) {
    const { item, remove,restore } = props;
    const query = useQuery();
    const status = query.get("status");
    const [postDate] = useState(new Date(item.post_date));
    const [timeNow] = useState(new Date());
    const [pendingRemove, setPendingRemove] = useState(false);
    const [pendingRestore, setPendingRestore] = useState(false);
    const select = useSelector((state) => state.select);
    const dispatch = useDispatch();
    const handleChange = () => {
        if (select.includes(item.id)) {
            const actionRemove = removeSelect([item.id]);
            dispatch(actionRemove)
        } else {
            const actionAdd = addSelect([item.id]);
            dispatch(actionAdd)
        }
    }
    const handleRemove = async () => {
        setPendingRemove(true)
        await delay(1000);
        await remove(item.id)
        setPendingRemove(false)
    }
    const handleRestore = async () => {
        setPendingRestore(true)
        await delay(1000);
        await restore(item.id)
        setPendingRestore(false)
    }
    return (
        <tr className={select.includes(item.id) ? 'select' : undefined}>
            <td><input type="checkbox" checked={select.includes(item.id)} onChange={handleChange} /></td>
            <td><Image src={item.thumb ? item.thumb.thumbnail : EmptyImage} fluid /></td>
            <td style={{ fontWeight: "500" }} >
                <Link style={{ fontSize: "14px" }} to={"/" + item.id + "/edit"}>
                    {item.name}
                    {item.status === "draft" ? <span style={{ color: "rgb(127 111 111)" }}> (Nháp)</span> : ""}
                    {postDate > timeNow ? <span style={{ color: "rgb(127 111 111)" }}> ({moment(postDate).fromNow()})</span> : ''}
                </Link>
                <div className="table-action">
                    <Link to={"/" + item.id + "/edit"}> Chỉnh sửa </Link>|
                    {status === "trash" ? <><button onClick={handleRestore} disabled={pendingRestore} className="restore"> {pendingRestore ? "Đang xử lý..." : "Phục hồi"} </button>|</> : undefined}
                    <button onClick={handleRemove} disabled={pendingRemove} className="draft"> {pendingRemove ? "Đang xử lý..." : status === "trash" ? "Xóa" : "Thùng rác"} </button>
                </div>
            </td>
            <td>{removeTags(item.details)}</td>
            <td>{item.categories && item.categories.map((cat, index) => <ShowCategory key={index} item={cat} idx={index} />)}</td>
            <td>{item.user.full_name}</td>
            <td>
                {postDate > timeNow ? 'Chưa xuất bản' : 'Đã xuất bản'} <br />
                {moment(postDate).format('DD/MM/YYYY, h:mm a')}
            </td>
        </tr>
    )
}

function SelectCategories() {
    const dispatch = useDispatch();
    const category = useSelector((state) => {
        const current = state.category.current;
        if (current) {
            return current.filter((cat) => cat.category_type === "product");
        } else {
            return current;
        }
    });
    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch])
    return category.map((item, index) =>
        <option key={index} value={item.id}>{item.name}</option>
    )
}