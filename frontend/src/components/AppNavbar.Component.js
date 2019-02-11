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
import {
    getFromStorage
} from '../utilities/storage'

export class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconName: 'WebSpace Client Management',
            tokenUser: {
                firstName: null,
                lastName: null,
              },

        }
    }
    componentDidMount() {
        const obj = getFromStorage('the_main_app');

        this.setState({
            tokenUser: {
                firstName: obj.firstName,
                lastName: obj.lastName
            }
        })
    }
    /*
    // Toggle & state for responsive burger menu
    */
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }


    render() {

        const { tokenUser } = this.state;


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
                                <NavLink href="/">
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem className="d-none d-sm-block">
                                <NavLink>
                                    <div className="divider"></div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">
                                    {tokenUser.firstName} {tokenUser.lastName}
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