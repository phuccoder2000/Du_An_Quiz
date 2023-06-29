// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizForAdmin } from '../../../../services/apiService';
import { toast } from 'react-toastify';


const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete,fetchQuiz  } = props;

    const handleClose = () => setShow(false);
    const HandleSummitDeleteQuiz = async () => {
        const data = await deleteQuizForAdmin(dataDelete.id)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await props.fetchListUsers();
            fetchQuiz();
            
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the user ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user:  id = <b>
                    {dataDelete && dataDelete.id ? dataDelete.id : ""}
                </b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CanCel
                    </Button>
                    <Button variant="primary" onClick={() => HandleSummitDeleteQuiz()}>
                        Confrim
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz