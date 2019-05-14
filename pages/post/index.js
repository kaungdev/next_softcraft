import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import utils from "../../src/utils";
import api from "../../src/api";
import Layout from "../../components/Layout";

export default class index extends Component {
  static async getInitialProps({ query, req }) {
    const { id } = query;
    const { status, data } = await api.getPost({ req, id });
    if (status !== "success") return;
    const { post } = data;
    return { initialProps: { ...post } };
  }

  componentDidMount() {
    console.log(this.props.initialProps);
  }

  buildContents() {
    const { contents } = this.props.initialProps;
    return contents.map(content => {
      if (content.contentType === "header") {
        return (
          <Grid container>
            <Typography variant="h6">{content.value}</Typography>
          </Grid>
        );
      } else if (content.contentType === "body") {
        return content.value.split("\n").map((text, i) => (
          <Grid container key={i}>
            <Typography paragraph>{text}</Typography>
          </Grid>
        ));
      } else if (content.contentType === "image") {
        return (
          <>
            <Grid container>
              <img
                src={utils.getImgUrl(content.img.imgId)}
                alt=""
                style={{ maxHeight: 300, width: "100%", objectFit: "contain" }}
              />
            </Grid>
            <Grid container>
              <Typography variant="body2">{content.img.description}</Typography>
            </Grid>
          </>
        );
      }
    });
  }

  buildHeader() {
    const { headerImg, title } = this.props.initialProps;
    return (
      <Grid container style={{ marginBottom: 16 }}>
        <Grid container>
          <Typography variant="h5" paragraph>
            {title}
          </Typography>
        </Grid>
        <Grid container>
          <img
            src={utils.getImgUrl(headerImg.imgId)}
            alt=""
            style={{ maxHeight: 300, width: "100%", objectFit: "contain" }}
          />
        </Grid>
        <Grid container justify="center">
          <Typography variant="body2">{headerImg.description}</Typography>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        <Layout>
          {this.buildHeader()}
          {this.buildContents()}
        </Layout>
      </div>
    );
  }
}
