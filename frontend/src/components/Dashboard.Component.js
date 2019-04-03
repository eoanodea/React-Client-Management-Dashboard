import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { AddProject } from './Projects/AddProject.Component';
import { ViewProjects } from './Projects/ViewProjects.Component';
import { ViewUsers } from './Users/ViewUsers.Component';
import { DashboardLanding } from './DashboardLanding.Component';
import { DashboardSidebar } from './DashboardSidebar.Component';
import { getFromStorage } from '../utilities/storage';
import { BrowserRouter, Route, Link } from 'react-router-dom';


export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "Dashboard"
        }
    }


    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="container-fluid">
                        <BrowserRouter>
                            <>
                                <div className="row">
                                    <DashboardSidebar />
                                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                            <h1 className="h2">{this.state.current}</h1>
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
                                        <div>
                                            <Route exact path="/" component={DashboardLanding} />
                                            <Route path="/profile" component={ViewUsers} />
                                            <Route path="/project" component={ViewProjects} />
                                        </div>
                                    </main>
                                </div>
                            </>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;