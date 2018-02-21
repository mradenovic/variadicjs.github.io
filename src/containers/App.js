import React, { PureComponent } from 'react';
import FuncCard from "../components/FuncCard";
import NavBar from "../components/NavBar";
import Dropdown from "../components/Dropdown";
import variadic from 'variadic.js';
import {Carousel} from "react-materialize";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: "Type numbers to test function",
      funcNames: {},
      currentFunc: "",
      dropdownSelection: ""
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentWillMount(){
    this.setState({funcNames: Object.keys(variadic)})
  }

  handleClick(func, e) {
    this.setState({currentFunc: func})
  }

  handleDropdownChange(value){
    this.setState({dropdownSelection: value})
  }

  componentDidUpdate(prevProps, prevState){
 
    if(this.state.dropdownSelection !== prevState.dropdownSelection){

      let newArr = this.state.funcNames.filter(e => 
        e !== this.state.dropdownSelection
      );

      newArr.unshift(this.state.dropdownSelection)
      this.setState({funcNames:newArr});
    }
  }

  render() {
    const flexContainer = {
      marginTop: "30px",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap"
    }

    const {
      subtitle,
      funcNames,
      currentFunc
    } = this.state;

    let funcCards = funcNames.map((funcName, i) => (
      <div key={i} style={{width: "400px"}}>
        <FuncCard
          funcName={funcName}
          func={variadic[funcName]}
          subtitle={subtitle}
          onClickHandler={this.handleClick}
          currentFunc={currentFunc}
        />
      </div>
    ));

    return (
      <div>
        <NavBar />
        <div style={flexContainer}>
          <Dropdown 
            data={variadic}
            handleDropdownChange={(value) => this.handleDropdownChange(value)} 
          />
          <Carousel>
            {funcCards}
          </Carousel>
        </div>
      </div>
    );
  }
}

export default App;
