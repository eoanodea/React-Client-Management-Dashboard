import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar.Component';
import { Dashboard } from '../Dashboard.Component';
import 'whatwg-fetch';
import FeatherIcon from 'feather-icons-react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    TabContent, 
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Alert
} from 'reactstrap';
import classnames from 'classnames';
import {
  getFromStorage,
  getInStorage,
  setInStorage
} from '../../utilities/storage';


export class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      tokenUser: {
        firstName: null,
        lastName: null,
      },
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      loggedIn: false,
      firstName: '',
      lastName: ''
      
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.logout = this.logout.bind(this);

    this.toggle = this.toggle.bind(this);

    this.state = {
      activeTab: '1'
    };

  }
  
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      //Verify token with GET request
      fetch('http://localhost:3001/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
              tokenUser: {
                firstName: obj.firstName,
                lastName: obj.lastName
                }
              });
            

          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }


  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }
  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }




  /*
  // Gets signup info from the user and posts it to the database
  */

  onSignIn = (e) => {
    //Grab State
    const {
      signInEmail,
      signInPassword
    } = this.state;

    e.preventDefault();

    this.setState({
      isLoading: true
    });
    //Post request to backend
    fetch('http://localhost:3001/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { 
            token: json.token, 
            firstName: json.firstName, 
            lastName: json.lastName 
          });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token,
            firstName: json.firstName,
            lastName: json.lastName
          });
          console.log(json);
          
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }
  logout() {
    this.setState({
      isLoading: true
    });
    console.log("logout innitated");
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      //Verify token with GET request
      fetch('http://localhost:3001/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
        console.log("logout complete")
    } else {
      this.setState({
        isLoading: false
      });
      console.log("logout broke")
    }

  }
  
  toggle(tab) {
    if (this.state.activeTab !== tab) {
        this.setState({
        activeTab: tab
        });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
      alertMessage,
      firstName
    } = this.state;

    if (isLoading) {
      return(
        <div className="loading">
          <FeatherIcon className="loadingIcon" icon="loader" size="54" />
        
        </div>
        );
      
    }
    // Display before user logs in
    if(!isLoading && !token) {
      return(
        <div>
          <Nav tabs>
              <NavItem>
                  <NavLink
                  className={
                      classnames({ 
                      active: this.state.activeTab === '1'
                      })
                  }
                  onClick = { () => {
                      this.toggle('1');
                  }
                  }
                  >Sign In
              </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink
                      className={
                      classnames({ 
                      active: this.state.activeTab === '2'
                      })
                      }
                      onClick = { () => {
                      this.toggle('2');
                      }
                      }
                      >Sign Up
                  </NavLink>
              </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
          <TabPane active="true" tabId="1">
            <Form onSubmit={this.onSignIn}>
                <FormGroup className="loginFormGroup">
                    <Input 
                      type="email" 
                      placeholder="Email Address" 
                      value={signInEmail}
                      onChange={this.onTextboxChangeSignInEmail}
                    />
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      value={signInPassword}
                      onChange={this.onTextboxChangeSignInPassword}
                    />
                    <Button
                        color="dark"
                        style={{ marginTop: '2rem' }}
                        block
                    >Sign In</Button>
                </FormGroup>
            </Form>
            {
              (signUpError) ? (
                <Alert id="alert" color={alertMessage.toString()} style={{ marginTop: '10px' }}>
                {signUpError}
              </Alert>
              ) : (null)
            }
            {
            (signInError) ? (
              <Alert id="alert" style={{ marginTop: '10px' }}>
                {signInError}
              </Alert>
            ) : (null)
            }
          </TabPane>
          <TabPane tabId="2">
            <Form onSubmit={this.onSignUp}>
                <FormGroup className="loginFormGroup">
                    <Input 
                      type="text" 
                      placeholder="First Name" 
                      value={signUpFirstName}
                      onChange={this.onTextboxChangeSignUpFirstName}
                    />
                    <Input 
                      type="text" 
                      placeholder="Last Name" 
                      value={signUpLastName}
                      onChange={this.onTextboxChangeSignUpLastName}
                    />
                    <Input 
                      type="email" 
                      placeholder="Email Address" 
                      value={signUpEmail}
                      onChange={this.onTextboxChangeSignUpEmail}
                    />
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      value={signUpPassword}
                      onChange={this.onTextboxChangeSignUpPassword}
                    />
                    <Button
                        color="dark"
                        style={{ marginTop: '2rem' }}
                        block
                    >Sign Up</Button>
                </FormGroup>
            </Form>
            {
              (signUpError) ? (
                <Alert id="alert" color={alertMessage.toString()} style={{ marginTop: '10px' }}>
                {signUpError}
              </Alert>
              ) : (null)
            }
            </TabPane>
          </TabContent>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{this.state.tokenUser.firstName}</h1>
          <Dashboard />
          <Button 
            color="dark"
            onClick={this.logout}
            style={{ marginTop: '2rem',
                    marginBottom: '2rem',
                    color: '#fff' }}
            block
          >Logout</Button>
        </div>
      );
    }
  }
}  
export default UserLogin;


