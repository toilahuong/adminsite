import { Navbar } from 'react-bootstrap'
import { FaBars} from 'react-icons/fa'
import { ToastContainer } from "react-toastify";

export default function Header(props) {
    return (
        <div className="header">
            <ToastContainer />
            <Navbar>
                <button className="btn" onClick={props.toggle}>
                    <FaBars className="icon-bars"/>
                </button>
            </Navbar>
        </div>
        
    )
}