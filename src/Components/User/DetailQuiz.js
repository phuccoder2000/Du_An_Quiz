import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";


const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation()
    // console.log("useLocation:", location)
    const quizId = params.id;
    const [dataQuiz, setDataquiz] = useState([])
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
    useEffect(() => {
        fetchQuestion();
    }, [quizId])
    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId);
        // console.log("question", res)
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's 
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers)
                        // console.log('item answers', item.answers)
                    })
                    // console.log('value:', value, "key:", key)
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            // console.log(data)
            setDataquiz(data)
        }
    }
    // console.log('check param', params)
    // console.log("check dataquiz:", dataQuiz)

    const handlePrev = () => {
        if (index - 1 < 0) return
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item;
            })
            // console.log(b)
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataquiz(dataQuizClone)
        }
    }
    const handleFinishQuiz = async () => {

        // type Data
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        // console.log("check data before submit", dataQuiz)
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                //todo: userAnswerId
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            // console.log('final payload',payload)
            //submit api
            let res = await postSubmitQuiz(payload)
            // console.log('check res', res)
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setShowModalResult(true);
            } else {
                alert('somthing wrongs...')
            }
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}:  {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckbox={handleCheckbox}
                        data={dataQuiz && dataQuiz.length > 0
                            ? dataQuiz[index] : []
                        }
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary"
                        onClick={() => handlePrev()}
                    >Prev</button>
                    <button className="btn btn-primary"
                        onClick={() => handleNext()}
                    >Next</button>
                    <button className="btn btn-warning"
                        onClick={() => handleFinishQuiz()}
                    >Finish</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}
export default DetailQuiz