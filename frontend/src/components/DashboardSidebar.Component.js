import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { setInStorage } from '../utilities/storage';

export class DashboardSidebar extends React.Component {
     constructor(props) {
         super(props)

         this.state = {
            dashboard: 'dashboard',
            clients: 'client',
            projects: 'project',
            tasks: 'task',
            current: 'dashboard'
         }
     }
     current = (key) => {
        setInStorage('current_page', {
            current: key
        })
        console.log(key)

     }
    render() {
        return(
            // {/* 
            //     Dashboard Sidebar
            // */}

            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <a 
                            href="javascript:void(0)"
                            className="nav-link" 
                            onClick={() => this.current(1)}
                        >
                        <FeatherIcon icon="home"/>
                        Dashboard <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            href="javascript:void(0)"
                            className="nav-link" 
                            onClick={() => this.current(2)}
                        >
                        <FeatherIcon icon="users"/>
                        Clients
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            href="javascript:void(0)"
                            className="nav-link" 
                            onClick={() => this.current(3)}
                        >
                        <FeatherIcon icon="briefcase"/>
                        Projects
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            href="javascript:void(0)"
                            className="nav-link" 
                            onClick={() => this.current(4)}
                        >
                        <FeatherIcon icon="clipboard"/>
                        Tasks
                        </a>
                    </li>
                    </ul>
                </div>
                </nav>

        );
    }
}

export default DashboardSidebar;