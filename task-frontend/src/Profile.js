import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profile</h1>
                <p className="profile-subtitle">Manage your account information</p>
            </div>

            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-avatar-section">
                        <img 
                            src="https://ui-avatars.com/api/?name=Demo+User&background=38bdf8&color=fff&size=120" 
                            alt="Profile" 
                            className="profile-avatar-large"
                        />
                        <button className="btn btn-primary">Change Avatar</button>
                    </div>

                    <div className="profile-info-section">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-input" defaultValue="Demo User" />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-input" defaultValue="demo@taskpro.com" />
                        </div>

                        <div className="form-group">
                            <label>Role</label>
                            <input type="text" className="form-input" defaultValue="Product Manager" />
                        </div>

                        <div className="form-group">
                            <label>Bio</label>
                            <textarea className="form-textarea" rows="4" defaultValue="Passionate about productivity and task management." />
                        </div>

                        <button className="btn btn-primary">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;