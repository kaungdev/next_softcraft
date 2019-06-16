import React, { Component } from "react";

import AdminLayout from "../../../components/AdminLayout";
import api from "../../../src/api";
import SamplePosts from "../../../components/SamplePosts";

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
        <AdminLayout>
          <SamplePosts posts={this.state.posts} type="admin" />`
        </AdminLayout>
      </div>
    );
  }
}
