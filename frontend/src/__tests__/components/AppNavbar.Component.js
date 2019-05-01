import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import FeatherIcon from 'feather-icons-react';


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
                                    <DropdownItem  href="/profile">
                                    <FeatherIcon icon="users"/> Profile
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href="https://gitlab.mi.hdm-stuttgart.de/eo023/client-management-system">
                                    <FeatherIcon icon="github" /> GitHub
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