import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import Grid from "@material-ui/core/Grid";
import localforage from "localforage";
import Router from "next/router";

import api from "../../src/api";

export default class index extends Component {
  state = {
    token: null
  };

  responseFacebook = async fbResponse => {
    if (!fbResponse.accessToken) return;
    this.setState({ isLoading: true });
    const { status, data } = await api.postAuth({
      accessToken: fbResponse.accessToken
    });
    if (status !== "success") return;
    const { token } = data;
    await localforage.setItem("token", token);
    Router.push("/admin/post");
  };

  render() {
    return (
      <Grid container>
        <FacebookLogin
          appId="376549709623092"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
        />
      </Grid>
    );
  }
}
