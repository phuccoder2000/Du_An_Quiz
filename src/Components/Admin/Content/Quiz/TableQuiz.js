import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";


const TableQuiz = (props) => {
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [showModalUpdateQuiz, setshowModalUpdateQuiz] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [listQuiz, setListQuiz] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({})
    

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        setDataUpdate({})
        setDataDelete({});
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
        // console.log("check res:",res )
    };

    const handelDelete = (quiz) => {
        setDataDelete(quiz);
        setIsShowModalDelete(true);
    };
    const handleUpdate = (quiz) => {
        setshowModalUpdateQuiz(true);
        setDataUpdate(quiz)
    }
    const resetUpdateData = () => {
        setDataUpdate({})
    }
    return (
        <>
            <div>List Quizzes</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td style={{ display: "flex", gap: "15px" }}>
                                        <button className="btn btn-warning"
                                            onClick={() => handleUpdate(item)}
                                        >Edit</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handelDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <ModalDeleteQuiz
                show={isShowModalDelete}
                setShow={setIsShowModalDelete}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setshowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchQuiz={fetchQuiz}
                resetUpdateData={resetUpdateData}
            />
        </>
    );
};

export default TableQuiz;
