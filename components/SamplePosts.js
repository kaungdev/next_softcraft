import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Router from "next/router";

import utils from "../src/utils";

const renderPosts = ({ posts, type }) => {
  return posts.map(post => (
    <Card key={post._id} onClick={() => Router.push("/post?id=" + post._id)}>
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
      {type === "admin" && (
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
      )}
    </Card>
  ));
};

const SamplePost = ({ posts, type }) => {
  return renderPosts({ posts, type });
};

export default SamplePost;
