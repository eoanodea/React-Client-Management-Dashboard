import React from 'react';
import { Dashboard } from '../Dashboard.Component';
import 'whatwg-fetch';
import FeatherIcon from 'feather-icons-react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Alert
} from 'reactstrap';
import {
  getFromStorage,
  setInStorage
} from '../../utilities/storage';


export class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      tokenUser: {
        firstName: '',
        lastName: '',
      },
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      loggedIn: false,
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
            tokenUser: {
              firstName: json.firstName,
              lastName: json.lastName
            } 
          });
          
          
        } else {
          this.setState({
            signInError: json.message,
            alertMessage: "",
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
  logoutButton() {
    return(
      <Button 
        color="dark"
        onClick={this.logout}
        style={{ marginTop: '2rem',
                marginBottom: '2rem',
                color: '#fff' }}
        block
      >Logout</Button>
    );
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
      alertMessage,
      tokenUser
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
        <div className="login"> 
          <h2 className="loginHeading">Sign In</h2>
          {
            (signInError) ? (
              <Alert id="alert" style={{ marginTop: '10px' }}>
                {signInError}
              </Alert>
            ) : (null)
            }
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
        </div>
      );
    } else {
      return (
        <div>
          <Dashboard />
          {this.logoutButton()}
        </div>
      );
    }
  }
}  
export default UserLogin;


