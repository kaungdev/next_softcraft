import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const AdminLayout = props => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <a href="/">
            <Typography variant="h6" color="inherit">
              SoftCraft
            </Typography>
          </a>
          <div style={{ flex: 1 }} />
          <Button color="secondary">Posts</Button>
          <Button color="secondary">Create Post</Button>
          <Button color="secondary">Login</Button>
        </Toolbar>
      </AppBar>
      <Grid container style={{ marginTop: 16 }}>
        <Grid item xs={1} md={4} />
        <Grid item xs={10} md={4}>
          {props.children}
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminLayout;
