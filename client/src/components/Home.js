import React, { useState, useEffect, useRef } from 'react';
import Navbar from './layouts/Navbar';
import Sidebar from './layouts/Sidebar';
import Helper from './Helper';
import Axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { If } from 'react-if';
import {
  PieChart, Pie, Legend, Tooltip, Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#fe7c96'];
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
};

const Home = (props) => {
    const [state, setState] = useState({
        site: '',
        currentCopiedText: '',
        displayFilter: 'all',
        isLoading: false
    });

    const [emails, setEmails] = useState([]);
    const [chartData, setChartData] = useState([
            { name: 'Total Email', value: 100 },
            { name: 'Copied', value: 50 },
            { name: 'Not Copied', value: 50 }
        ]);

    useEffect(() => {
        if (emails.length) {
           setChartData([
                { name: 'Total Email', value: emails.length },
                { name: 'Copied', value: emails.filter(email => email.isCopied === true).length },
                { name: 'Not Copied', value: emails.filter(email => email.isCopied === false).length }
            ]);
        }
    }, [emails, state.currentCopiedText]);

    //validator
    const [, forceUpdate] = useState();
    const validator = useRef(new SimpleReactValidator({
        autoForceUpdate: { forceUpdate: forceUpdate },
        className: 'small text-danger text-left mdi mdi-alert pt-1 pl-1'
    }));

    const startScrapOnClickHandler = async () => {
        if (validator.current.allValid()) {
            setState({
                ...state,
                isLoading: true
            });
            try {
                const response = await Axios.post('/api/scrap', {
                    site: state.site
                });
                setState({
                    ...state,
                    isLoading: false
                });
                if (response.data.data.status !== 'success') {
                    Helper.showNotification(typeof response.data.data.result !== undefined ? response.data.data.result : 'Server error', 'error');
                } else if (response.data.data.status === 'success') {
                    let emailsArray = [];
                    response.data.data.result.forEach((element, index) => {
                        let emailObj = {
                            index    : index,
                            email    : element,
                            isCopied: false,
                        };
                        emailsArray.push(emailObj);
                    });
                    setEmails(emailsArray);
                }
            } catch (error) {
                Helper.showNotification(typeof error.response.data.data.result !== undefined ? error.response.data.data.result : 'Server error', 'error');
            }
            
        } else {
            validator.current.showMessages();
            forceUpdate(1);
        }
    }

    const copyOnClickHandler = (index, text) => {
        setState({
            ...state, 
            currentCopiedText: text
        });
        emails[index]['isCopied'] = true;
    }

    const populateTableRow = () => {
        let counter = 1;
        return emails.map((email, index) => {
            return (
                <React.Fragment key={index}>
                    <If condition={state.displayFilter === 'all'}>
                        <tr>
                            <td> {counter++} </td>
                            <td><i className="mdi mdi-email-variant"></i> <code>{email.email}</code> </td>
                            <td>
                                <CopyToClipboard 
                                    text={email.email}
                                    onCopy={() => copyOnClickHandler(index, email.email)}
                                >
                                    <button className={"btn btn-rounded btn-icon "+(email.isCopied ? 'btn-success' : 'btn-danger')}>
                                        <i className="mdi mdi-content-paste"></i>
                                    </button>
                                </CopyToClipboard>
                                    {email.isCopied ? <i className="ml-2 text-success mdi mdi-check"></i> : ''}
                                    
                            </td>
                        </tr>
                    </If>
                    <If condition={state.displayFilter === 'copied'}>
                        <If condition={email.isCopied}>
                            <tr>
                                <td> {counter++} </td>
                                <td><i className="mdi mdi-email-variant"></i> <code>{email.email}</code> </td>
                                <td>
                                    <CopyToClipboard 
                                        text={email.email}
                                        onCopy={() => copyOnClickHandler(index, email.email)}
                                    >
                                        <button className={"btn btn-rounded btn-icon "+(email.isCopied ? 'btn-success' : 'btn-danger')}>
                                            <i className="mdi mdi-content-paste"></i>
                                        </button>
                                    </CopyToClipboard>
                                        {email.isCopied ? <i className="ml-2 text-success mdi mdi-check"></i> : ''}
                                        
                                </td>
                            </tr>
                        </If>
                    </If>
                    <If condition={state.displayFilter === 'not-copied'}>
                        <If condition={!email.isCopied}>
                            <tr>
                                <td> {counter++} </td>
                                <td><i className="mdi mdi-email-variant"></i> <code>{email.email}</code> </td>
                                <td>
                                    <CopyToClipboard 
                                        text={email.email}
                                        onCopy={() => copyOnClickHandler(index, email.email)}
                                    >
                                        <button className={"btn btn-rounded btn-icon "+(email.isCopied ? 'btn-success' : 'btn-danger')} >
                                            <i className="mdi mdi-content-paste"></i>
                                        </button>
                                    </CopyToClipboard>
                                        {email.isCopied ? <i className="ml-2 text-success mdi mdi-check"></i> : ''} 
                                </td>
                            </tr>
                        </If>
                    </If>
                </React.Fragment>
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
                                            <div className="form-group">
                                                <input type="text" id="site" name="site" onChange={(e) => { setState({ ...state, site: e.target.value }) }} value={state.site} className="form-control" placeholder="Enter Site Name" />
                                                {validator.current.message('site name', state.site, 'required|url')}
                                            </div>
                                            <button type="button" disabled={state.isLoading} className="btn btn-gradient-primary mr-2" onClick={startScrapOnClickHandler}>Start Scrapping{state.isLoading ? '...' : ''}</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                    <div className="card-body text-center">
                                        <h4 className="card-title">Total Email Scrapped: {emails.length}</h4>
                                        <PieChart width={220} height={220} className="mx-auto">
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
                                        </PieChart>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="pt-3 pb-3">
                                                <div className="d-flex flex-column flex-md-row justify-content-md-between">
                                                    <div className="d-flex flex-row">
                                                        <div className="p-2">
                                                            <div className="input-group input-group-sm">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Display</span>
                                                            </div>
                                                            <select className="form-control form-control-sm btn btn-primary" defaultValue={state.displayFilter} onChange={(e) => {setState({ ...state, displayFilter: e.target.value })}}>
                                                                <option value="all">All</option>
                                                                <option value="copied">Copied</option>
                                                                <option value="not-copied">Not Copied</option>
                                                            </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table table-striped scrapped-email-table">
                                                    <thead>
                                                        <tr>
                                                            <th> # </th>
                                                            <th> Email </th>
                                                            <th style={{width: '160px'}}> Action </th>
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
        </React.Fragment>
    );
};

export default Home;