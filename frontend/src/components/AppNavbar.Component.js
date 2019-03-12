import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { Link } from 'react-router-dom';


export class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconName: 'Client Management',
            userName: "John Doran"
        }
    }
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const userFirstName = JSON.parse(localStorage.getItem('user_firstName'));
        return (
            <div>
                <Navbar color="dark" dark expand="sm">
                    <NavbarBrand href="/" >
                        {this.state.iconName}
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/profile">
                                    Hi, {userFirstName}
                                </NavLink>
                            </NavItem>
                            <NavItem className="d-none d-sm-block">
                                <NavLink>
                                    <div className="divider"></div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    onClick={this.logout}
                                >
                                Logout
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
export default AppNavbar;