import { Button, Image } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";

export default function ImagesSelected(props) {
    const { item, remove } = props;
    return (
        <div className="thumbnail-selected">
            <Image className="mt-2" src={item.medium} fluid />
            <Button variant="default" onClick={() => remove(item.id)}><AiFillCloseCircle /></Button>
        </div>
    )
}