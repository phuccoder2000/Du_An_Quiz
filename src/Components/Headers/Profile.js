import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';


const Profile = (props) => {
    const { show, setShow } = props;
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-profile'
                >
                <Modal.Header closeButton>
                    <Modal.Title>Quản lí thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="UserInformation">
                      
                        </Tab>
                        <Tab eventKey="profile" title="Change Password">
                            Password
                        </Tab>
                        <Tab eventKey="contact" title="History" >
                            History
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Profile;