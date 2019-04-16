import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import { Box, Clock } from 'grommet';


export class AppNavbar extends React.Component {

    state = {
        isOpen: false,
        iconName: 'Client Management'
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
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Hi, {userFirstName}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                    <FeatherIcon icon="users" /> Profile
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <FeatherIcon icon="log-out" /> Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
export default AppNavbar;