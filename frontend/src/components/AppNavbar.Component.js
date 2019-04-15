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
                                    <DropdownItem>
                                        <FeatherIcon icon="log-out" /> Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem className="d-none d-sm-block">
                                <NavLink divider />
                                    {/* <div className="divider"></div>
                                </NavLink> */}
                            </NavItem>
                            <NavItem>
                            <Box round='large' background='#353A3F' pad='small'>
                                <Clock type="digital" className="appNavBarClock" />
                            </Box>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
export default AppNavbar;