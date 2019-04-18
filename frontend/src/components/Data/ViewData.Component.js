import React from 'react';
import axios from 'axios';
import { Input, Alert, Button } from 'reactstrap';
import AddData from './AddData.Component';
import FeatherIcon from 'feather-icons-react';
import { DataTable, Text, Box, Meter, CheckBox } from 'grommet';
import { IsLoading } from '../IsLoading.Component';


export class ViewData extends React.Component {
  // initialize our state 
  state = {
    data: [],
    sortedData: [],
    dataTableColumns:
      [
        {
          id: 0,
          property: 'type',
          align: "center",
          header: <Text>Type</Text>,
          render: datem => (
            <Text>{this.icon(datem.type)}</Text>
          ),
        },
        {
          id: 1,
          property: 'name',
          header: <Text>Name</Text>,
          render: datem => (
            <Button 
                  color="none"
                  className="btn-link viewUserDataButton" 
                  onClick={() => this.viewData(datem._id)}
                >
                  <Text className="viewUserDataLink">
                      {datem.name} 
                      <FeatherIcon className="viewUserDataLinkIcon" icon="arrow-right" />
                    </Text>
            </Button>
          ),
        },
        {
          id: 2,
          property: 'parentName',
          header: <Text>User</Text>,
          render: datem => (
            <Text>{datem.parentName}</Text>
          )
        },
        {
          id: 3,
          property: 'hours',
          header: 'Complete',
          align: 'center',
          render: datem => (
            
            <Box size='small' pad='xsmall'> 
              { 
               datem.type === "project"
              ? <Meter
                  values={this.calculateData(datem._id)}
                  thickness="small"
                  size="small"
                />  
              : <CheckBox
                  checked={datem.isComplete}
                  size="small"
                  className="text-center"
                  onChange={(event) => this.isComplete(event.target.checked, datem._id)}
                />
              }
            </Box>
            
          ),
        }
    ],
    id: 0,
    admin: "all",
    itemId: null,
    name: null,
    desc: null,
    parentId: null,
    hours: null,
    dueDate: null,
    alertMsg: null,
    alertMsgClr: "danger",
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    isLoading: false,
    dataType: "project",
    dataField: [],
    viewData: false,
    viewDatas: true,
    projectId: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object 
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify 
  // data base entries

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getDataFromDb = () => {
    fetch("http://localhost:3001/api/data/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));

  };

  // our put method that uses our backend api
  // to create new query into our database
  putDataToDB = (
    name, 
    desc, 
    parentName,
    parentId, 
    hours, 
    dueDate,
    type
    ) => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/data/putData", {
      id: idToBeAdded,
      name: name,
      desc: desc,
      parentId: parentId,
      parentName: parentName,
      hours: hours,
      dueDate: dueDate,
      type: type
    })
    .then(response => { 
      console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    });
  };


  
  editUser = (id, num) => {
    const editBoxHeading = document.getElementById("editBoxHeading");
    const viewBoxHeading = document.getElementById("viewBoxHeading");

    const editBox = document.getElementById("editBox");
    const viewBox = document.getElementById("viewBox");

    const editBox1 = document.getElementById("editBox1");
    const viewBox1 = document.getElementById("viewBox1");

    const editBox2 = document.getElementById("editBox2");
    const viewBox2 = document.getElementById("viewBox2");

    const editBox3 = document.getElementById("editBox3");
    const viewBox3 = document.getElementById("viewBox3");

    const editBoxPassword = document.getElementById("editBoxPassword");
    const viewBoxPassword = document.getElementById("viewBoxPassword");

    const editBox4 = document.getElementById("editBox4");
    const viewBox4 = document.getElementById("viewBox4");

    console.log(id);
    const { updateToApply, updateCurrent, updateToField } = this.state;

    if(num === 1) {

      viewBox.style.display = "none";
      editBox.style.display = "flex";
      
    }
    if(num === 2) {
      editBox.style.display = "none";
      viewBox.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 11) {

      viewBox1.style.display = "none";
      editBox1.style.display = "flex"; 
    }
    if(num === 12) {
      editBox1.style.display = "none";
      viewBox1.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 21) {

      viewBox2.style.display = "none";
      editBox2.style.display = "flex"; 
    }
    if(num === 22) {
      editBox2.style.display = "none";
      viewBox2.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 31) {

      viewBox3.style.display = "none";
      editBox3.style.display = "flex";
    }
    if(num === 32) {
      editBox3.style.display = "none";
      viewBox3.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 41) {

      viewBoxHeading.style.display = "none";
      editBoxHeading.style.display = "flex"; 
    }
    if(num === 42) {
      editBoxHeading.style.display = "none";
      viewBoxHeading.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 51) {

      viewBoxPassword.style.display = "none";
      editBoxPassword.style.display = "flex";
    }
    if(num === 52) {
      editBoxPassword.style.display = "none";
      viewBoxPassword.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    if(num === 61) {
      viewBox4.style.display = "none";
      editBox4.style.display = "flex";
      
    }
    if(num === 62) {
      editBox4.style.display = "none";
      viewBox4.style.display = "block";

      this.updateDB(id, updateToApply, updateCurrent, updateToField);
    }
    
  }



  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat.id;
      }
    });
    axios.delete("http://localhost:3001/api/data/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };


  isComplete = (checked, id) => {
    const idToUpdate = id, updateToField = "isComplete", updateToApply = checked;
    const  updateCurrent = !updateToApply;


    this.state.data.forEach(dat => {
      if(dat._id === idToUpdate && dat.isComplete !== checked) {
        dat.isComplete = updateToApply;
        this.updateDB(
          idToUpdate, 
          updateToApply,
          updateCurrent,
          updateToField
        );
      } else {
        console.log("Error, cannot resolve data ID")
      }
    });
    
  }

  updateDB = (
    idToUpdate, 
    updateToApply,
    updateCurrent,
    updateToField
    ) => {
    this.setState({
      isLoading: true,
      updateToField: updateToField
    })
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat._id === idToUpdate) {
        objIdToUpdate = dat.id;
      }
    });
    console.log(objIdToUpdate);

    console.log(objIdToUpdate, updateCurrent, updateToApply, updateToField)
    axios.post("http://localhost:3001/api/data/updateData", {
      headers: {
        'Content-Type': 'application/json'
      },
      id: objIdToUpdate,
      current: updateCurrent,
      update: updateToApply,
      field: updateToField,
    })   
    .then(response => { 
      console.log(response)
      if(response) {
      this.setState({ alertMsg: response.data, color: "success" });
      }
      console.log(response);
    })
    .catch(error => {
      if(error) {
        this.setState({ alertMsg: error.response, color: "danger" });
        }
        console.log(error.response)
    });
    this.setState({
      isLoading: false,
    })
  };
  viewData(id) {
    this.setState({
      isLoading: false,
      viewDatas: false,
      viewData: true,
      projectId: id
    })
    
  }
  viewDatas = () => {
    console.log("yeh?!");
    this.setState({
      isLoading: false,
      viewData: false,
      viewDatas: true,
      projectId: null
    })
  }

