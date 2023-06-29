import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _, { create } from 'lodash'
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    getQuizWithQA,
    postUpsertQA
} from "../../../../services/apiService";
import { toast } from 'react-toastify';



const QuizQA = () => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                }

            ]
        }
    ]
    const [questions, setQuestions] = useState(initQuestion)
    const [isPreviewImage, setisPreviewImage] = useState(false)
    const [dataImagePreview, setdataImagePreview] = useState({
        title: '',
        url: ''
    })
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setselectedQuiz] = useState({})
    // console.log("selectedQuizL:",selectedQuiz)

    useEffect(() => {

        fetchQuiz();
    }, []);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz])

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }


    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            // convert base64 to file object
            let NewQA = []
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile =
                        await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png')
                }
                NewQA.push(q);
            }
            setQuestions(NewQA)
            // console.log('check newQA:', NewQA)
            // console.log('check res:', res)
        }
    }
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
        // console.log("check res:",res )
    };
    // console.log('check list quiz:', listQuiz)
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            };
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone)

        }
        // console.log("check:", type, id)
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };
            let index = questionClone.findIndex(item => item.id === questionId)
            // console.log('index', index)
            questionClone[index].answers.push(newAnswer)
            setQuestions(questionClone)

        }
        if (type === 'REMOVE') {
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers =
                questionClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone)
        }
        // console.log("check:", type, questionId, answerId)
    }

    const handleOnchane = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(questions);

            let index = questionClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionClone[index].description = value
                setQuestions(questionClone)
            }

        }
    }
    const handleOnchanFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name
            setQuestions(questionClone)
        }

    }
    const handelAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId)
        // console.log(type, questionId, answerId, value, index)
        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value
                        }
                        if (type === 'INPUT') {
                            answer.description = value
                        }
                    }
                    return answer;
                })
                
            setQuestions(questionClone)
        }

    }
    const handelSubmitQuestionForQuiz = async () => {

        //todo
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz")
            return;
        }
        // validate answer
        let isValidAnswer = true
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j
                    break;
                }
            }
            indexQ = i
            if (isValidAnswer === false)
                break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} At Question ${indexQ + 1}`)
            return;
        }
        // validate Question
        
        let isValidQ = true
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false;
                indexQ1 = i
                break
            }
        }
        if (isValidQ === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`);
            return
        }
        let questionClone = _.cloneDeep(questions)
        // console.log('questionClone:', questionClone)
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile =
                    await toBase64(questionClone[i].imageFile)
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });
        console.log('>>check questioClone:', questionClone)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizWithQA()
        } else {

        }
        // console.log('check res:', res)
        // toast.success('Create Question answer success')
    
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setdataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName,
            })
            setisPreviewImage(true)
        }
    }
    return (
        <div className="question-container">
            <div className="add-new-questions">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setselectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add question
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-5'>
                                <div className='question-content'>
                                    <div className="form-floating description ">
                                        <input
                                            type="type"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnchane('QUESTION', question.id, event.target.value)}
                                        />
                                        <label >Question {index + 1}'s description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddLine className='lable-upload' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnchanFileQuestion(question.id, event)}
                                            type='file'
                                            hidden>
                                        </input>
                                        <span>

                                            {question.imageName ?
                                                <span style={{ cursor: "pointer" }}
                                                    onClick={() => handlePreviewImage(question.id)}
                                                >{question.imageName}
                                                </span>
                                                :
                                                '0 file is upload'}
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsFillPatchPlusFill className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsPatchMinusFill className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handelAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name ">
                                                    <input type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handelAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label >Answers {index + 1} </label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiFillPlusSquare className='icon-add' />
                                                    </span>
                                                    {
                                                        question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)} >
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handelSubmitQuestionForQuiz()}
                            className='btn btn-warning'>Save Question</button>
                    </div>
                }
                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setisPreviewImage(false)}
                    >
                    </Lightbox>
                }
            </div>


        </div>
    )
}
export default QuizQA


