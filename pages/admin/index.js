import React, { Component } from "react";
import Router from "next/router";

export default class index extends Component {
  render() {
    return (
      <div>
        <button onClick={() => Router.push("/admin/posts")}>go to posts</button>
      </div>
    );
  }
}
