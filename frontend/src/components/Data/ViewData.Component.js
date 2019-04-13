import React from 'react';
import axios from 'axios';
import { Input, Alert, Spinner } from 'reactstrap';
import AddData from './AddData.Component';
import FeatherIcon from 'feather-icons-react';
import { DataTable, Text, Box, Meter } from 'grommet';


export class ViewData extends React.Component {
  // initialize our state 
  state = {
    data: [],
    id: 0,
    admin: "all",
    itemId: null,
    name: null,
    desc: null,
    parentId: null,
    hours: null,
    dueDate: null,
    alertMsg: {
      color: "danger",
      message: null,
    },
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
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 2000);
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


  // our update method that uses our backend api
  // to overwrite existing data base information


  updateDB = (
    idToUpdate, 
    updateToApply,
    updateCurrent,
    updateToField
    ) => {
    this.setState({
      isLoading: true,
    })
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat.id;
      }
    });

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
      this.setState({ alertMsg: {message: response.data }});
  
    })
    .catch(error => {
        console.log(error.response)
    });
    if(this.state.alertMsg.success === "true") {
      this.setState({
        alertMsg: {color: "success"},
        isLoading: false
      })
      console.log("true")
    } else {
      this.setState({
        alertMsg: {color: "danger"},
        isLoading: false
      })
      console.log("false")
  }
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
    this.setState({
      isLoading: false,
      viewData: false,
      viewDatas: true,
      projectId: null
    })
  }


  authorized = () => {
    const userAccess = JSON.parse(localStorage.getItem('user_access'));
    if(userAccess === "admin") {
        this.setState({ admin: userAccess })
        this.viewDatas();
    } else {
        const userId = JSON.parse(localStorage.getItem('user_id'));
        this.setState({ admin: 'all', userId: userId });
    }
 }

  loading() {
    return(
      <div className="loading">
        <Spinner color="primary" />
        {this.authorized()}
      </div>
    );
  }
  icon(type) {

    if(type === "project") {
      return <FeatherIcon icon = "briefcase" />
    } else {
      return <FeatherIcon icon = "clipboard" />
    }
  }

  userDatas = (id, type) => {
    let { data, viewDatas, viewData, title, isLoading } = this.state;
    let newType = type;
    if(newType === "viewProjects") {
      newType = "project"
    } 
    if(isLoading !== false && title !== type) {
      this.setState({
        isLoading: false,
        title: type
      })
    }

    data = data.filter(data => data.type === type);
    if(viewDatas === true){
      return(
        <div>
        {
          data.length <= 0
          ? <FeatherIcon icon="loading"/>
          : <DataTable
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
                    header: <Text>Name</Text>
                  },
                  {
                    property: 'parentName',
                    header: <Text>User</Text>,
                    render: datem => (
                      <Text>{datem.parentName}</Text>
                    )
                  },
                  {
                    property: 'dueDate',
                    header: <Text>Due Date</Text>,
                    render: datem => (
                      <Text>{datem.dueDate}</Text>
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
                data={data}
                // data={data}
              />
            }
          </div>
      );  
      }
      if(viewData === true) {
        return(
        <div>  
          {
            data.length <= 0
            ? <FeatherIcon icon="loading"/>
            : data.filter(data => data.id === id).map(data => (
              <div key={data.id} className="viewData">
              <a
              onClick={this.viewDatas}
              className="viewDataBackLink"
              >
              <p> 
                <FeatherIcon 
                  icon="arrow-left" 
                  className="viewDataBackIcon"
                />
              Back
              </p>
              </a>
              <div className="viewDataHeading">
                  <p>{data.id}</p>
                  <h2>{data.name}</h2>
              </div>
                  {data.desc}
                  {data.type}
                  {data.hours}
                  {data.dueDate}
              </div>
            ))
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
      admin
    } = this.state;
    let userType;
    if(this.props.type === "user") {
      userType = "project";
    } else if (this.props.type === "project")  {
      userType = "viewProjects";
    } else {
      userType = "task";
    }
    if(isLoading) {
      return this.loading();
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
                  columns={data}
                  data={data}
                />
            }
            </div>
        </div>
        );
      }
    if(!isLoading && viewData) {
      return(
        <div>  
          {
            data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.filter(data => data.id === projectId).map(data => (
              <div key={data.id} className="viewUser">
              {
                (alertMsg.message) ? (
                  <Alert color="danger" style={{ marginTop: '10px' }}>
                    {alertMsg.message}
                  </Alert>
                ) : (null)
              }              
              <a
              onClick={this.viewDatas}
              className="viewUserBackLink"
              >
                <p> 
                  <FeatherIcon 
                    icon="arrow-left" 
                    className="viewUserBackIcon"
                  />
                Back
                </p>
              </a>
              <div className="row">
                <div className="col">
                  <div className="viewUserHeading">
                    
                  <div id="viewBoxHeading" className="viewUserContactView">
                    <div
                      
                      onClick={() => this.editUser(data.id, 41)}
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
                      onClick={() => this.editUser(data.id, 42)} 
                    />
                  </div>
                    
                </div>
                </div>
                <div className="col">
                  {this.addData(data)}
                </div>
              </div>
              <div className="viewUserContact">
                  <h3>{data.type}</h3>
                  <div className="row">
                    <div className="col">

                      <div id="viewBox" className="viewUserContactView">
                          <div
                            
                            onClick={() => this.editUser(data.id, 1)}
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
                            onClick={() => this.editUser(data.id, 2)} 
                          />
                        </div>
                        
                        <div id="viewBox1" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data.id, 11)}
                          className="viewUserContactViewLink"
                        >3
                          <p className="viewUserContactViewData">{data.parentId}</p>
                          <FeatherIcon className="viewUserContactViewLinkEdit" icon="edit" />
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
                            onClick={() => this.editUser(data.id, 12)} 
                          />
                        </div>
                        
                      </div>
                      <div className="col">
                        <div id="viewBox2" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data.id, 21)}
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
                            onClick={() => this.editUser(data.id, 22)} 
                          />
                        </div>

                        <div id="viewBox3" className="viewUserContactView">
                        <div
                          
                          onClick={() => this.editUser(data.id, 31)}
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
                            onClick={() => this.editUser(data.id, 32)} 
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
