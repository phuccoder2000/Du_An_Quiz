import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaUserTie } from 'react-icons/fa'
import _, { } from 'lodash';
// import { ListGroup } from 'react-bootstrap';

const ModalViewUser = (props) => {
    const { show, setShow, dataUpdate, resetUpdateData } = props
    const handleClose = () => {
        setID('')
        setShow(false);
        setEmail('');
        setUsername('')
        setRole('USER');
        setImage('');
        setPreviewImage('');
        resetUpdateData();
    }

    const [id, setID] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [previewImage, setPreviewImage] = useState('')
    const [image, setImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setID(dataUpdate.id)
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role);
            setImage('');
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64, ${dataUpdate.image}`);
                // setPreviewImage(`data:image/jpeg;base64,) ${dataUpdate.username}`)
                // setUsername()

            }
        }
    }, [dataUpdate])
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title> <FaUserTie color='blue' /> <span />View A Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span type="id">{id}</span>
                                    </td>
                                    <td>
                                        <span type="email">{email}</span>
                                    </td>
                                    <td>
                                        <span type="password">******</span>
                                    </td>
                                    <td>
                                        <span type="username">{username}</span>
                                    </td>
                                    <td>
                                        <span type="role">{role}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-12 img-preview'>
                        {previewImage ? <img src={previewImage} alt='Preview Image' /> : <span>Preview Image</span>}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalViewUser