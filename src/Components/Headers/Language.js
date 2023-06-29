import NavDropdown from 'react-bootstrap/NavDropdown'
import { useTranslation, Trans } from 'react-i18next';


const Language = (props) => {
    const { t, i18n } = useTranslation();
    const handleChaneLanguage = (language) => {
        i18n.changeLanguage(language)
        console.log(i18n.changeLanguage)
    }
    return (
        <>
            <NavDropdown title={i18n.language === "en" ? "English" : "Việt Nam"} id="basic-nav-dropdown2" className='languages'>
                <NavDropdown.Item onClick={() => handleChaneLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChaneLanguage('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}
export default Language