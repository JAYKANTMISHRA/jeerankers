import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../PracticePage.css';
import { ModeContext } from '../../contexts/ModeContext';

const ProblemList = () => {
  const { darkMode } = useContext(ModeContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Utility to get the right text based on path
  const getTextFromPath = () => {
    const path = location.pathname;
    if (path.includes('/myList')) return 'getList';
    if (path.includes('/submissions')) return 'getSubmissions';
    return 'getProblems'; // default
  };

  const [text, setText] = useState(location.state?.text || getTextFromPath());
  const [data, setData] = useState([]);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [arr, setArr] = useState([]);

  // Set body theme
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  // React to URL/path changes
  useEffect(() => {
    setText(location.state?.text || getTextFromPath());
  }, [location.pathname, location.state]);

  // Fetch problems and solved status
  useEffect(() => {
    const storedData = getUserData();
    if (storedData) {
      setIsAuthenticate(true);
      fetchData(storedData._id);
      resolveStatus(storedData._id);
    } else {
      setIsAuthenticate(false);
      setArr([]);
      setData([]);
    }
  }, [text]);

  const getUserData = () => {
    try {
      return JSON.parse(Cookies.get('userData'));
    } catch {
      return null;
    }
  };

  const fetchData = async (userId) => {
    try {
      const userData = Cookies.get('userData');
        const token = userData ? JSON.parse(userData).token : null;
         
        // Throw error if no token found
        if (!token) {
          console.error("Token not found in userData cookie");
          return;
        }
      const res = await axios.get(
        `http://localhost:5000/api/v1/${text}?userId=${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
      );
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const resolveStatus = async (userId) => {
    try {
      const userData = Cookies.get('userData');
        const token = userData ? JSON.parse(userData).token : null;
         
        // Throw error if no token found
        if (!token) {
          console.error("Token not found in userData cookie");
          return;
        }
      const res = await axios.get(
        `http://localhost:5000/api/v1/getSolvedProblem?userId=${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
      );
      setArr(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePath = (item) => {
    if (isAuthenticate && item) {
      navigate(`/Problem/${encodeURIComponent(item.statement)}`, {
        state: { item },
      });
    } else {
      navigate('/login', { state: { returnPath: '/practice' } });
    }
  };

  return (
    <div>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th className="styled-th">Number</th>
              <th className="styled-th">Title</th>
              <th className="styled-th">Difficulty</th>
              <th className="styled-th">Status</th>
              {/* <th className="styled-th">Solution</th> */}
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => item && item.statement)
              .map((item, index) => (
                <tr className="table-row" key={item._id || index}>
                  <td className="styled-td">
                    {index + 1}
                  </td>
                  <td className="styled-td">
                    <p className="ques_statement" onClick={() => handlePath(item)}>
                      {item.statement}
                    </p>
                  </td>
                  <td className="styled-td">{item.tags?.[0] || '--'}</td>
                  <td className="styled-td">
                    {arr.includes(item._id) ? 'Solved' : 'Todo'}
                  </td>
                  {/* <td className="styled-td">
                    {item.solution ? item.solution : <p>--</p>}
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemList;
