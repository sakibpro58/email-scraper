import React from 'react';
import Navbar from './layouts/Navbar';
import Sidebar from './layouts/Sidebar';

const Home = (props) => {
    return (
        <React.Fragment>
            <div className="container-scroller">
               <Navbar/>
                <div className="container-fluid page-body-wrapper">
                    <Sidebar/>
                    <div className="main-panel">
                        <div className="content-wrapper">
                            HELLO
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;