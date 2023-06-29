import { useState } from 'react'
import './Admin.scss'
import SideBar from "./Sidebar"
import { FaBars } from 'react-icons/fa'
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'


import 'react-toastify/dist/ReactToastify.css';
import Language from '../Headers/Language';
import { NavDropdown } from 'react-bootstrap';
import ProfileAdmin from './Content/Profile/ProfileAdmin';

const Admin = (props) => {
    const [collapsed, setcollapsed] = useState(false);
    const [isShowModalProfileAdmin, setIsShowModalProfileAdmin] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className='admin-header'>
                    <span onClick={() => setcollapsed(!collapsed)} >
                        <FaBars className='leftside' />
                    </span>
                    <div className='rightside'>
                        <Language />
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setIsShowModalProfileAdmin(true)}>Profile</NavDropdown.Item>
                            <NavDropdown.Item >Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className='admin-main'>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                    <ProfileAdmin
                    show={isShowModalProfileAdmin}
                    setShow={setIsShowModalProfileAdmin}
                />
                </div>


            </div>
        </div>
    )
}
export default Admin