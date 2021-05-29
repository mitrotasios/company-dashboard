import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons'

const DropZone = (props) => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [validFiles, setValidFiles] = useState([]);

    useEffect(() => {
        let filteredArray = selectedFiles.reduce((file, current) => {
            const x = file.find(item => item.name === current.name);
            if (!x) {
                return file.concat([current]);
            } else {
                return file;
            }
        }, []);
        setValidFiles([...filteredArray]);
    
    }, [selectedFiles]);

    const handleFiles = (files) => {
        for(let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('File type not permitted');
            }
        }
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const dragOver = (e) => {
        e.preventDefault();
    }
    
    const dragEnter = (e) => {
        e.preventDefault();
    }
    
    const dragLeave = (e) => {
        e.preventDefault();
    }
    
    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const validateFile = (file) => {
        const validType = "text/csv"
        if (file.type != validType) {
            return false;
        }
        return true;
    }

    const uploadModalRef = useRef();
    const uploadRef = useRef();
    const progressRef = useRef();

    const uploadFiles = () => {
        uploadModalRef.current.style.display = 'block';
        uploadRef.current.innerHTML = 'File(s) Uploading...';
        for (let i = 0; i < validFiles.length; i++) {
            const formData = new FormData();
            formData.append('file', validFiles[i]);
            //formData.append('key', 'add your API key here');
            fetch('/api/listings', {
                method: 'POST',
                body: formData
              })
              .then(response => {
                  if (response.ok) {
                    return response;
                  } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                  }
                }, error => {
                    throw error;
                  }
              )
              .then(response => response.json())
              .then(response => console.log(response[200]))
              .catch(error => { console.log('User', error.message); alert("Upload was not possible")});
        }
    }

    const getRequest = () => {
        fetch('/api/listings')
              .then(response => {
                  if (response.ok) {
                    return response;
                  } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                  }
                }, error => {
                    throw error;
                  }
              )
              .then(response => response.json())
              .then(response => alert(JSON.stringify(response)))
              .catch(error => { console.log('User', error.message); alert("GET was not possible")});
    }

    const deleteRequest = () => {
        fetch('/api/listings', {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                return response;
                } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
                }
            }, error => {
                throw error;
                }
            )
            .then(response => response.json())
            .then(response => alert(JSON.stringify(response)))
            .catch(error => { console.log('User', error.message); alert("GET was not possible")});
    }

    const closeUploadModal = () => {
        uploadModalRef.current.style.display = 'none';
    }

    const removeFile = (name) => {
        const validFileIndex = validFiles.findIndex(e => e.name === name);
        validFiles.splice(validFileIndex, 1);
        setValidFiles([...validFiles]);
        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);
        setSelectedFiles([...selectedFiles]);
    }

    const fileInputRef = useRef();

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    return (
        <>
            <div className="container">
                {/* <div>
                    {JSON.stringify(props.data)}
                </div> */}
                <div className="drop-container"
                        onClick={fileInputClicked}
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={fileDrop}>
                    <div className="drop-message">

                        <FontAwesomeIcon icon={faUpload} color="#3e8bd6" size='lg'/>
                        <div>Drag & Drop files here or click to upload</div>
                    </div>
                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                </div>
                <div className="file-display-container">
                    {
                        validFiles.map((data, i) => 
                            <div className="file-status-bar" key={i}>
                                <div>
                                    <div className="file-type-logo"></div>
                                    <div className="file-type">{fileType(data.name)}</div>
                                    <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                                    <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                                </div>
                                <div className="file-remove" onClick={() => removeFile(data.name)}><FontAwesomeIcon icon={faTimes} color="red" size='1x'/></div>
                            </div>
                        )
                    }
                </div>
                <button className="file-upload-btn" onClick={() => uploadFiles()}>Upload Files</button>
                <button className="file-upload-btn" onClick={() => getRequest()}>GET REQ</button>
                <button className="file-upload-btn" onClick={() => deleteRequest()}>DELETE REQ</button>
            </div>
            <div>{JSON.stringify(props.data)}</div>
            <div className="upload-modal" ref={uploadModalRef}>
                <div className="overlay"></div>
                <div className="close" onClick={(() => closeUploadModal())}>X</div>
                <div className="progress-container">
                    <span ref={uploadRef}></span>
                    <div className="progress">
                        <div className="progress-bar" ref={progressRef}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DropZone;