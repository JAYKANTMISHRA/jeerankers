import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import { ModeContext } from '../contexts/ModeContext';
import ProfileDropdown from './profile/ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-family: CrimsonText;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const LogoText = styled.h1`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 32px;
  font-weight: 900;
  color: ${({ dark }) => (dark ? '#FFA500' : '#1D7AFC')};
  margin-left: 100px;
  cursor: pointer;
  letter-spacing: 2px;
  transition: transform 0.3s ease-in-out, color 0.3s;

  &:hover {
    transform: scale(1.05);
    color: ${({ dark }) => (dark ? '#ffcc70' : '#0056b3')};
  }

  @media (max-width: 768px) {
    margin-left: 20px;
    font-size: 24px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 100px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-right: 0;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

const NavItem = styled.li`
  margin: 0 15px;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #1D7AFC;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    font-size: 24px;
  }
`;

const LoginButton = styled(Link)`
  background: ${({ mode }) => (mode
    ? 'linear-gradient(to right, #fdc830, #f37335)'
    : 'radial-gradient(circle farthest-corner at 10% 20%, rgba(162,102,246,1) 0%, rgba(203,159,249,1) 90%)')};
  color: #fff;
  padding: 10px 20px;
  border-radius: 40px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${({ mode }) => (mode
      ? 'linear-gradient(to right, #f37335, #fdc830)'
      : 'radial-gradient(circle farthest-corner at 10% 20%, rgba(171,102,255,1) 0%, rgba(116,182,247,1) 90%)')};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    right: 20px;
    top: 20px;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: ${({ isOpen }) => (isOpen ? 'transparent' : 'white')};
  margin: 4px 0;
  transition: 0.4s;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);
  const { darkMode, setDarkMode } = useContext(ModeContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <h1
  onClick={() => navigate('/')}
  className={`ml-24 cursor-pointer font-extrabold tracking-wide transition-transform duration-300 text-3xl md:text-2xl hover:scale-105 
    ${darkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-blue-600 hover:text-blue-800'}`}
>
  JEE RANKERS
</h1>

      <Hamburger onClick={toggleMenu}>
        <Bar isOpen={isOpen} />
        <Bar isOpen={isOpen} />
        <Bar isOpen={isOpen} />
      </Hamburger>
      <NavContainer>
        <div onClick={() => setDarkMode(prevMode => !prevMode)} style={{ marginRight: '20px' }}>
          {darkMode ? (
            <FontAwesomeIcon icon={faToggleOn} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faToggleOff} size="2x" />
          )}
        </div>
        <NavList isOpen={isOpen}>
          <NavItem onClick={() => navigate('/')}>Home</NavItem>
          <NavItem onClick={() => navigate('/practice')}>Practice</NavItem>
          <NavItem onClick={() => navigate('/compete')}>Compete</NavItem>
          {!userData ? (
            <NavItem>
              <LoginButton mode={darkMode} to="/login">Login</LoginButton>
            </NavItem>
          ) : (
            <ProfileDropdown />
          )}
        </NavList>
      </NavContainer>
    </NavbarContainer>
  );
};

export default Navbar;
