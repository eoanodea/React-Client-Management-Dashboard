import React from 'react';
import { Grommet, Calendar, DataTable, Box, Meter, Text } from 'grommet';
import { Spinner } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import AddData from '../Data/AddData.Component';


export class CalendarComponent extends React.Component {
    state = {
      dates: ["2019-05-12", "2019-05-15"],
      testDates: ["2019-05-12T00:00:00.000Z", "2019-12-15T00:00:00.000Z"]
    }
    componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 2000);
        this.setState({ intervalIsSet: interval });
      }
    }
  
    componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }
    getDataFromDb = () => {
      fetch("http://localhost:3001/api/data/getData")
        .then(data => data.json())
        .then(res => this.setState({ data: res.data }));
      if(this.state.data) {
        let dataDates = []
        this.state.data.forEach(dat => {
         if(typeof(dat.dueDate) !== undefined && dat.dueDate !== null) {
            dataDates = dataDates.concat(dat.dueDate) 
         }
        });

        this.setState({ dataDates: dataDates })
      }
      
    };
    icon(type) {

      if(type === "project") {
        return <FeatherIcon icon = "briefcase" />
      } else {
        return <FeatherIcon icon = "clipboard" />
      }
    }
    // onSelectDate = date => this.setState({ date })

    onSelectDate = (selectedDate) => {
      const { date, data } = this.state;
      let selectedDateData = [];
        if (!date) {
          this.setState({ date: date });
          data.forEach(dat => {
            if(selectedDate === dat.dueDate) {
              selectedDateData = selectedDateData.concat(dat)
            }
          })
          this.setState({ selectedDateData: selectedDateData });
        } 
    }
 
  
    render() {
      const { date, dataDates, selectedDateData } = this.state;

      return (
        <div className="container">
          {
            !dataDates
            ? <div className="calendarOverlay"><Spinner color="primary" className="calendarLoading"/></div>
            :   <Grommet className="row clearfix justify-content-between"> 
            <div className="col-md-4 calendar">
            <h1>{date}</h1>
              <Calendar
                className="fade-in"
                size="medium"
                dates={dataDates}
                date={date}
                onSelect={this.onSelectDate}
              />
              
            </div>
            {
              selectedDateData <= 0 || !selectedDateData
              ? <div className="col-md-7"><Text>Nothing due on this day, add something?<br /><AddData date={this.state.date} type="project"/></Text></div>
              // : <div className="col-md-7 calendarData">
              :  <DataTable
                  className="col-md-7"
                  sortable={true} 
                  columns={[
                    {
                      property: 'type',
                      align: "center",
                      header: <Text>Type</Text>,
                      render: datem => (
                        <Text>{this.icon(datem.type)}</Text>
                      )
                    },
                    {
                      property: 'name',
                      header: <Text>Name</Text>,
                    },
                    {
                      property: 'parentName',
                      header: <Text>Parent</Text>,
                      render: datem => (
                        <Text>{datem.parentName}</Text>
                      )
                    },
                    {
                      property: 'hours',
                      header: 'Complete',
                      render: datam => (
                        <Box pad={{ vertical: 'xsmall' }}>
                          <Meter
                            values={[{ value: datam.hours }]}
                            thickness="small"
                            size="small"
                          />
                        </Box>
                      ),
                    }
                  ]}
                data={selectedDateData}
              />
            // </div>
              }
            </Grommet>
          }
          

          </div>
      );
    }
  }