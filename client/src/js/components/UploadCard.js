import React, { useState } from 'react';
import {DropzoneDialog} from 'material-ui-dropzone';
import { Button } from '@material-ui/core';

export default function UoloadCard (props) {
  const [open, setOpen] = useState();

  return (
    <>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpen(true)}
      >
        Upload Images
      </Button>
      <DropzoneDialog
        acceptedFiles={['image/jpeg', 'image/png']}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={async (files) => {
          await props.uploadHandler(files);
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </>
  )

}