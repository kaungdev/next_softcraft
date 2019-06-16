import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Router from "next/router";

import Layout from "../../../components/Layout";
import api from "../../../src/api";
import utils from "../../../src/utils";

export default class index extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const { status, data } = await api.getAllPosts({ req: null });
    if (status !== "success") return;
    this.setState({ posts: data.posts });
  }

  renderCards = posts => {
    return posts.map(post => (
      <Card key={post._id}>
        <CardActionArea>
          <CardMedia
            style={{ height: 150 }}
            image={utils.getImgUrl(post.headerImg.imgId)}
            title="Header"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {utils.getSampleContent(post.contents)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => Router.push("/admin/posts/actions?id=" + post._id)}
          >
            Edit
          </Button>
          <Button size="small" style={{ color: "red" }}>
            Delete
          </Button>
        </CardActions>
      </Card>
    ));
  };

  render() {
    return (
      <div>
        <Layout>{this.renderCards(this.state.posts)}</Layout>
      </div>
    );
  }
}
