import React from 'react';
import { CalendarComponent } from './CalendarComponent.Component';



export class DashboardLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <CalendarComponent />
                </div>
            </div>
        );
    }
}

export default DashboardLanding;