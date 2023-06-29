import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import { toast } from 'react-toastify';
import { putApdateUser } from '../../../services/apiService';
import _ from 'lodash';
const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, resetUpdateData } = props
    const handleClose = () => {
        setShow(false);
        setEmail('');
        setUsername('')
        setRole('USER');
        setImage('');
        setPreviewImage('');
        resetUpdateData();
    }
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [previewImage, setPreviewImage] = useState('')
    const [image, setImage] = useState("")

    useEffect(() => {

        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role);
            setImage('');
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64, ${dataUpdate.image}`);
            }
        }
    }, [dataUpdate])

    const hendleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const HandSubmitCreateUser = async () => {
        // validate
        const isValidateEmail = validateEmail(email)
        if (!isValidateEmail) {
            toast.error('Invalid Email')
            return;
        }

        //submit data
        const data = await putApdateUser(dataUpdate.id, username, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await props.fetchListUsers();
            // await props.fetchListUsers();
            // props.setcurrentpage(1)
            await props.fetchListWitPagehUsers(props.currentpage)
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
                size="xl"
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email"
                                disabled
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                disabled
                                className="form-control"
                                value={password}
                                onChange={(event) => setpassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)
                            }
                                value={role}>
                                <option defaultValue="USER">USER</option>
                                <option defaultValue="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label lable-upload" htmlFor='lableUpload'>
                                <FcPlus />
                                Load file Image
                                <input
                                    type='file'
                                    id="lableUpload" hidden
                                    onChange={(event) => hendleUpLoadImage(event)}
                                ></input>
                            </label>
                        </div>
                        <div className='col-md-12 img-preview'>
                            {
                                previewImage ?
                                    <img src={previewImage}></img>
                                    : <span>Preview Imgae</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => HandSubmitCreateUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateUser