import React, { useState } from 'react';
import Navbar from './layouts/Navbar';
import Sidebar from './layouts/Sidebar';
import Helper from './Helper';
import Axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { If } from 'react-if';
/* import {
  PieChart, Pie, Legend, Tooltip, Cell,
} from 'recharts'; */
import OptionPopup from './OptionPopup';
import Loading from './Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import BootStrapTooltip from 'react-bootstrap/Tooltip';
import loadingImage from '../assets/img/loader.gif';

/* const COLORS = ['#0088FE', '#00C49F', '#fe7c96'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}; */

const Home = (props) => {
    const [state, setState] = useState({
        site: '',
        currentCopiedText: '',
        isLoading: false,
        openOptionPopup: false
    });

    const [results, setResults] = useState([]);
    const [options, setOptions] = useState({
        acceptRootUrlOnly: localStorage.getItem("acceptRootUrlOnly") === 'true' ? true : false,
        searchStrength: localStorage.getItem("searchStrength") ? localStorage.getItem("searchStrength") : 'deep',
        fetchMailToOnly: localStorage.getItem("fetchMailToOnly") === 'true' ? true : false
    });
    /* const [chartData, setChartData] = useState([
        { name: 'Total Email', value: 100 },
        { name: 'Copied', value: 50 },
        { name: 'Not Copied', value: 50 }
    ]); */

    /* useEffect(() => {
        if (emails.length) {
           setChartData([
                { name: 'Total Email', value: emails.length },
                { name: 'Copied', value: emails.filter(email => email.isCopied === true).length },
                { name: 'Not Copied', value: emails.filter(email => email.isCopied === false).length }
            ]);
        }
    }, [emails, state.currentCopiedText]); */

    const toggleOptionPopup = () => {
        setState({
            ...state,
            openOptionPopup: !state.openOptionPopup
        });
    }

    const startScrapOnClickHandler = async () => {
        if (state.site !== '') {
            setState({
                ...state,
                isLoading: true
            });
            try {
                const response = await Axios.post('/api/scrap', {
                    site: state.site,
                    acceptRootUrlOnly: options.acceptRootUrlOnly,
                    searchStrength: options.searchStrength,
                    fetchMailToOnly: options.fetchMailToOnly
                });
                setState({
                    ...state,
                    isLoading: false
                });
                if (response.data.status !== 200) {
                    Helper.showNotification(typeof response.data.data.result !== undefined ? response.data.data.result : 'Server error', 'error');
                } else if (response.data.status === 200) {
                    let resultArray = [];
                    response.data.result.forEach((singleSite, index) => {
                        if (singleSite.emails.length) {
                            singleSite.emails.forEach((email, index) => {
                                let resultObj = {
                                    email    : email.replace('mailto:', ''),
                                    site: singleSite.site.replace('www.', '').replace('https://', '').replace('http://', '').replace(/\/$/, '')
                                };
                                resultArray.push(resultObj);
                            });
                        }
                    });
                    setResults(resultArray);
                }
            } catch (error) {
                setState({
                    ...state,
                    isLoading: false
                });
                console.log(error);
                Helper.showNotification('Server error', 'error');
            }
            
        } else {
            Helper.showNotification('Nothing to scrap', 'error');
        }
    }

    const copyOnClickHandler = (text) => {
        setState({
            ...state, 
            currentCopiedText: text
        });
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
        return results.map((email, index) => {
            return (
                <tr key={index}>
                    <td> {index+1} </td>
                    <td><code>{Helper.textEllipsis(email.email, 50)}</code> </td>
                    <td> {Helper.textEllipsis(email.site, 50)} </td>
                    <td>
                        <CopyToClipboard 
                            text={email.email}
                            onCopy={() => copyOnClickHandler(email.email)}
                        >
                            <button className={"btn btn-rounded btn-icon btn-success"}>
                                <i className="mdi mdi-content-paste"></i>
                            </button>
                        </CopyToClipboard>
                    </td>
                </tr>
            )
        });
    }

    return (
        <React.Fragment>
            <div className="container-scroller">
               <Navbar/>
                <div className="container-fluid page-body-wrapper">
                    <Sidebar/>
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                    <div className="card-body text-center">
                                        <div className="forms-sample">
                                            <label className="text-muted">Enter one domain/URL per line Below And Press Start Scrapping</label>
                                            <div className="form-group">
                                                <textarea id="site" name="site" onChange={(e) => { setState({ ...state, site: e.target.value }) }} value={state.site} className="form-control" placeholder='example.com &#10;example.com &#10;example.com' rows="6"></textarea>
                                            </div>
                                            <button type="button" disabled={state.isLoading} className="btn btn-gradient-info mr-2" onClick={optionOnClickHandler}>Option</button>
                                            <button type="button" disabled={state.isLoading} className="btn btn-gradient-primary mr-2" onClick={startScrapOnClickHandler}>Start Scrapping{state.isLoading ? '...' : ''}</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                    <div className="card-body text-center">
                                        <h4 className="card-title">Total Email Scrapped: {results.length}</h4>
                                        {/* <PieChart width={220} height={220} className="mx-auto">
                                            <Pie
                                                data={chartData}
                                                cx={110}
                                                cy={110}
                                                labelLine={false}
                                                label={renderCustomizedLabel}
                                                outerRadius={55}
                                                fill="#da8cff"
                                                dataKey="value"
                                                isAnimationActive={true}
                                                >
                                            {
                                                chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                            }
                                            </Pie>
                                            <Legend/>
                                        </PieChart> */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <If condition={state.openOptionPopup}>
                <OptionPopup
                    handleClose={toggleOptionPopup}
                    options={options}
                    setOptions={setOptions}
                />
            </If>
            <If condition={state.isLoading}>
                <Loading/>
            </If>
        </React.Fragment>
    );
};

export default Home;