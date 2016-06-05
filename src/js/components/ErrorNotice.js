
import React from "react";

export default class ErrorNotice extends React.Component{
  render() {
    console.log("here");
    return (
      <div class="list-group">
        <ul>
          {this.props.errors.map(function(error, index){
            return <li class="list-group-item list-group-item-danger" key={"error-"+index}>{error}</li>;
          })}
        </ul>
      </div>
      );
  }
}
