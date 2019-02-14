import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Alert
} from 'reactstrap';
import FeatherIcon from 'feather-icons-react';

export class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
        signUpError: '',
        signUpFirstName: '',
        signUpLastName: '',
        signUpEmail: '',
        signUpAccess: ''
    };   
    
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpAccess = this.onTextboxChangeSignUpAccess.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
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
  onTextboxChangeSignUpAccess(event) {
    this.setState({
      signUpAccess: event.target.value
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
      signUpPassword,
      signUpAccess
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
        password: signUpPassword,
        access: signUpAccess
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
            signUpAccess: '',
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

render() {
    const {
        signUpFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword,
        signUpAccess,
        signUpError,
        alertMessage,
        isLoading
    } = this.state;
    if (isLoading) {
      return(
        <div className="loading">
          <FeatherIcon className="loadingIcon" icon="loader" size="54" />
        
        </div>
        );
      
    }
  return(
    <div>
      <h3>Add a new User</h3>
      {
          (signUpError) ? (
          <Alert id="alert" color={alertMessage.toString()} style={{ marginTop: '10px' }}>
          {signUpError}
          </Alert>
          ) : (null)
      }
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
              <Input
              type="select"
              placeholder="Privileges"
              value={signUpAccess}
              onChange={this.onTextboxChangeSignUpAccess}
              >
                <option>Administrator</option>
                <option>Client</option>
                <option>Testing</option>
              </Input>
              <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block
              >Sign Up</Button>
          </FormGroup>
      </Form>
      </div>
    );
  }
}
export default SignUp;