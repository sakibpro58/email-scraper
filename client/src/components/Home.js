import React, { useState } from 'react';
import Navbar from './layouts/Navbar';
import Helper from './Helper';
import Axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { If } from 'react-if';
import LoadingOverlay from 'react-loading-overlay';
import OptionPopup from './OptionPopup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import BootStrapTooltip from 'react-bootstrap/Tooltip';

const Home = (props) => {
    const [site, setSite] = useState('');
    // eslint-disable-next-line
    const [currentCopiedText, setCurrentCopiedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [openOptionPopup, setOpenOptionPopup] = useState(false);
    const [hideBottomPart, setHideBottomPart] = useState(true);

    const [results, setResults] = useState([]);
    const [options, setOptions] = useState({
        processRootUrlOnly: localStorage.getItem("processRootUrlOnly") === 'true' ? true : false,
        searchStrength: localStorage.getItem("searchStrength") ? localStorage.getItem("searchStrength") : 'deep',
    });

    const toggleOptionPopup = () => {
        setOpenOptionPopup(!openOptionPopup);
    }

    const startScrapOnClickHandler = async () => {
        if (site !== '') {
            setIsLoading(true);
            try {
                const response = await Axios.post('/api/scrap', {
                    site: site,
                    processRootUrlOnly: options.processRootUrlOnly,
                    searchStrength: options.searchStrength,
                });
                setIsLoading(false);
                if (response.data.status !== 200) {
                    Helper.showNotification(typeof response.data.data.result !== undefined ? response.data.data.result : 'Server error', 'error');
                } else if (response.data.status === 200) {
                    setHideBottomPart(false);
                    let resultArray = [];
                    response.data.result.forEach((singleSite, index) => {
                        if (singleSite.emails.length) {
                            singleSite.emails.forEach((email, index) => {
                                let resultObj = {
                                    email    : email.replace('mailto:', ''),
                                    site: singleSite.site
                                    // site: singleSite.site.replace('www.', '').replace('https://', '').replace('http://', '').replace(/\/$/, '')
                                };
                                resultArray.push(resultObj);
                            });
                        }
                    });
                    setResults(resultArray);
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
                Helper.showNotification('Server error', 'error');
            }
            
        } else {
            Helper.showNotification('Nothing to scrap', 'error');
        }
    }

    const copyOnClickHandler = (text) => {
        setCurrentCopiedText(text);
    }

    const optionOnClickHandler = () => {
        toggleOptionPopup();
    }

    const copyAllOnClickHandler = () => {
        let table = document.querySelector('#scrapped-email-table');
        
        selectNode(table);
        document.execCommand('copy')
    }

    const selectNode = (node) => {
        let range  =  document.createRange();
        range.selectNodeContents(node)
        let select =  window.getSelection()
        select.removeAllRanges()
        select.addRange(range)
    }
    

    const populateTableRow = () => {
        if (!results.length) {
            return (
                <tr>
                    <td colSpan={4} className="text-center text-muted">No Email Found</td>
                </tr>
            )
        }
        return results.map((result, index) => {
            return (
                <React.Fragment key={index}>
                    <tr>
                        <td> {index+1} </td>
                        <td><code>{Helper.textEllipsis(result.email, 100)}</code> </td>
                        <td> {Helper.textEllipsis(result.site, 100)} </td>
                        <td>
                            <CopyToClipboard 
                                text={result.email}
                                onCopy={() => copyOnClickHandler(result.email)}
                            >
                                <button className={"btn btn-rounded btn-icon btn-success"}>
                                    <i className="mdi mdi-content-paste"></i>
                                </button>
                            </CopyToClipboard>
                        </td>
                    </tr>
                </React.Fragment>
            )
        });
    }

    return (
        <React.Fragment>
            <div className="container-scroller">
               <Navbar/>
                <div className="container-fluid page-body-wrapper">
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                            <LoadingOverlay
                                            active={isLoading}
                                            spinner
                                            text='Scrapping...'
                                        >
                                            <div className="card-body text-center">
                                                <div className="forms-sample">
                                                    <label className="text-muted">
                                                        Enter one domain/URL per line Below And Press Start Scrapping
                                                    </label>
                                                    <div className="form-group">
                                                        <textarea id="site" name="site" onChange={(e) => { setSite(e.target.value) }} value={site} className="form-control" placeholder='example.com &#10;example.com &#10;example.com' rows="6"></textarea>
                                                    </div>
                                                    <button type="button" disabled={isLoading} className="btn btn-gradient-info m-2" onClick={optionOnClickHandler}>Option</button>
                                                    <button type="button" disabled={isLoading} className="btn btn-gradient-primary m-2" onClick={startScrapOnClickHandler}>Start Scrapping{isLoading ? '...' : ''}</button>
                                                </div>
                                            </div>
                                        </LoadingOverlay>
                                    </div>
                                </div>
                                <If condition={!hideBottomPart}>
                                <React.Fragment>
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                    <div className="card-body text-center">
                                        <h4 className="card-title">Email Scrapped: {results.length}</h4>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="pt-3 pb-3">
                                                <div className="d-flex flex-column flex-md-row justify-content-md-between">
                                                    <div className="d-flex flex-row">
                                                        <OverlayTrigger
                                                            placement={'top'}
                                                            overlay={
                                                                <BootStrapTooltip>
                                                                    Copy All
                                                                </BootStrapTooltip>
                                                            }
                                                        >
                                                            <button disabled={!results.length} id="copy-all-button" className="btn btn-inverse-info btn-icon" onClick={() => copyAllOnClickHandler()}>
                                                                <i className="mdi mdi-content-copy"></i>
                                                            </button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive">
                                                <table id='scrapped-email-table' className="table table-striped scrapped-email-table">
                                                    <thead>
                                                        <tr>
                                                            <th> # </th>
                                                            <th> Email </th>
                                                            <th> Site </th>
                                                            <th style={{width: '160px'}}> </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {populateTableRow()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </React.Fragment>
                                </If>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <If condition={openOptionPopup}>
                <OptionPopup
                    handleClose={toggleOptionPopup}
                    options={options}
                    setOptions={setOptions}
                />
            </If>
        </React.Fragment>
    );
};

export default Home;