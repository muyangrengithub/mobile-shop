import React from 'react'

import { Button,Modal } from 'react-bootstrap'

const MyModal = ({title,body,handleClose,handleDone})=>{
   

   
    return(
        <Modal show={1} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            关闭
          </Button>
          <Button variant="primary" onClick={handleDone}>
            确认
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default  MyModal