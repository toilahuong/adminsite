import { Col } from "react-bootstrap"
import { useSelector } from "react-redux";

export default function RadioShowFile(props) {
    const {item} = props;
    const selectRadio = useSelector((state) => state.file.selectRadio);
    return (
        <Col xs={6} sm={4} md={3} lg={2}>
            <div className="item" onClick={e => e.stopPropagation()}>
                <label htmlFor={"thumbnail"+item.id} className="d-block">
                    <div className="thumbnail">
                        <img loading="lazy" src={item.medium} alt={item.name} />
                    </div>
                    <div className="item-input">
                        <input type="radio" value={item.id} defaultChecked={selectRadio === item.id} name="thumbnail" id={"thumbnail"+item.id} />
                        <span className="checkmark"></span>
                    </div>
                </label>
            </div>
            
        </Col>
    )
}
