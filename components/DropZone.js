import React from "react";
import Dropzone from "react-dropzone";

const DropZone = props => {
  const description = props.isNew ? "Create Image" : "Change Image";
  return (
    <div>
      <Dropzone onDrop={props.onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div
              {...getRootProps()}
              style={{
                height: "100%",
                width: 300,
                borderColor: "#f44336",
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: 8,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                cursor: "pointer"
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop files here...</p> : <p>{description}</p>}
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
};

export default DropZone;
