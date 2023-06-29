import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/UserAction';
import { ImSpinner3 } from 'react-icons/im'
import Language from '../Headers/Language';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = () => {
        navigate("/register")
    }

    const handleLogin = async () => {
        // validate
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }
        const isValidateEmail = validateEmail(email)
        if (!isValidateEmail) {
            toast.error('Invalid Email')
            return;
        }
        if (!password) {
            toast.error('Invalid Password')

            return;
        }
        setIsLoading(true)
        //summitAPI
        let data = await postLogin(email, password)

        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false)
            navigate('/')
        }
        if (data && data.EC !== 0) {

            toast.error(data.EM)
            setIsLoading(false)
        }

    }
    const dandleKeyDown = (event) => {
        // console.log("event key:" ,event)
        if(event && event.key === "Enter"){
            handleLogin()
        }

    }
    // chuyển ngôn ngữ
    const { t } = useTranslation();
    return (
        <div className="login-container">
            <div className="header">
                <span className='title-containerHD'>{t('login.title1')}</span>
                <button onClick={() => handleRegister()}>{t('login.signup')}</button>
                <Language />
            </div>
            <div className="title mx-auto col-4" >
                Phuccoder2000
            </div>
            <div className="welcome mx-auto col-4">
            {t('login.title2')}
            </div>
            <div className="content-form mx-auto col-4">
                <div className='form-group '>
                    <label>Email</label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group '>
                    <label> {t('login.password')}</label>
                    <input
                        type={"password"}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} 
                        onKeyDown={(event) => dandleKeyDown(event)}
                        />
                </div>
                <span className='forgot-password'>{t('login.forgotpassword')}</span>
                <div>
                    <button
                        className='btn-summit'
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >
                        {isLoading === true &&
                            <ImSpinner3 className="loaderIcon" />}
                        <span>{t('login.login')}</span>
                    </button>
                </div>
                <div className=' text-center'>
                    <span className='back' onClick={() => { navigate('/') }}> &#60;&#60; {t('login.title3')}</span>
                </div>

            </div>
        </div>
    )
}
export default Login