import { useNavigate } from 'react-router-dom'
import './Register.scss'
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { useState } from 'react'
import { toast } from 'react-toastify';
import { postRegister } from "../../services/apiService"
import BGregister from '../../assets/BGregister.webp'
import Language from '../Headers/Language';
import { useTranslation, Trans } from 'react-i18next';
const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    const handleLogin = () => {
        navigate("/login");
    }
    const [isshowPassword, setIsshowPassword] = useState(false)

    const handleRegister = async () => {
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
        //summitAPI
        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }
        if (data && data.EC !== 0) {

            toast.error(data.EM)
        }
    }
    // chuyển ngôn ngữ
    const { t } = useTranslation();
    const MultilineTranslation = ({ text }) => {
        const items = text.split('\n')
        return (
            <>
                {items.map(item => <p>{item}</p>)}
            </>
        )
    }
    return (
        <div className='group-register'>
            <div className='content-register'>
                <h1 className='title-h1'> {t('register.title2')}
                </h1>
                <img src={BGregister}></img>
                <div className='title-h3'>&copy;Typeform</div>
            </div>
            <div className="register-container">
                <div className="header">
                    <span>{t('register.title1')}</span>
                    <button onClick={() => handleLogin()}>{t('register.login')}</button>
                    <Language />
                </div>
                <div className="title mx-auto col-4" >
                    Phuccoder2000
                </div>
                <div className="welcome mx-auto ">
                {t('register.title3')}
                </div>
                <div className="content-form mx-auto col-4">
                    <div className='form-group '>
                        <label>Email</label>
                        <input
                            type={"email"}
                            className='form-control'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group pass-group'>
                        <label> {t('register.password')}</label>
                        <input
                            type={isshowPassword ? "text" : "password"}
                            className='form-control'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {isshowPassword ?
                            <span
                                className='icons-eye'
                                onClick={() => setIsshowPassword(false)}>
                                <VscEye />
                            </span>
                            : <span
                                className='icons-eye'
                                onClick={() => setIsshowPassword(true)}>
                                <VscEyeClosed />
                            </span>
                        }
                    </div>
                    <div className='form-group '>
                        <label>{t('register.username')}</label>
                        <input
                            type={"username"}
                            className='form-control'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <span className='forgot-password'>{t('register.forgotpassword')}</span>
                    <div>
                        <button className='btn-summit' onClick={() => handleRegister()}>
                        {t('register.button1')}
                        </button>
                    </div>
                    <div className=' text-center'>
                        <span className='back' onClick={() => { navigate('/') }}> &#60;&#60; {t('register.title4')} </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register