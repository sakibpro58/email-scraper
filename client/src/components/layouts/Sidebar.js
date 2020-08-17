import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <React.Fragment>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <span className="menu-title">Home</span>
                            <i className="mdi mdi-home menu-icon"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
};

export default Sidebar;