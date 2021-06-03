import React, { useState, useEffect, useRef } from 'react';
import './FileUpload.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Skeleton from '@yisheng90/react-loading';


const FileUpload = (props) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [isUploaded, setIsUploaded] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFiles = (files) => {
        var csvFiles = []
        for(let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                csvFiles.push(files[i])
            } else {
                setErrorMessage('File type not permitted');
                setIsUploaded(false)
                return
            }
        }
        uploadFiles(csvFiles)
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

    const uploadFiles = (files) => {
        setIsUploading(true)
        setIsUploaded(null)
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
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
              .then(response => {
                setIsUploading(false)
                if (response.error != null) {
                    setErrorMessage(response.error);     
                    setIsUploaded(false)
                       
                }
                else {
                    setIsUploaded(true)
                }
              })
              .catch(error => { 
                    console.log('User', error.message); 
                    setErrorMessage("Upload failed. Please try again.");
                    setIsUploading(false);
                    setIsUploaded(false);
                });
        }
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
        <div className="col">
            <div className="row"> 
                <div className="col">
                    <div className="row mt-5">
                        <div className="drop-container"
                                onClick={fileInputClicked}
                                onDragOver={dragOver}
                                onDragEnter={dragEnter}
                                onDragLeave={dragLeave}
                                onDrop={fileDrop}>
                            <div className="drop-message">
                                <div>Drop your file(s) here <b>or</b> click to browse computer</div>
                                <div style={{"fontSize":"medium"}} className="mt-3">Max. File Size 200mb</div>
                            </div>
                            <input
                                ref={fileInputRef}
                                className="file-input"
                                type="file"
                                multiple
                                onChange={filesSelected}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isUploading ? (<div className="row mt-5"><Skeleton width="100%"/></div>) : null}
            <div className="row mt-3">
                {isUploaded!=null ? (isUploaded==true ? (
                    <div className="col success-msg">
                        <div className="row h-100 justify-content-center">
                            <div className="col-2 my-auto" align="center">
                                <div className="success-msg-icon-wrapper">
                                    <div className="row h-100 text-center">
                                        <div className="my-auto">
                                            <FontAwesomeIcon icon={faCheck} size='lg'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 my-auto">
                                <span style={{"fontSize":"large", "color":"white", "fontWeight":"500"}}>Your files are successfully uploaded</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col error-msg">
                        <div className="row h-100 justify-content-center">
                            <div className="col-2 my-auto" align="center">
                                <div className="err-msg-icon-wrapper">
                                    <div className="row h-100 text-center">
                                        <div className="my-auto">
                                            <FontAwesomeIcon icon={faTimes} size='lg' color={"#FF2929"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 my-auto">
                                <span style={{"fontSize":"large", "color":"white", "fontWeight":"500"}}>{errorMessage}</span>
                            </div>
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
        </>
    )
}
export default FileUpload;