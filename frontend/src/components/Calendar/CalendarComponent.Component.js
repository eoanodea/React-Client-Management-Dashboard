import React, {Component} from 'react';
import { Grommet, Calendar, DataTable, Box, Meter, Text } from 'grommet';
import { Spinner } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';


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
          // if(typeof(dat.dueDue) !== undefined || dat.dueDate != null){
            dataDates = dataDates.concat(dat.dueDate) 
          // } else {
         }
          //   console.log("undefined date on" + dat.name)
          // }
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
      const { date, dataDates, data, selectedDateData } = this.state;

      return (
        <div className="container">
            <Grommet className="row clearfix"> 
            <div className="col-md-4 calendar">
              {
                !dataDates
                ? <div className="calendarOverlay"><Spinner color="primary" className="calendarLoading"/></div>
                : <Calendar
                      className="fade-in"
                      size="medium"
                      dates={dataDates}
                      onSelect={this.onSelectDate}
                  />
              }
            </div>
            <DataTable
              className="col-md-7 calendarData"
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
          </Grommet>

          </div>
      );
    }
  }

  //Old Calendar component code

     // onSelectSingle = date => this.setState({ date })
  
    // onSelectRange = (selectedDate) => {
    //   const { date, dates, previousSelectedDate } = this.state;
    //   if (!dates) {
    //     if (!date) {
    //       this.setState({ date: selectedDate });
    //     } else {
    //       const priorDate = new Date(date);
    //       const nextDate = new Date(selectedDate);
    //       if (priorDate.getTime() < nextDate.getTime()) {
    //         this.setState({ date: undefined, dates: [[date, selectedDate]] });
    //       } else if (priorDate.getTime() > nextDate.getTime()) {
    //         this.setState({ date: undefined, dates: [[selectedDate, date]] });
    //       }
    //     }
    //   } else {
    //     const priorDates = dates[0].map(d => new Date(d));
    //     const previousDate = new Date(previousSelectedDate);
    //     const nextDate = new Date(selectedDate);
    //     if (nextDate.getTime() < previousDate.getTime()) {
    //       if (nextDate.getTime() < priorDates[0].getTime()) {
    //         this.setState({ dates: [[selectedDate, dates[0][1]]] });
    //       } else if (nextDate.getTime() > priorDates[0].getTime()) {
    //         this.setState({ dates: [[dates[0][0], selectedDate]] });
    //       }
    //     } else if (nextDate.getTime() > previousDate.getTime()) {
    //       if (nextDate.getTime() > priorDates[1].getTime()) {
    //         this.setState({ dates: [[dates[0][0], selectedDate]] });
    //       } else if (nextDate.getTime() < priorDates[1].getTime()) {
    //         this.setState({ dates: [[selectedDate, dates[0][1]]] });
    //       }
    //     }
    //   }
    //   this.setState({ previousSelectedDate: selectedDate });
    // }