//Attempting to get the percentage of tasks completed out of all tasks associated with each project but unsuccessful
  // calculateData = (id) => {
  //   let dataArray = [],
  //   totalComplete = [];
  //   this.state.data.forEach(dat => {
  //     if(dat.parentId === id ) {
  //       dataArray = dataArray.concat(dat)
  //       if(dat.isComplete === true)
  //         totalComplete = totalComplete.concat(dat)
  //     } 
  //   })
  //   console.log(dataArray.length, totalComplete.length);
  //   const percent = (dataArray.length - totalComplete.length) /dataArray 
  //   console.log(percent);
  //   return percent

  // }


  authorized = () => {
    
    const userAccess = JSON.parse(localStorage.getItem('user_access'));
    if(userAccess === "admin") {
        if(this.state.admin !== userAccess) {
          this.setState({ admin: userAccess })
        }
        this.viewDatas();
    } else {
        const userId = JSON.parse(localStorage.getItem('user_id'));
        this.setState({ admin: 'all', userId: userId });
    }
 }

 isLoading(data) {
  setInterval(this.authorized, 5000);
  return <IsLoading />
 
}

  icon(type) {

    if(type === "project") {
      return <FeatherIcon icon = "briefcase" />
    } else {
      return <FeatherIcon icon = "clipboard" />
    }
  }

  //Broken function, could not fix the error I got for it
  //Data was for some reason not recognized as an array here
  // sortData = (bool) => {
  //   let sortedData = [];
  //   const { data, dataTableColumns } = this.state;
  //   console.log("data before: " + data);
  //   if(data) {
  //     data.forEach(dat => {
  //       if(dat.isComplete === bool) {
  //         sortedData = sortedData.concat(dat);
  //       }
  //     })
  //     console.log("data after: " + sortedData);
  //     return(
  //       <DataTable
  //         sortable={true}
  //         primaryKey="_id"
  //         columns={dataTableColumns}
  //       />
  //     );
  //   } else {
  //     console.log("There was an error with the receieved data: " + data + ", " + bool )
  //   }

  // }

  userDatas = (id, type) => {
    let { 
      data, 
      viewDatas, 
      title, 
      isLoading, 
      dataTableColumns,
      admin
    } = this.state;
    
    if(isLoading !== false && title !== type) {
      this.setState({
        isLoading: false,
        title: type
      })
    }

    if(id) {
      data = data.filter(data => data.type === type && data.parentId === id);
    } else {
      data = data.filter(data => data.type === type);
    }
    if(viewDatas === true){
      return(
        <div>
        {
          data.length <= 0 || data.length == undefined
          ? this.isLoading(data)
          : <DataTable
              sortable={true}
              primaryKey="_id"
              className="viewUserDataTable"
              columns={dataTableColumns}
              data={data}
            />
          }
          </div>
      );  
    }
  }

  addData = (data) => {
      return(
        <AddData parent={data} />
      );
    
  }

  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { 
      data,
      isLoading,
      viewData,
      viewDatas,
      projectId,
      alertMsg,
      alertMsgClr,
      dataTableColumns,
      admin

    } = this.state;
    let userType;
    if(this.props.user) {
      userType = "project";
    } else if (this.props.project)  {
      userType = "project";
    } else {
      userType = "task";
    }
    if(isLoading) {
      {this.authorized()}
      return <IsLoading />

    }
    if(!isLoading && viewDatas) {
      return (
        <div className="row">
          <div className="col-md-12">
          {
            admin !== "admin"
            ? this.userDatas(this.props.id, userType)
            : <DataTable
                sortable={true}
                primaryKey="_id"
                className="viewUserDataTable"
                columns={dataTableColumns}
                data={data}
              />
          }
            {/* {
              admin !== "admin"
              ? this.userDatas(this.props.id, userType)
              : <DataTable
                  sortable={true}
                  primaryKey="_id"
                  className="viewUserDataTable"
                  columns={dataTableColumns}
                  data={data}
                />
            } */}
            </div>
        </div>
        );
      }
    if(!isLoading && viewData) {
      return(
        <div>  
          {
            data.length <= 0
            ? <IsLoading />
            : data.filter(data => data._id === projectId).map(data => (
              <div key={data._id} className="viewUser">
              {
                (alertMsg) ? (
                  <Alert color={alertMsgClr} style={{ marginTop: '10px' }}>
                    {alertMsg}
                  </Alert>
                ) : (null)
              }              
            <Button
              onClick={() => this.viewDatas()}
              color="none"
              className="btn-link viewUserDataButton" 
              >
                <Text className="viewUserDataLink viewUserBackLink">
                  <FeatherIcon 
                    icon="arrow-left" 
                    className="viewUserDataLinkIcon viewUserBackIcon"
                  />
                  Back
                </Text>
              </Button>
              <div className="row">
                <div className="col">
                  
                  <div className="viewUserHeading">
                  <div id="viewBoxHeading" className="viewUserContactView">
                  <label className="viewUserContactViewType">Name:</label>
                    <div
                      onClick={() => this.editUser(data._id, 41)}
                      className="viewUserContactViewLink"
                    >
                      <h2 className="viewUserContactViewData">{data.name}</h2>
                      <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                    </div>
                </div>
                <div id="editBoxHeading" className="viewUserContactEdit">
                    <Input 
                      type="text"
                      onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.name, updateToField: "name" })}
                      placeholder={data.name}
                    >         
                    </Input>
                    <FeatherIcon 
                      color="success" 
                      className="viewUserContactCheck" 
                      icon="check"
                      onClick={() => this.editUser(data._id, 42)} 
                    />
                  </div>
                    
                </div>
                </div>
                <div className="col">
                  {this.addData(data)}
                </div>
              </div>

              <div className="viewUserContact">
                  <h3>{data.type} details:</h3>
                  <div className="row">
                    <div className="col">

                      <div id="viewBox" className="viewUserContactView">
                        <label className="viewUserContactLabel">Description:</label>
                          <div
                            
                            onClick={() => this.editUser(data._id, 1)}
                            className="viewUserContactViewLink"
                          >
                            <p className="viewUserContactViewData">{data.desc}</p>
                            <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                          </div>
                        </div>
                        <div id="editBox" className="viewUserContactEdit">
                          <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.desc, updateToField: "desc" })}
                            placeholder={data.desc}
                          >         
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data._id, 2)} 
                          />
                        </div>
                        
                        <div id="viewBox1" className="viewUserContactView">
                        <label className="viewUserContactLabel">Parent:</label>
                        <div
                          // onClick={() => this.editUser(data._id, 11)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.parentName}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="x-circle" />
                        </div>
                      </div>
                        <div id="editBox1" className="viewUserContactEdit">
                        <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.parentId, updateToField: "parentId" })}
                            placeholder={data.parentId}
                          >            
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data._id, 12)} 
                          />
                        </div>
                        
                      </div>
                      <div className="col">
                        <div id="viewBox2" className="viewUserContactView">
                        <label className="viewUserContactLabel">Hours Logged:</label>
                        <div
                          
                          onClick={() => this.editUser(data._id, 21)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.hours}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                        </div>
                      </div>
                        <div id="editBox2" className="viewUserContactEdit">
                        <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.hours, updateToField: "hours" })}
                            placeholder={data.hours}
                          >            
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data._id, 22)} 
                          />
                        </div>

                        <div id="viewBox3" className="viewUserContactView">
                        <label className="viewUserContactLabel">Due Date:</label>
                        <div
                          
                          onClick={() => this.editUser(data._id, 31)}
                          className="viewUserContactViewLink"
                        >
                          <p className="viewUserContactViewData">{data.dueDate}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
                        </div>
                      </div>
                        <div id="editBox3" className="viewUserContactEdit">
                        <Input 
                            type="text"
                            onChange={e => this.setState({ updateToApply: e.target.value, updateCurrent: data.dueDate, updateToField: "dueDate" })}
                            placeholder={data.dueDate}
                          >    
                          </Input>
                          <FeatherIcon 
                            color="success" 
                            className="viewUserContactCheck" 
                            icon="check"
                            onClick={() => this.editUser(data._id, 32)} 
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                  { data.type === "project" 
                    ? <ViewData id={data._id} type="task"/>
                    : null
                  }
                </div>
            ))
          }
        </div>
      ); 
      }
    }

  }

  export default ViewData;
