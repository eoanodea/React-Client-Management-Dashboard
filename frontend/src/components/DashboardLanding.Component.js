import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { CalendarComponent } from './Calendar/CalendarComponent.Component';



export class DashboardLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // chart() {
    //     feather.replace()
    
    //     // Graphs
    //     let ctx = document.getElementById('myChart')
    //     // eslint-disable-next-line no-unused-vars
    //     const myChart = new Chart(ctx, {
        
    //     type: 'line',
    //     data: {
    //         labels: [
    //         'Sunday',
    //         'Monday',
    //         'Tuesday',
    //         'Wednesday',
    //         'Thursday',
    //         'Friday',
    //         'Saturday'
    //         ],
    //         datasets: [{
    //         data: [
    //             15339,
    //             21345,
    //             18483,
    //             24003,
    //             23489,
    //             24092,
    //             12034
    //         ],
    //         lineTension: 0,
    //         backgroundColor: 'transparent',
    //         borderColor: '#007bff',
    //         borderWidth: 4,
    //         pointBackgroundColor: '#007bff'
    //         }]
    //     },
    //     options: {
    //         scales: {
    //         yAxes: [{
    //             ticks: {
    //             beginAtZero: false
    //             }
    //         }]
    //         },
    //         legend: {
    //         display: false
    //         }
    //     }
    //     })
    //     console.log(this.props.data)
    // }

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