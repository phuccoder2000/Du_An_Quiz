import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setselectedQuiz] = useState({})
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setselectedUser] = useState({})
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz);
        }
        // console.log("check res:",res )
    };
    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username}-${item.email}`
                }
            })
            setListUser(users);
        }
        // console.log("check res:",res )
    };
    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
      
        }else{
            toast.error(res.EM)
        }
    }
    return (
        <div className="assign-quiz-container row">

            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz</label>
                <Select
                    value={selectedQuiz}
                    onChange={setselectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select User</label>
                <Select
                    value={selectedUser}
                    onChange={setselectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button className='btn btn-warning mt-3'
                    onClick={() => handleAssign()}
                >Assign</button>
            </div>
        </div>
    )
}
export default AssignQuiz