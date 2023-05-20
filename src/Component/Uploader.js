import {React, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from 'react-icons/fi';

function Uploader() {
  const [file, setFile] = useState(null);

  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    maxSize:100000,
    onDrop:(acceptedFiles) => {
      setFile(acceptedFiles[0]);
      alert(acceptedFiles[0].name);
    }
  });

  return (
    <div className='w-full text-center'>
      <div
        {...getRootProps()}
        className='px-6 pt-5 pb-12 border-2 border-border border-dashed bg-main  rounded-md cursor-pointer'
      >
        <input {...getInputProps()} />
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="mx-auto"
            style={{ maxHeight: "300px" }}
          />
        ) : (
          <span className="m-auto flex justify-center items-center  text-subMain text-3xl">
            <FiUploadCloud />
          </span>
        )}
        <p className='text-sm mt-2'>Drag your image here</p>
        <em className='text-xs text-border'>
          (only .jpg and .png files will be accepted)
        </em>
      </div>
    </div>
  );
}




export default Uploader


