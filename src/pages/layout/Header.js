import { Navbar } from 'react-bootstrap'
import { FaBars} from 'react-icons/fa'
export default function Header(props) {
    return (
        <Navbar>
            <button className="btn" onClick={props.toggle}>
                <FaBars className="icon-bars"/>
            </button>
        </Navbar>
    )
}