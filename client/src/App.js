import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MainPage from './components/compete/MainPage';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContributorForm from './forms/ContributorForm';
import Login from './components/loginSignup/Login'
import UserContextProvider from "./contexts/UserContextProvider";
import Table from "./components/PracticePage";
import CompeteContextProvider from "./components/compete/CompeteContext";
import ContestForm from "./components/compete/ContestForm";
import QuestionPage from "./components/compete/QuestionPage";
import Question from "./components/practice_sec/Question";
import { useContext } from 'react';
import { ModeContext } from './contexts/ModeContext';
import FeedbackPage from "./components/FeedBack";
import ProblemList from "./components/profile/ProblemList";
import UserProfile from "./components/profile/UserProfile";
import Friends from "./components/profile/Friends";
import Settings from "./components/profile/Settings";
import { TimerProvider } from './components/compete/AnswerContext';
import styled from 'styled-components';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const PageContent = styled.div`
  flex: 1;
`;

function App() {
  const { darkMode } = useContext(ModeContext);

  return (
    <LayoutWrapper className={`${darkMode ? 'App' : 'changed-App'}`}>
      <TimerProvider>
        <UserContextProvider>
          <CompeteContextProvider>
            <BrowserRouter>
              <Navbar />
              <PageContent>
                <Routes>
                  <Route path="/" Component={Home} />
                  <Route path="/login" Component={Login} />
                  <Route path="/addProblem" Component={ContributorForm} />
                  <Route path="/practice" Component={Table} />
                  <Route path="/contest-form" Component={ContestForm} />
                  <Route path="/compete" Component={MainPage} />
                  <Route path="/contest/:cid/" Component={QuestionPage} />
                  <Route path="/Problem/:statement/" Component={Question} />
                  <Route path="/feedback" Component={FeedbackPage} />
                  <Route path="/myList" Component={ProblemList} />
                  <Route path="/submissions" Component={ProblemList} />
                  <Route path="/user/:profile" Component={UserProfile} />
                  <Route path="/friends" Component={Friends} />
                  <Route path="/settings" Component={Settings} />
                </Routes>
              </PageContent>
              <Footer />
              <ToastContainer />
            </BrowserRouter>
          </CompeteContextProvider>
        </UserContextProvider>
      </TimerProvider>
    </LayoutWrapper>
  );
}

export default App;
