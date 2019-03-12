import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { setInStorage } from '../utilities/storage';
import { Link, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard.Component';

export class DashboardSidebar extends React.Component {
     constructor(props) {
         super(props)

         this.state = {
            admin: false,
            navigation: [
                {
                dashboard: {
                    name: 'Dashboard',
                    display: 'none'
                }
                },
                {
                clients: {
                    name: 'Client',
                    display: 'none'
                }
                },
                {
                projects: {
                    name: 'Project',
                    display: 'none'
                }
                },
                {
                tasks: {                
                    name: 'Task',
                    display: 'none'
                }
                },
            ]

         }
     }
     authorized() {
        const userAccess = JSON.parse(localStorage.getItem('user_access'));
        if(userAccess === "admin") {
            this.setState({admin: true});
        } else {
            this.setState({admin: false});
        }
     }

    render() {
        return(
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">

                    <div>
                        <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link" 
                                onClick={this.navigation} 
                            >
                            <FeatherIcon icon="home"/>
                            Dashboard <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/profile"
                                className="nav-link" 
                                onClick={this.navigation} 
                            >
                            <FeatherIcon icon="users"/>
                            {this.state.clients}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/project"
                                className="nav-link" 
                                onClick={this.navigation} 
                            >
                            <FeatherIcon icon="briefcase"/>
                            {this.state.projects}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link" onClick={this.navigation} 
                            >
                            <FeatherIcon icon="clipboard"/>
                            {this.state.tasks}
                            </Link>
                        </li>
                        </ul>
                    </div>

                </div>
            </nav> 
       );
    }
}

export default DashboardSidebar;


{/* <div>
<Link
to="/"
className="nav-link" 
onClick={this.navigation} 
>
Link</Link>
<Link
to="/profile"
className="nav-link" 
onClick={this.navigation} 
>
Link</Link>
<Link
to="/project"
className="nav-link" 
onClick={this.navigation} 
>
Link</Link>
</div> */}