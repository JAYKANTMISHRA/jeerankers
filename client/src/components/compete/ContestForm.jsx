import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie'; // You were missing this
import { CompeteContext } from './CompeteContext'; // Adjust path if needed
import './ContestForm.css'; // Assuming this file exists and is in the same folder

const ContestForm = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(null); // null = checking

    useEffect(() => {
          
        const storedData = Cookies.get('userData');
        console.log("Stored User Data:", storedData);
        if (!storedData) {
            navigate('/login');
        } else {
            try {
                const parsed = JSON.parse(storedData);
                if (!parsed._id) {
                    navigate('/login');
                } else {
                    setAuthenticated(true);
                }
            } catch (err) {
                navigate('/login');
            }
        }
    }, [navigate]);

    const { handleChange, formmData } = useContext(CompeteContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...formmData };
        data.startTime = new Date(data.startTime).toISOString();

        try {
            const userData = Cookies.get('userData');
              const token = userData ? JSON.parse(userData).token : null;
               
              // Throw error if no token found
              if (!token) {
                console.error("Token not found in userData cookie");
                return;
              }
            await axios.post("http://localhost:5000/api/v1/createContest", data,{
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
            navigate(-1); // Go back on success
        } catch (error) {
            console.error("Error creating contest:", error);
            alert("Failed to create contest. Please try again.");
        }
    };

    return (
        <div className='cont'>
            <form className="contributor-form" onSubmit={handleSubmit}>
                {/* Contest Name */}
                <div className="form-group">
                    <label htmlFor="contestName" className="form-label">Contest Name:</label>
                    <div className='come_center'>
                        <textarea
                            id="contestName"
                            name="contestName"
                            value={formmData.contestName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Writers */}
                <div className="form-group">
                    <label htmlFor="writers" className="form-label">Writers:</label>
                    <div className='come_center'>
                        <textarea
                            id="writers"
                            name="writers"
                            value={formmData.writers}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Start Time */}
                <div className="form-group">
                    <label htmlFor="startTime" className="form-label">Start Date & Time:</label>
                    <div className='come_center'>
                        <input
                            type="datetime-local"
                            id="startTime"
                            name="startTime"
                            value={formmData.startTime}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Duration */}
                <div className="form-group">
                    <label htmlFor="duration" className="form-label">Duration (in Minutes):</label>
                    <div className='come_center'>
                        <textarea
                            id="duration"
                            name="duration"
                            value={formmData.duration}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Questions Preview */}
                {formmData.questions && formmData.questions.map((question, index) => (
                    <div key={index} className="question">
                        <p>{question[1]}</p>
                    </div>
                ))}

                {/* Add Questions and Submit */}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate("/addProblem")}
                >
                    <h1>+</h1> Add Question
                </button>

                <button type="submit" className="btn btn-primary">Create Contest</button>
            </form>
        </div>
    );
};

export default ContestForm;
