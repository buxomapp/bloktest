import React,{Component} from "react";



class MyComponent extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      value : '',
      ans1: [],
    };
  }

  myChangeHandler = (event) => {
    event.preventDefault();
    this.setState({value: event.target.value});
  }

    mySubmitHandler = (event) => {
    event.preventDefault();

    //// we can put api here for serche 

  
  }

  componentDidMount() {
    var raw = JSON.stringify({
      "jsonrpc": "2.0",
      "method": "account_history_api.get_account_history",
      "params": {
        "account": "steemit", // also we can put this for serche = > ...... this.state.value,
        "start": 1000,
        "limit": 1000
      },
      "id": 1
    });
    var requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    };


     fetch("https://api.steemit.com",requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            ans1: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  

  render() {
    const { error, isLoaded, ans1 } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded ) {
      return <div></div>;
    } else {
      return (

        <div>
         <form onSubmit={this.mySubmitHandler}>
          <label>
            Name:
            <input type="text" onChange={this.myChangeHandler}  />
          </label>
          <input type="submit" value="Submit" />
          <hr></hr>
        </form>
        

        <div>
          <p>API Res response ( I put a data as example)</p>
          <strong>trx_id : {ans1.result.history[0][1].trx_id} </strong> <br>
          </br>
          
        </div>
        </div>
      );
    }
  }
}


export default MyComponent;
