// import axios from "../Components/utils/axioCustomize";
import axios from "../utils/axioCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return axios.post('api/v1/participant', data)
}
const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}
const putApdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return axios.put('api/v1/participant', data)
}

const deleteUser = (userID) => {
    return axios.delete('api/v1/participant', { data: { id: userID } })
}
const getUserWithPaginat = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

//Login
const postLogin = (userEmail, userPassword,) => {
    return axios.post(`/api/v1/login`,
        { email: userEmail, password: userPassword, delay: 3000 }
    );
}
const postRegister = (userEmail, userPassword, userName) => {
    return axios.post(`/api/v1/register`,
        { email: userEmail, password: userPassword, username: userName }
    );
}
const getQuizBuyUSer = () => {
    return axios.get('/api/v1/quiz-by-participant');
}
const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}
const postSubmitQuiz = (data) => {
    // console.log('copydata',{...data})
    return axios.post(`/api/v1/quiz-submit`, { ...data });
}
const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", quizImage);
    return axios.post('/api/v1/quiz', data)
}
const getAllQuizForAdmin = (id) => {
    return axios.get(`/api/v1/quiz/all`);
}
const deleteQuizForAdmin = (id) => {
    return axios.delete(`/api/v1/quiz/${id}`)
}
const putApdateQuiz = (id, name, difficulty, description, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);
    return axios.put('/api/v1/quiz', data)
}
const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append("quiz_id", quiz_id);
    data.append("description", description);
    data.append("questionImage", image);
    return axios.post('/api/v1/question', data)
}
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {

    return axios.post('/api/v1/answer', {
        description, correct_answer, question_id
    })
}
const postAssignQuiz = (quizId, userId) => {
    return axios.post(`/api/v1/quiz-assign-to-user`,
        { quizId, userId }
    );
}
const getQuizWithQA = (quizId) => {
    return axios.get(`/api/v1/quiz-with-qa/${quizId}`,
    );
}
const postUpsertQA = (data) => {
    return axios.post(`/api/v1/quiz-upsert-qa`, { ...data });
}
const logout = (email, refresh_token) => {
    return axios.post(`/api/v1/logout`,
        { email, refresh_token }
    );
}
const getOverview = () => {
    return axios.get(`/api/v1/overview`);
}
const postUpdateProfile = (username, image) => {
    const data = new FormData();
    data.append("username", username);
    data.append("Image", image);
    return axios.post('/api/v1/profile', data)
}
export {
    postCreateNewUser, getAllUsers, putApdateUser,
    deleteUser, getUserWithPaginat, postLogin, postRegister,
    getQuizBuyUSer, getDataQuiz, postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin, deleteQuizForAdmin, putApdateQuiz,
    postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion, postAssignQuiz, getQuizWithQA, postUpsertQA, logout,getOverview,postUpdateProfile
}