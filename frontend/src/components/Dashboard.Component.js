import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { AddProject } from './Projects/AddProject.Component';
import { SignUp } from './Login/SignUp.Component';
import { ViewProjects } from './Projects/ViewProjects.Component';
import { ViewUsers } from './Users/ViewUsers.Component';
import { DashboardSidebar } from './DashboardSidebar.Component';
import { getFromStorage } from '../utilities/storage';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "projects"
        }
    }
    componentDidMount() {
        let current = getFromStorage('current_page').current;
        if (current =! this.state.current) {
            this.state = {
                current: current
            }
        }
        console.log(this.state.current)
        
    }
    /* globals Chart:false, feather:false */

    chart() {
        feather.replace()
    
        // Graphs
        let ctx = document.getElementById('myChart')
        // eslint-disable-next-line no-unused-vars
        const myChart = new Chart(ctx, {
        
        type: 'line',
        data: {
            labels: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
            ],
            datasets: [{
            data: [
                15339,
                21345,
                18483,
                24003,
                23489,
                24092,
                12034
            ],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            scales: {
            yAxes: [{
                ticks: {
                beginAtZero: false
                }
            }]
            },
            legend: {
            display: false
            }
        }
        })
        console.log(this.props.data)
    }
    navigation() {
        const { current } = this.state;
        if(current === "users")
        return(
            <div>
                <ViewUsers /> 
                <SignUp />
            </div>
        );
        if(this.state.current === 'projects')
        return(
            <div>
                <ViewProjects /> 
            </div>
        );
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">

                {/* 
                    Dashboard Sidebar
                */}

                <DashboardSidebar />

                {/* 
                    Dashboard Main
                */}


                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                            <FeatherIcon icon="calendar"/>
                            This week
                        </button>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-8">
                               {this.navigation()}
                            </div>
                            <div className="col-4">
                               <AddProject />
                                
                            </div>
                        </div>
                    </div>

                    {/* //chart function broken
                    <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}


                    </main>
                </div>
            </div>
        );
    }
}

export default Dashboard;