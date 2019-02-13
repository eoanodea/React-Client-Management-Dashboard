// onSignIn = (e) => {
//     //Grab State
//     const {
//       signInEmail,
//       signInPassword
//     } = this.state;

//     e.preventDefault();

//     this.setState({
//       isLoading: true
//     });
//     //Post request to backend
//     fetch('http://localhost:5000/api/account/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: signInEmail,
//         password: signInPassword
//       }),
//     })
//       .then(res => res.json())
//       .then(json => {
//         console.log('json', json);
//         if (json.success) {
//           setInStorage('the_main_app', { token: json.token });
//           this.setState({
//             signInError: json.message,
//             isLoading: false,
//             signInEmail: '',
//             signInPassword: '',
//             token: json.token
//           });
//           console.log("token received");
//           // window.location.replace("http://localhost:8080/profile/");
//         } else {
//           this.setState({
//             signInError: json.message,
//             isLoading: false,
//           });
//         }
//       });
// }