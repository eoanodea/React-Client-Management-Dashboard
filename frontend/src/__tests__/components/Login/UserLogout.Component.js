import React from 'react';
import { Button } from 'reactstrap';
import 'whatwg-fetch';
import { getFromStorage } from '../../utilities/storage';

export class UserLogout extends React.Component {
    constructor(props) {
        super(props)

        this.setState({
            token: ""
        })
    }
    logout() {
        console.log("logout innitated");
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          const { token } = obj;
          //Verify token with GET request
          fetch('http://localhost:3001/api/account/logout?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                localStorage.setItem("user_logout", "")
              }
            });
            console.log("logout complete")
        } else {
          console.log("logout broke")
        }
    
      }
      render() {
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
}
export default UserLogout;