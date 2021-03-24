import React, { Component } from "react";

class Input extends Component {
  state = { name: this.props.name || "", avatar: this.props.avatar || "" };
  handleSubmit = () => {
    this.props.handleCallback(this.state, this.props.id);
  };
  handleOnChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleOnChangeImageName = (e) => {
    this.setState({ avatar: e.target.value });
  };
  render() {
    return (
      <div>
        <label htmlFor={this.props.type}></label>
        <input
          type="text"
          id={this.props.type + this.props.id}
          name={this.props.type + this.props.id}
          placeholder={this.props.type}
          value={this.state.name}
          onChange={this.handleOnChangeName}
        />
        <label htmlFor={'image ' + this.props.type}></label>
        <input
          type="text"
          id={'image' + this.props.type + this.props.id}
          name={'image' + this.props.type + this.props.id}
          placeholder={'image ' + this.props.type}
          value={this.state.avatar}
          onChange={this.handleOnChangeImageName}
        />
        <button onClick={this.handleSubmit} disabled={this.props.isLoading}>Submit</button>
      </div>
    );
  }
}
export default Input;
