import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { setInStorage } from '../utilities/storage';
import { Link, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard.Component';

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
     navigation() {
        
        console.log("change");
     }

    render() {
        return(
            // {/* 
            //     Dashboard Sidebar
            // */}

            <div>
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
            </div>


          

        );
    }
}

export default DashboardSidebar;




{/* // <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            //     <div className="sidebar-sticky">
                
            //         <div>
            //             <ul className="nav flex-column">
            //             <li className="nav-item">
            //                 <Link
            //                     to="/"
            //                     className="nav-link" 
            //                     onClick={this.navigation} 
            //                 >
            //                 <FeatherIcon icon="home"/>
            //                 Dashboard <span className="sr-only">(current)</span>
            //                 </Link>
            //             </li>
            //             <li className="nav-item">
            //                 <Link
            //                     to="/profile"
            //                     className="nav-link" 
            //                     onClick={this.navigation} 
            //                 >
            //                 <FeatherIcon icon="users"/>
            //                 {this.state.clients}
            //                 </Link>
            //             </li>
            //             <li className="nav-item">
            //                 <Link
            //                     to="/project"
            //                     className="nav-link" 
            //                     onClick={this.navigation} 
            //                 >
            //                 <FeatherIcon icon="briefcase"/>
            //                 {this.state.projects}
            //                 </Link>
            //             </li>
            //             <li className="nav-item">
            //                 <Link
            //                     to="/"
            //                     className="nav-link" onClick={this.navigation} 
            //                 >
            //                 <FeatherIcon icon="clipboard"/>
            //                 {this.state.tasks}
            //                 </Link>
            //             </li>
            //             </ul>
            //         </div>

            //     </div>
            //     </nav> */}