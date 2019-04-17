import React from 'react';
import { ViewData } from '../Data/ViewData.Component';
import { ViewUsers } from '../Users/ViewUsers.Component';
import { DashboardLanding } from './DashboardLanding.Component';
import { DashboardSidebar } from './DashboardSidebar.Component';
import { BrowserRouter, Route } from 'react-router-dom';
import { Grommet } from 'grommet';


export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "Dashboard",
            userId: null
        }
    }

    componentDidMount() {
        this.userId();
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.userId, 5000);
          this.setState({ intervalIsSet: interval });
        }
      }
    
      // never let a process live forever 
      // always kill a process everytime we are done using it
      componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
      }
    

    userId = () => {
        if(!this.state.userId) {
            const userId = JSON.parse(localStorage.getItem('user_id'));
            this.setState({ userId: userId})
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="container-fluid">
                        <BrowserRouter>
                            <Grommet>
                                <div className="row">
                                    <DashboardSidebar />
                                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                                        <div>
                                            <Route exact path="/" component={DashboardLanding} />
                                            <Route path="/profile" component={ViewUsers} />
                                            <Route 
                                                path="/project" 
                                                component={(props) => 
                                                    <ViewData {...props}
                                                        id={this.state.userId} 
                                                        project="project" />} 
                                                    />
                                            <Route 
                                                path="/task" 
                                                component={ViewData} 
                                            />
                                        </div>
                                    </main>
                                    
                                </div>
                            </Grommet>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;