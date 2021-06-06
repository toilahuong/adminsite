import { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { AiFillDashboard, AiOutlineArrowLeft, AiOutlineFolderOpen, AiOutlineRead, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiCircle } from 'react-icons/bi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { IoNewspaperOutline } from 'react-icons/io5'
import { useLocation } from 'react-router-dom';
import Logo from "../../assets/images/logo.png"
const dataMenu = [
    {
        label: "Dashboard",
        url: `/dashboard`,
        icon: AiFillDashboard,
    },
    {
        label: "Bài viết",
        url: `/posts`,
        icon: AiOutlineRead,
        childrens: [
            {
                label: "Tất cả bài viết",
                url: `/posts`,
                icon: BiCircle,
            },
            {
                label: "Viết bài mới",
                url: `/posts/create`,
                icon: BiCircle,
            },
            {
                label: "Chuyên mục",
                url: `/category/post`,
                icon: BiCircle,
            }
        ]
    },
    {
        label: "Trang",
        url: `/pages`,
        icon: IoNewspaperOutline,
        childrens: [
            {
                label: "Tất cả trang",
                url: `/pages`,
                icon: BiCircle,
            },
            {
                label: "Thêm trang mới",
                url: `/pages/create`,
                icon: BiCircle,
            }
        ]
    },
    {
        label: "Sản phẩm",
        url: `/products`,
        icon: AiOutlineShoppingCart,
        childrens: [
            {
                label: "Tất cả sản phẩm",
                url: `/products`,
                icon: BiCircle,
            },
            {
                label: "Sản phẩm mới",
                url: `/products/create`,
                icon: BiCircle,
            },
            {
                label: "Chuyên mục",
                url: `/category/product`,
                icon: BiCircle,
            }
        ]
    },
    {
        label: "Upload Files",
        url: `/upload`,
        icon: AiOutlineFolderOpen,
    },
]

export default function Sidebar(props) {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src={Logo} alt="Tôi là Hướng" width="150" />
                <button className="btn" onClick={props.toggle}><AiOutlineArrowLeft /></button>
            </div>
            <ul className="sidebar-menu">
                <SidebarMenu menu={dataMenu}/>
            </ul>
        </div >
    )
}
function SidebarMenu(props) {
    const {menu} = props;
    return menu.map((item,index) => <MenuItem key={index} item={item}/>) 
}
function MenuItem(props) {
    const {item} = props;
    const [open, setOpen] = useState(false);
    const [match, setMatch] = useState(false);
    const location = useLocation();
    const reg  = (value) => new RegExp(`^(${value}|${value}/)$`,'ig');
    useEffect(() => {
        if(item.childrens) {
            const find = item.childrens.filter((it) => reg(it.url).test(location.pathname));
            if(find.length) setOpen(true);
        }
        setMatch(reg(item.url).test(location.pathname));
    },[item.url,location.pathname,item.childrens])
    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open)
    }
    return (
            <li className={item.childrens ? "has-children" : ""}>
                <a href={item.url} className={match ? "current" : ""}>
                    <item.icon />
                    {item.label}
                    {item.childrens ? <span onClick={handleClick}><HiOutlineChevronDown /></span> : ""}
                </a>
                {item.childrens ? 
                    <Collapse in={open}>
                        <ul>
                            <SidebarMenu menu={item.childrens}/>
                        </ul>
                    </Collapse>
                : ""}
            </li>
    );
}