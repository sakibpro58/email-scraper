import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <React.Fragment>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item nav-profile">
                        <a href="https://arifszn.github.io/" target="_blank" rel="noopener noreferrer" className="nav-link">
                            <div className="nav-profile-image">
                                <img src={process.env.PUBLIC_URL + '/assets/images/faces/face1.jpg'} alt="profile" />
                                <span className="login-status online"></span>
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                                <span className="font-weight-bold mb-2">Ariful Alam</span>
                            </div>
                            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <span className="menu-title">Dashboard</span>
                            <i className="mdi mdi-home menu-icon"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
};

export default Sidebar;