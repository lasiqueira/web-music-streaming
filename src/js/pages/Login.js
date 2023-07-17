import React from "react";
import {findDOMNode} from "react-dom";
import * as SessionActions from "../actions/SessionActions";
import SessionStore from "../stores/SessionStore";
import ErrorNotice from "../components/ErrorNotice";

export default class Login extends React.Component {
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
    const errors = SessionStore.getErrors();
    this.setState({errors});
  }

  _onSubmit(e) {
    const errors = [];
    e.preventDefault();
    this.setState({errors});
    const email = findDOMNode(this.refs.email).value;
    const password = findDOMNode(this.refs.password).value;
    SessionActions.login(email, password);
  }

  render() {
    const errors = (this.state.errors.length > 0) ? (<ErrorNotice errors={this.state.errors} />) : (<div></div>);
    return (
      <div class="session-wrapper container-fluid">
        <div class="row">
          <div class="col-xs-4 col-xs-offset-4">       
            {errors}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4 col-xs-offset-4">
            <h2>Sign in</h2>
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
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Password" ref="password" />
              </div>
              <button type="submit" class="btn btn-default">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};
