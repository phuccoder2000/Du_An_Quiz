import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import { toast } from 'react-toastify';
import { putApdateQuiz } from '../../../../services/apiService';
import _ from 'lodash';
const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, fetchQuiz } = props
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState('')


    useEffect(() => {

        if (!_.isEmpty(dataUpdate)) {
            setDescription(dataUpdate.description);
            setName(dataUpdate.name)
            setType(dataUpdate.difficulty);
            setImage('');
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64, ${dataUpdate.image}`);
            }
        }
    }, [props.dataUpdate])

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('')
        setType('USER');
        setImage('');
        setPreviewImage("")
        setPreviewImage('');
        props.resetUpdateData()
    }
    const handleShow = () => setShow(true);
    const hendleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }
    const HandSubmitUpdateQuiz = async () => {

        //submit data
        const data = await putApdateQuiz(dataUpdate.id, name, dataUpdate.difficulty, description, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            fetchQuiz()
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
                    <Modal.Title>Update a Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="email"

                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text"

                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select className="form-select" onChange={(event) => setType(event.target.value)
                            }
                                value={type}>
                                <option defaultValue="EASY">EASY</option>
                                <option defaultValue="MEDIUM">MEDIUM</option>
                                <option defaultValue="HARD">HARD</option>
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
                    <Button variant="primary" onClick={() => HandSubmitUpdateQuiz()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateQuiz



