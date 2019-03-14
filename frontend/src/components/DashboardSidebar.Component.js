import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { setInStorage } from '../utilities/storage';
import { Link, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard.Component';

export class DashboardSidebar extends React.Component {
     constructor(props) {
         super(props)

         this.state = {
            admin: 'all',
            navigation: [
                {
                    id: 0,
                    name: 'Dashboard',
                    icon: 'home',
                    link: '/', 
                    access: 'all'
                },
                {
                    id: 1,
                    name: 'Clients',
                    icon: 'users',
                    link: '/profile', 
                    access: 'admin'
                },
                {
                    id: 2,
                    name: 'My Profile',
                    icon: 'users',
                    link: '/profile', 
                    access: 'all'
                },
                {
                    id: 3,
                    name: 'Projects',
                    icon: 'briefcase',
                    link: '/project', 
                    access: 'admin'
                },
                {
                    id: 4,
                    name: 'Projects',
                    icon: 'briefcase',
                    link: '/project', 
                    access: 'all'
                },
                {
                    id: 5,               
                    name: '(broken link)Tasks',
                    icon: 'clipboard',
                    link: '/', 
                    access: 'admin'
                },
                {
                    id: 6,               
                    name: '(broken link)Tasks',
                    icon: 'clipboard',
                    link: '/', 
                    access: 'all'
                },
            ]

         }
     }
     authorized() {
        const userAccess = JSON.parse(localStorage.getItem('user_access'));
        if(userAccess === "admin") {
            this.setState({admin: 'admin'})
        } else {
            this.setState({admin: 'all'});
        }
     }

    render() {
        const {navigation, admin} = this.state;
        return(
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">

                    <div>
                        <ul className="nav flex-column">
                        { 
                            navigation.length <= 0
                            ? "Nothing in navigation"
                            : navigation.filter(navigation => navigation.access === admin).map(navigation => (
                                <li key={navigation.id} className="nav-item">
                                <Link
                                    to={navigation.link}
                                    className="nav-link" 
                                >
                                <FeatherIcon icon={navigation.icon}/>
                                {navigation.name} <span className="sr-only">{navigation.name}</span>
                                </Link>
                            </li>
                            ))
                        }
                        {/* <li className="nav-item">
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
                        </li> */}
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