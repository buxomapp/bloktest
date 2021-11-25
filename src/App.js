import React,{Component} from "react";
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      value : '',
      ans1: null,
      ans2 : null
      
    };
  }

  myChangeHandler = (event) => {
    event.preventDefault();
    this.setState({value: event.target.value});
  }

    mySubmitHandler = (event) => {
    event.preventDefault();

    //// we can put api here for serche 

    var raw = JSON.stringify({
      "jsonrpc": "2.0",
      "method": "account_history_api.get_account_history",
      "params": {
        "account": "steemit",
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
    fetch("https://api.steemit.com", requestOptions)
  .then(response => response.json())
  .then(result => 
    this.setState({
        isLoaded: true,
        ans1: result.result.history[0][1].trx_id,
        ans2 : result.result.history[0][1].op.value.props.account_creation_fee.amount,
      })
    )
  .catch(error =>
    this.setState({
      isLoaded: true,
      error
    })
     );
  }



  render() {
    const { error, isLoaded, ans1,ans2 } = this.state;
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
          <p>API Res response ( I  will put all data here because in dont know what you want  so you can serche for example "steemit")</p>
          <strong>trx_id : {ans1} </strong> <br>
          </br>
          <strong>amount : {ans2} </strong>
          
        </div>
        </div>
      );
    }
  }
}


export default MyComponent;
