import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/UserAction';
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';
import Profile from './Profile';
import { useState } from 'react';



const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  }
  const handleRegister = () => {
    navigate("/register")
  }

  const [isShowModalProfile, setIsShowModalProfile] = useState(false)

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  const dispatch = useDispatch();
  // console.log(">>> check account:", account)

  const handelLogOut = async () => {
    let res = await logout(account.email, account.refresh_token)
    if (res && res.EC === 0) {
      //clear data redux
      dispatch(doLogout());
      navigate('/login')
    } else {
      toast.error(res.EM)
    }
  }
  // chuyển ngôn ngữ
  const { t } = useTranslation();
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="#home">Phucdeptrai</Navbar.Brand> */}
          <NavLink to="/" className='navbar-brand'> Phuccoder</NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className='nav-link'>{t('header.home')}</NavLink>
              <NavLink to="/users" className='nav-link'> {t('header.users')}</NavLink>
              <NavLink to="/admins" className='nav-link'> {t('header.admins')}</NavLink>
              {/* <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="users">Users</Nav.Link>
          <Nav.Link href="admins">Admin</Nav.Link> */}
            </Nav>
            <Nav>
              {isAuthenticated === false ?
                <>
                  <button className='btn-login' onClick={() => handleLogin()}>{t('header.login')}</button>
                  <button className='btn-signup' onClick={() => handleRegister()}>{t('header.signup')}</button>
                </>
                :
                <NavDropdown title={t('header.settings.setting')} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => setIsShowModalProfile(true)}>{t('header.settings.profile')}</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handelLogOut()}>{t('header.settings.logout')}</NavDropdown.Item>
                </NavDropdown>}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile
        show={isShowModalProfile}
        setShow={setIsShowModalProfile}
      />
    </>
  );
}
export default Header;