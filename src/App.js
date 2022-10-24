import axios from "axios";
import React, { Component } from "react";
import http from "./services/httpService";
import "./App.css";

let apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await http.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(apiEndpoint, obj);
    let posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await http.put(apiEndpoint + "/" + post.id, post);

    let posts = [...this.state.posts];
    let index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  // apiEndpoint + "/" + post.id, post
  //'https://httpstat.us/404'

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(apiEndpoint + "/" + post.id);
    } catch (error) {
      alert("This post has been already been deleted, error 404");

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <>
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
                  <button onClick={() => this.handleDelete(e)}> DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
export default App;
