import React from 'react';
import { Link } from 'react-router-dom';
import 'izitoast/dist/css/iziToast.css';

const Navbar = () => {
    return (
        <React.Fragment>
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo" to="/">
                        <h3>Scrap Me</h3>
                    </Link>
                    <Link className="navbar-brand brand-logo-mini" to="/">
                        <img src={process.env.PUBLIC_URL + '/assets/images/logo-mini.svg'} alt="logo" />
                    </Link>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-stretch">
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item ">
                            {/* eslint-disable-next-line */}
                            <a className="nav-link" href="https://github.com/arifszn/scrapme" target="_blank">
                                <i className="mdi mdi-github-circle"></i>
                            </a>
                        </li>
                        <li className="nav-item full-screen-link">
                            {/* eslint-disable-next-line */}
                            <a className="nav-link">
                                <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
                            </a>
                        </li>
                        <li className="nav-item ">
                            {/* eslint-disable-next-line */}
                            <a className="nav-link" href="#">
                                <i className="mdi mdi-format-line-spacing"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;