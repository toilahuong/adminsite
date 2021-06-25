import { Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { removeSelectCheckbox, setSelectCheckbox } from "../../redux/slices/file";

export default function CheckboxShowFile(props) {
    const {item} = props;
    const selectCheckbox = useSelector((state) => state.file.selectCheckbox);
    const dispatch = useDispatch();
    const handleChange = () => {
        if(selectCheckbox.indexOf(item.id) > -1) {
            const actionRemoveSelectCheckbox = removeSelectCheckbox([parseInt(item.id)]);
            dispatch(actionRemoveSelectCheckbox);
        } else {
            const actionSetSelectCheckbox = setSelectCheckbox([parseInt(item.id)]);
            dispatch(actionSetSelectCheckbox);
        } 
      }
    return (
        <Col xs={6} sm={4} md={3} lg={2}>
            <div className="item" onClick={e => e.stopPropagation()}>
                <label htmlFor={"thumbnail"+item.id} className="d-block">
                    <div className="thumbnail">
                        <img loading="lazy" src={item.medium} alt={item.name} />
                    </div>
                    <div className="item-input">
                        <input type="checkbox" value={item.id} checked={selectCheckbox.includes(item.id)} onChange={handleChange} name="thumbnail" id={"thumbnail"+item.id} />
                        <span className="checkmark"></span>
                    </div>
                </label>
            </div>
            
        </Col>
    )
}
