
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import { getAllUsers, getUserWithPaginat } from "../../../services/apiService"
import ModalUpdateUser from "./ModalApdateUser"
import ModalCreateUser from "./ModalCreateUser"
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser'
import TableUserPageinate from './TableUserPageinate'

const ManageUser = (props) => {
    const LIMIT_USER = 3;
    const [showModalCreateUser, setshowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setshowModalUpdateUser] = useState(false);
    const [showModalViewUser, setshowModalViewUser] = useState(false)
    const [showModalDeleteUser, setshowModalDeleteUser] = useState(false)
    const [pageCount, setpageCount] = useState(0)
    const [dataUpdate, setDataUpdate] = useState({})
    const [listUser, setListUser] = useState([])
    const [currentpage, setcurrentpage] = useState(1)
    const [dataDelete, setDataDelete] = useState({})

    useEffect(() => {
        // fetchListUsers()
        fetchListWitPagehUsers(1)
    }, [])

    
    const fetchListUsers = async () => {

        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const fetchListWitPagehUsers = async (page) => {

        let res = await getUserWithPaginat(page, LIMIT_USER)
        if (res.EC === 0) {

            setListUser(res.DT.users);
            setpageCount(res.DT.totalPages)
        }
    }
    const handleClickBtnUpdate = (user) => {
        setshowModalUpdateUser(true);
        setDataUpdate(user)
    }
    const handleClickBtnView = (user) => {
        setshowModalViewUser(true);
        setDataUpdate(user)
    }
    const handleClickBtnDelete = (user) => {
        setshowModalDeleteUser(true);
        setDataDelete(user)
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }
    // const pageCount =() =>{

    // }
    return (
        <div className="manage-user-container">
            <div className="title">
                manage user
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setshowModalCreateUser(true)}>
                        <FcPlus />
                        Add new users

                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPageinate listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListWitPagehUsers={fetchListWitPagehUsers}
                        pageCount={pageCount}
                        currentpage={currentpage}
                        setcurrentpage={setcurrentpage} />
                </div>

                <ModalCreateUser show={showModalCreateUser}
                    setShow={setshowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListWitPagehUsers={fetchListWitPagehUsers}
                    currentpage={currentpage}
                    setcurrentpage={setcurrentpage}
                />

                <ModalUpdateUser show={showModalUpdateUser}
                    setShow={setshowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListWitPagehUsers={fetchListWitPagehUsers}
                    currentpage={currentpage}
                    setcurrentpage={setcurrentpage}
                />

                <ModalViewUser show={showModalViewUser}
                    setShow={setshowModalViewUser}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}

                />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setshowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListWitPagehUsers={fetchListWitPagehUsers}
                    currentpage={currentpage}
                    setcurrentpage={setcurrentpage}
                />
            </div>
        </div>
    )
}
export default ManageUser