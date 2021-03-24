import React, { Component } from "react";

import API from "./api/mockApi";
import Card from "./components/Card.component";
import Input from "./components/Input.component";
import Spinner from './components/Spinner'

class App extends Component {
  state = { data: [], errorMsg: "", isLoading: false };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const { data } = await API.get("avatars");
      console.log(data)
      this.setState({ data });
      this.setState({ isLoading: false });
    } catch (e) {
      this.setState({ errorMsg: e.message, isLoading: false });

    }
  }

  create = async (value) => {
    try {
      this.setState({ isLoading: true });
      if (value.name.length < 6) {
        //! our own errors that will be catched.
        throw new Error("must be more than 5 letters");
      }
      if (!value.avatar.startsWith('https://')) {
        throw new Error("Avatar must be a valid url");
      }
      const avatarExists = this.state.data.find((itemInData) => itemInData.name === value.name && itemInData.avatar === value.avatar);
      if (avatarExists) {
        throw new Error("Avatar already exists");
      }
      const newItem = {
        name: value.name,
        avatar: value.avatar
      };
      const { data } = await API.post("/avatars/", newItem);

      this.setState((state) => {
        return { data: [...state.data, data] };
      });
      this.setState({ isLoading: false });
    } catch (e) {
      this.setState({ errorMsg: e.message, isLoading: false });
    }
  };

  delete = async (id) => {
    this.setState({ isLoading: true });
    await API.delete(`/avatars/${id}`);
    const data = this.state.data.filter((item) => item.id !== id);
    this.setState({ data });
    this.setState({ isLoading: false });
  };

  update = async (value, id) => {
    this.setState({ isLoading: true });
    const updatedItem = {
      name: value.name,
      avatar: value.avatar,
    };
    const { data } = await API.put(`avatars/${id}`, updatedItem);
    const index = this.state.data.findIndex((el) => el.id === id);
    const newItems = [...this.state.data];
    const newItem = (newItems[index] = data);
    this.setState({ data: newItems });
    this.setState({ isLoading: false });
  };

  render() {

    if (this.state.isLoading) {
      return <Spinner />
    }

    return (
      <div>
        <Input type="name" handleCallback={this.create} isLoading={this.state.isLoading} />
        {this.state.data.map((el) => {
          return (
            <div key={el.id}>
              <Card data={el} />
              <Input
                type="updatedName"
                handleCallback={this.update}
                id={el.id}
                name={el.name}
                avatar={el.avatar}
                isLoading={this.state.isLoading}
              />
              <button onClick={() => this.delete(el.id)}>Delete</button>
            </div>
          );
        })}

        {<h3 style={{ color: "red" }}>{this.state.errorMsg}</h3>}
      </div>
    );
  }
}

export default App;
