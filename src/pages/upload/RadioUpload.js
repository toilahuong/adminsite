import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import SingleUploadFile from './SingleUploadFile';
import '../../assets/scss/uploadFile.scss';
import {  SITE_NAME } from '../../config';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getFile, setSelectRadio } from '../../redux/slices/file';
import RadioShowFile from './RadioShowFile';
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
export default function RadioUpload(props) {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(0);
  const loader = useRef(null);
  const data = useSelector((state) => state.file);
  const dispatch = useDispatch();
  const onDrop = useCallback((accFiles) => {
    const mappedAcc = accFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles((curr) => [...curr, ...mappedAcc]);
  }, []);
  useEffect(() => {
    document.title = `Upload Files - ${SITE_NAME}`;
  },[])
  useEffect(() => {
    dispatch(getFile({limit: 18, page: page}))
  }, [dispatch,page])
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
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
  const handleObserver = useCallback((entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page+1);
    }
  },[])
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }

  }, [handleObserver]);
  const handleChange = (e) => {
    const actionSelecRadio = setSelectRadio(parseInt(e.target.value));
    dispatch(actionSelecRadio);
    props.onHide();
  }
  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
      <div className="uploadFile">
        {files.map((file, index) => <SingleUploadFile key={index} file={file} />)}
      </div>
      <div className="listFile" onChange={handleChange}>
        <Row>
          {data.current.map((item, index) => <RadioShowFile key={index} item={item} />)}
        </Row>
      </div>
      <div className="loading" ref={loader}>
        <h2>Load More</h2>
      </div>
    </div>
  )
}
