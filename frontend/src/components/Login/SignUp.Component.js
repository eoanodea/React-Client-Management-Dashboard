export class UserLogin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
token: '',
signUpError: '',
signUpFirstName: '',
signUpLastName: '',
signUpEmail: '',
    };   
    
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

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

render() {
    const {
        signUpFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword,
        signUpError,
        alertMessage,
    } = this.state;

return(
    <div>
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
</div>
);
}