import React from 'react';
import { Link } from 'react-router-dom';
import 'izitoast/dist/css/iziToast.css';

const Navbar = () => {
    return (
        <React.Fragment>
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo" to="/">
                        <h3>AB Email scraper</h3>
                    </Link>
                    <Link className="navbar-brand" to="/">
                        <h3 className="px-3 my-auto">AB Email Scraper</h3>
                    </Link>
                </div>
                
            </nav>
        </React.Fragment>
    );
};

export default Navbar;
