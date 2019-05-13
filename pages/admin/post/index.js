import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Router from "next/router";

import api from "../../../src/api";
import userHelper from "../../../src/utils/user";

export default class index extends Component {
  async componentDidMount() {
    const token = await userHelper.getToken();
    api.getUserPosts({ token });
  }

  render() {
    return <div>hi</div>;
  }
}
