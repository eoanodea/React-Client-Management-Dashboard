import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { setInStorage } from '../../utilities/storage';
import { Link, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard.Component';

export class DashboardSidebar extends React.Component {
     constructor(props) {
         super(props)

         this.state = {
            admin: null,
            intervalIsSet: false,
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
                    name: 'Tasks',
                    icon: 'clipboard',
                    link: '/task', 
                    access: 'admin'
                },
                // {
                //     id: 6,               
                //     name: 'Tasks',
                //     icon: 'clipboard',
                //     link: '/task', 
                //     access: 'all'
                // },
            ]

         }
     }
     componentDidMount() {
        this.authorized();
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.authorized, 5000);
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
     authorized = () => {
        const userAccess = JSON.parse(localStorage.getItem('user_access'));
        const userId = JSON.parse(localStorage.getItem('user_id'));
        if(userAccess === "admin") {
            this.setState({admin: 'admin', userId: userId});
        } else {
            this.setState({admin: 'all' , userId: userId});
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
                                <li key={navigation.id} className="nav-item fade-in">
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
                    
                        </ul>
                    </div>

                </div>
            </nav> 
       );
    }
}

export default DashboardSidebar;

