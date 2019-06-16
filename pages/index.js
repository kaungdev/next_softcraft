import React, { Component } from "react";

import api from "../src/api";
import SamplePosts from "../components/SamplePosts";
import Layout from "../components/Layout";

export default class index extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const { status, data } = await api.getAllPosts({ req: null });
    if (status !== "success") return;
    this.setState({ posts: data.posts });
  }

  render() {
    return (
      <div>
        <Layout>
          <SamplePosts posts={this.state.posts} type="user" />
        </Layout>
      </div>
    );
  }
}
