import React, { useCallback, useEffect, useMemo, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import SingleUploadFile from './SingleUploadFile';
import '../../assets/scss/uploadFile.scss';
import axios from 'axios';
import { SERVER, SITE_NAME } from '../../config';
import ShowFile from './ShowFile';
import { Row } from 'react-bootstrap';
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    cursor: 'cell',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
export default function Upload() {
    const [files, setFiles] = useState([]);
    const [data,setData] = useState([]);
    const onDrop = useCallback((accFiles) => {
      const mappedAcc = accFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      setFiles((curr) => [...curr, ...mappedAcc]);
    }, []);
    useEffect(() => {
      document.title = `Upload Files - ${SITE_NAME}`;
        (async() => {
            const response = await axios.get(`${SERVER}/library`);
            setData(response.data);
        })()
    },[])
    const {getRootProps, getInputProps,isDragActive,isDragAccept,isDragReject} = useDropzone({
        accept: 'image/*',
        onDrop: onDrop
    });
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    return (
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
            <div className="uploadFile">
                {files.map((file,index) => <SingleUploadFile key={index} file={file} onLoaded={setData}/>)}
            </div>
            <div className="listFile">
                <Row>
                    {data.map((item,index) => <ShowFile key={index} item={item} remove={setData}/>)}
                </Row>
            </div>
        </div>
    )
}
