import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        course: "",
        year: "",
        college: "",
        message: ""
    });

    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            // Use the actual local backend endpoint
            const apiUrl = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");

            await axios.post(`${apiUrl}/register`, formData);

            setStatus({ loading: false, success: true, error: null });
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                course: "",
                year: "",
                college: "",
                message: ""
            });
        } catch (error) {
            console.error(error);
            setStatus({
                loading: false,
                success: false,
                error: "Registration failed. Please try again or contact us directly."
            });
        }
    };

    return (
        <div className="register-page section-padding bg-light">
            <div className="container">
                <div className="register-wrapper card">
                    <div className="register-header text-center">
                        <h2>Student Registration</h2>
                        <p>Take the first step towards your IT career.</p>
                    </div>

                    {status.success ? (
                        <div className="register-success text-center">
                            <div className="success-icon">✓</div>
                            <h3>Registration Successful!</h3>
                            <p>Thank you for registering with Perseverance Institute. We will contact you shortly.</p>
                            <button onClick={() => window.location.href = '/'} className="btn-primary" style={{ marginTop: '20px' }}>
                                Return to Home
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="register-form">
                            {status.error && <div className="register-error">{status.error}</div>}

                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name *</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 9876543210"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="course">Course Interested *</label>
                                    <select
                                        id="course"
                                        name="course"
                                        required
                                        value={formData.course}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select a course</option>
                                        <option value="DevOps">DevOps</option>
                                        <option value="Cloud Computing">Cloud Computing</option>
                                        <option value="Python">Python Programming</option>
                                        <option value="Java">Java Programming</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="year">Year of Study</label>
                                    <input
                                        type="text"
                                        id="year"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        placeholder="e.g. 3rd Year / Graduated"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="college">College Name</label>
                                    <input
                                        type="text"
                                        id="college"
                                        name="college"
                                        value={formData.college}
                                        onChange={handleChange}
                                        placeholder="Your University"
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="message">Message (Optional)</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Any specific requirements or questions?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary register-submit"
                                disabled={status.loading}
                            >
                                {status.loading ? "Submitting..." : "Submit Registration"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
