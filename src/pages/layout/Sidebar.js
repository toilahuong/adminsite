import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard, AiOutlineArrowRight, AiOutlineFolderOpen, AiOutlineRead, AiOutlineShoppingCart} from 'react-icons/ai'
import Logo  from "../../assets/images/logo.png"
export default function Sidebar(props) {
    const location = useLocation();
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src={Logo} alt="Tôi là Hướng" width="150"/>
                <button className="btn" onClick={props.toggle}><AiOutlineArrowRight /></button>
            </div>
            <Nav as="ul">
                <Nav.Item as="li" className={/dashboard/i.test(location.pathname) ? "active" : ""}>
                    <Link to="/dashboard"> <span className="icon"><AiFillDashboard /></span> Dashboard</Link>
                </Nav.Item>
                <Nav.Item as="li" className={/posts/i.test(location.pathname) ? "active" : ""}>
                    <Link to="/posts"> <span className="icon"><AiOutlineRead /></span> Bài viết</Link>
                </Nav.Item>
                <Nav.Item as="li" className={/san-pham/i.test(location.pathname) ? "active" : ""}>
                    <Link to="/san-pham"> <span className="icon"><AiOutlineShoppingCart /></span> Sản phẩm</Link>
                </Nav.Item>
                <Nav.Item as="li" className={/upload/i.test(location.pathname) ? "active" : ""}>
                    <Link to="/upload"> <span className="icon"><AiOutlineFolderOpen /></span> Upload</Link>
                </Nav.Item>
            </Nav>      
            
        </div>
    )
}