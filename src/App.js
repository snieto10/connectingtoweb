import axios from "axios";
import React, { Component } from "react";

import "./App.css";

let apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);
    console.log(post);

    let posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await axios.put(apiEndpoint + "/" + post.id, post);

    let posts = [...this.state.posts];
    let index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th className="tableW">Title</th>
              <th className="tableW">Update</th>
              <th className="tableW">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((e) => (
              <tr key={e.id}>
                <td className="tableW">{e.title}</td>
                <td className="tableW">
                  <button onClick={() => this.handleUpdate(e)}> UPDATE</button>
                </td>
                <td className="tableW">
                  <button> DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default App;
