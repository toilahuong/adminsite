import axios from "axios";
import { useEffect, useState } from "react"
import { SERVER } from "../../config";
import { ProgressBar } from "react-bootstrap";
import { addFile } from "../../redux/slices/file";
import { useDispatch } from "react-redux";
export default function SingleUploadFile(props) {
    const {file} = props;
    const dispatch = useDispatch();
    const [progress,setProgress] = useState(0);
    const [isActive,setActive] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const data = await uploadFile(file,setProgress)
                const actionAddFile = addFile(data);
                dispatch(actionAddFile);
                setActive(false);
            } catch (err) {
                setActive(false);
            }
            
        })()
    },[dispatch,file])
    return isActive ?
    (
        <div className="item" onClick={(e) => e.stopPropagation()}>
            <div className="thumbnail">
                <img src={file.preview} alt={file.name} />

            </div>
            <div className="body">
                <h4>{file.name}</h4>
                 <ProgressBar animated now={progress} />
            </div>
        </div>
    ) : '';
}
function uploadFile(file,setProgress) {
    return new Promise(async (resolve,reject) => {
        try {
            const formData = new FormData();
            formData.append('upload',file);
            const response = await axios.post(`${SERVER}/library`, formData, {
                withCredentials: true,
                onUploadProgress: progressEvent => {
                    let progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                    setProgress(progress);
                }
            })
            resolve(response.data)
        } catch (error) {
            reject(error)
        }
    })
}