import React, { Component } from 'react';
import 'whatwg-fetch';
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
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      loggedIn: false,
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
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
              isLoading: false
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
  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }
  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value
    });
  }
  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value
    });
  }

    /*
    // Gets signup info from the user and posts it to the database
    */

  onSignUp() {
    //Grab State
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;
    
    this.setState({
      isLoading: true
    });
    //Post request to backend
    fetch('http://localhost:3001/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
            alertMessage: "success"
          }); 
        
          this.toggle('1');
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            alertMessage: "danger"
          });

        }
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
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token
          });
          console.log("token received");
          // window.location.replace("http://localhost:8080/profile/");
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
    } = this.state;

    if (isLoading) {
      return(<div><p>Loading...</p></div>);
      
    }
    // Display after the user has successfully logged in
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


