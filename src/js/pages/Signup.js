import React from "react";
import {findDOMNode} from "react-dom";
import * as SessionActions from "../actions/SessionActions";
import SessionStore from "../stores/SessionStore";
import ErrorNotice from "../components/ErrorNotice";

export default class Signup extends React.Component {
  constructor(){
    super();
    this.state = {errors: []};
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  } 
 
  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("changed...");
    const errors = SessionStore.getErrors();
    console.log("errors: " + errors);
    this.setState({errors});
    console.log("this.state.errors" + this.state.errors);
  }

  _onSubmit(e) {
    let errors = [];
    e.preventDefault();
    this.setState({errors});
    const email = findDOMNode(this.refs.email).value;
    const username = findDOMNode(this.refs.username).value;
    const password = findDOMNode(this.refs.password).value;
    const passwordConfirmation = findDOMNode(this.refs.passwordConfirmation).value;
    if (password !== passwordConfirmation) {
      errors = ['Password and password confirmation should match'];
      this.setState({errors});
    } else {
      SessionActions.signup(email, username, password, passwordConfirmation);
    }
  }

  render() {
    console.log("errors length: " + this.state.errors.length);
    const errors = (this.state.errors.length > 0) ? (<ErrorNotice errors={this.state.errors} />) : (<div></div>);
    console.log("errors: " + errors);
    return (
      <div class="session-wrapper container-fluid">
        <div class="row">
          <div class="col-xs-4 col-xs-offset-4">       
            {errors}
            <ErrorNotice errors={this.state.errors} />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4 col-xs-offset-4">
            <h2>Sign up</h2>
          </div>  
        </div>      
        <div class="row">
          <div class="col-xs-4 col-xs-offset-4">
            <form onSubmit={this._onSubmit}>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Email" ref="email" /> 
              </div>
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Username" ref="username" /> 
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" ref="password" />
              </div>
              <div class="form-group">
                <label for="password-confirmation">Password Confirmation</label>
                <input type="password" class="form-control" id="password-confirmation" placeholder="Password Confirmation" ref="passwordConfirmation" />
              </div>
              <button type="submit" class="btn btn-default">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};
