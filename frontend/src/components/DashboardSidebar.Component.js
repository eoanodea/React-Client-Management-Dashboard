import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { setInStorage } from '../utilities/storage';

export class DashboardSidebar extends React.Component {
     constructor(props) {
         super(props)

         this.state = {
            dashboard: '',
            clients: '',
            projects: '',
            tasks: '',
            current: ''
         }
     }
     current = (key) => {
        setInStorage('current_page', {
            current: key
        })
        console.log(key)
     }
    render() {
        const key = "";
        return(
            // {/* 
            //     Dashboard Sidebar
            // */}

            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <a 
                            key="client"
                            className="nav-link" 
                            onClick={() => this.current(1)}
                        >
                        <FeatherIcon icon="home"/>
                        Dashboard <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            key="client"
                            className="nav-link" 
                            onClick={() => this.current("client")}
                        >
                        <FeatherIcon icon="users"/>
                        Clients
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            key="client"
                            className="nav-link" 
                            onClick={() => this.current("project")}
                        >
                        <FeatherIcon icon="briefcase"/>
                        Projects
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            key="client"
                            className="nav-link" 
                            onClick={() => this.current("task")}
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