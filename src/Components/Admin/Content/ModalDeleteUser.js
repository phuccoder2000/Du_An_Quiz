// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from "../../../services/apiService"
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);
    const HandleSummitDeleteUser = async () => {
        const data = await deleteUser(dataDelete.id)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await props.fetchListUsers();
            props.setcurrentpage(1)
            await props.fetchListWitPagehUsers(1)
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
                <Modal.Body>Are you sure to delete this user:  email = <b>
                    {dataDelete && dataDelete.email ? dataDelete.email : ""}
                </b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CanCel
                    </Button>
                    <Button variant="primary" onClick={() => HandleSummitDeleteUser()}>
                        Confrim
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser