import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input
} from 'reactstrap';
import axios from 'axios';

export class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  
  // initialize our state 
  state = {
    data: [],
    id: 0,
    name: null,
    desc: null,
    parentId: null,
    parentName: null,
    hours: null,
    dueDate: null,
    type: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    userId: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    // this.getDataFromDb();
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

  authorized = () => {
    const userAccess = JSON.parse(localStorage.getItem('user_access'));
    if(userAccess === "admin") {
        this.setState({admin: 'admin'})
    } else {
      const userId = JSON.parse(localStorage.getItem('user_id'));
      this.setState({admin: 'all', userId: userId})
    }
 }
  parentType() {
    const { data, admin } = this.state;

      return(
        <div>
          {
            !data
            ? <Input
              type="text"
              onChange={e => this.setState({ parentName: e.target.value })}
              placeholder={this.props.type}
              />
            : <Input
                type="select"
                placeholder={this.state.type}
                onChange={e => this.setState({ parentId: e.target.key, parentName: e.target.value })}
              >
                { 
                  admin === "admin"
                  ?  data.map(data => (
                      <option key={data._id} value={data.name}>{data.name}</option>      
                    ))
                  : data.filter(data => data.parentId === this.state.userId && data.type === this.props.type ).map(data => (
                    <option key={data._id} value={data.name}>{data.name}</option>      
                  ))
                }
              </Input>
          }
          </div>
        );
    }



  // our put method that uses our backend api
  // to create new query into our database
  putDataToDB = (
    name, 
    desc, 
    parentId, 
    parentName,
    hours, 
    dueDate,
    type,
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
      type: type,
      isComplete: false
    })
    .then(response => { 
      console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    });
    this.toggle();
  };


  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/data/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  selectType() {

    return(
      <ModalBody className="fade-out">
        <FormGroup>
          <h2>What are you adding?</h2>
          <Button onClick={() => this.setState({ type: "project"})}>Project</Button>
          <Button onClick={() => this.setState({ type: "task"})}>Task</Button>
        </FormGroup>
      </ModalBody>
    );
  }



  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    let parentName = "Default";
    let parentId = null;
    let { type } = this.state; 
    if(this.props.parent != null) {
      parentId = this.props.parent._id;
      if(this.props.parent.company) {
        if(type !== "project"){
          this.setState({ type: "project" })
        }
        parentName = this.props.parent.company;
      } else {
        if(type !== "task") {
          this.setState({ type: "task" })
        }
        parentName = this.props.parent.name;
      }
    }

    return (  
      <div className="viewUserButton">
        <Button color="dark" onClick={this.toggle}>Add {type}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add a {type}</ModalHeader>
          {
            !this.state.type
            ? this.selectType()
            : <ModalBody>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={e => this.setState({ name: e.target.value })}
                      placeholder="Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={e => this.setState({ desc: e.target.value })}
                      placeholder="Desc"
                    />
                  </FormGroup>
                  <FormGroup>
                  {
                      parentId != null
                      ? <Input
                          type="text"
                          placeholder={parentName}
                          disabled
                        />
                      : this.parentType()
                  }
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      onChange={e => this.setState({ hours: e.target.value, parentId: parentId, parentName: parentName })}
                      placeholder="Hours"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="date"
                      onChange={e => this.setState({ dueDate: e.target.value })}
                      placeholder="DueDate"
                      
                    />
                  </FormGroup>          
              </ModalBody>
            }

          <ModalFooter>
          <Button
            color="dark" 
            onClick={() => this.putDataToDB(
              this.state.name, 
              this.state.desc, 
              this.state.parentId,
              this.state.parentName,
              this.state.hours, 
              this.state.dueDate,
              this.state.type
            )}
          >
          ADD
          </Button>
          </ModalFooter>
        </Modal>
      </div>

        
    );
  }
}

export default AddData;
