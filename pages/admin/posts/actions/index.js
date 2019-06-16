import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "next/router";

import DropZone from "../../../../components/DropZone";
import cloudinaryHelper from "../../../../src/utils/cloudinary";
import utils from "../../../../src/utils";
import AdminLayout from "../../../../components/AdminLayout";
import api from "../../../../src/api";

class index extends Component {
  state = {
    form: {
      _id: null,
      title: "",
      headerImg: {
        imgId: "",
        description: ""
      },
      contents: []
    }
  };

  async componentDidMount() {
    const { id } = this.props.router.query;
    if (!id) return;
    const serverResponse = await api.getPost({ req: null, id });
    if (serverResponse.status !== "success") return;
    console.log(
      "TCL: index -> componentDidMount -> serverResponse.data",
      serverResponse.data
    );
    const { title, headerImg, contents, _id } = serverResponse.data.post;
    console.log("TCL: index -> componentDidMount -> headerImg", headerImg);
    this.setState({
      form: {
        _id,
        title,
        headerImg,
        contents
      }
    });
  }

  insertNewContent = contentType => () => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        forms: [...prevState.form.forms, { value: "", contentType }]
      }
    }));
  };

  buildInsertButton = contentType => {
    let title;
    if (contentType === "body") {
      title = "New Body";
    }
    return (
      <Button onClick={this.insertNewContent(contentType)}>{title}</Button>
    );
  };

  setContentImg = ({ imgSrc, index }) => {
    this.setState(prevState => {
      const newForms = [...prevState.form.forms];
      newForms[index].imgSrc = imgSrc;
      return {
        form: {
          ...prevState.form,
          forms: newForms
        }
      };
    });
  };

  onDrop = ({ contentType, index }) => async acceptedFiles => {
    const file = acceptedFiles[0];
    const imgId = await cloudinaryHelper.postImage({ file });
    if (contentType === "headerImage") {
      this.setState(prevState => ({
        form: {
          ...prevState.form,
          headerImg: { ...prevState.form.headerImg, imgId }
        }
      }));
    } else {
      this.setState(prevState => {
        prevState.form.contents[index].img.imgId = imgId;
        return {
          form: { ...prevState.form }
        };
      });
    }
  };

  titleChangeHandler = () => event => {
    event.persist();
    const title = event.target.value;
    this.setState(prevState => ({ form: { ...prevState.form, title } }));
  };

  buildTitleTextField = () => (
    <Grid container style={{ marginTop: 16 }}>
      <TextField
        label="Title"
        onChange={this.titleChangeHandler()}
        value={this.state.form.title}
        fullWidth
      />
    </Grid>
  );

  buildHeaderImg = () => {
    const headerImgId = this.state.form.headerImg.imgId;
    return (
      <>
        <Grid container style={{ marginTop: 16 }}>
          <Grid container>
            <Typography>Header Image</Typography>
          </Grid>
          <Grid container>
            <DropZone
              onDrop={this.onDrop({ contentType: "headerImage" })}
              isNew={!this.state.form.headerImg.imgId}
            />
          </Grid>
        </Grid>
        <Grid container>
          <img
            src={utils.getImgUrl(headerImgId)}
            alt="header img"
            style={{ height: 100, objectFit: "contain", marginTop: 16 }}
          />
        </Grid>
      </>
    );
  };

  onChangeContent = index => event => {
    event.persist();
    const { value } = event.target;
    this.setState(prevState => {
      prevState.form.contents[index].value = value;
      return { form: { ...prevState.form, contents: prevState.form.contents } };
    });
  };

  buildTextField = ({ contentType, index }) => {
    return (
      <Grid container key={index}>
        <Grid item xs={11}>
          <TextField
            value={this.state.form.contents[index].value}
            onChange={this.onChangeContent(index)}
            label={contentType}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={this.removeContent(index)}>Remove</Button>
        </Grid>
      </Grid>
    );
  };

  headerImageChangeHandler = () => event => {
    event.persist();
    const { value } = event.target;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        headerImg: { ...prevState.form.headerImg, description: value }
      }
    }));
  };

  buildHeaderImgDescription = () => {
    return (
      <TextField
        label="Header Image Description"
        onChange={this.headerImageChangeHandler()}
        value={this.state.form.headerImg.description}
        fullWidth
      />
    );
  };

  buildContentFields = () => {
    const { contents } = this.state.form;
    return contents.map((content, index) => {
      if (content.contentType === "header" || content.contentType === "body")
        return this.buildTextField({ contentType: content.contentType, index });
      else if (content.contentType === "image")
        return this.buildContentImage({
          contentType: content.contentType,
          index
        });
    });
  };

  onSubmit = async () => {
    const payload = this.state.form;
    const response = await api.createPost({ payload });
    console.log("TCL: onSubmit -> response", response);
  };

  buildContentImage = ({ contentType, index }) => {
    const { imgId, description } = this.state.form.contents[index].img;
    return (
      <Grid container key={index}>
        <Grid container style={{ marginTop: 16 }}>
          <Typography>Content Image</Typography>
        </Grid>
        <Grid container>
          <DropZone
            onDrop={this.onDrop({ contentType, index })}
            isNew={!imgId}
          />
        </Grid>
        <Grid container>
          <img
            src={utils.getImgUrl(imgId)}
            alt="content image"
            style={{ height: 100, objectFit: "contain", marginTop: 16 }}
          />
        </Grid>
        <Grid container>
          <Grid item xs={11}>
            <TextField
              label="Image Description"
              onChange={this.contentImgDescHandler(index)}
              value={description}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button onClick={this.removeContent(index)}>Remove</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  removeContent = index => () => {
    this.setState(prevState => {
      prevState.form.contents.splice(index, 1);
      return {
        form: { ...prevState.form }
      };
    });
  };

  contentImgDescHandler = index => event => {
    event.persist();
    const { value } = event.target;
    this.setState(prevState => {
      prevState.form.contents[index].img.description = value;
      return { form: { ...prevState.form } };
    });
  };

  addContent = contentType => () => {
    let img = null;
    if (contentType === "image") img = { imgId: null, description: "" };
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        contents: [...prevState.form.contents, { contentType, value: "", img }]
      }
    }));
  };

  buildAddButtons = () => (
    <Grid container>
      <Button
        variant="outlined"
        style={{ marginRight: 16 }}
        onClick={this.addContent("header")}
      >
        Add Header
      </Button>
      <Button
        variant="outlined"
        style={{ marginRight: 16 }}
        onClick={this.addContent("body")}
      >
        Add Body
      </Button>
      <Button variant="outlined" onClick={this.addContent("image")}>
        Add Image
      </Button>
    </Grid>
  );

  buildSubmitButton = () => (
    <Grid container style={{ marginTop: 16 }}>
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        onClick={this.onSubmit}
      >
        Submit
      </Button>
    </Grid>
  );

  render() {
    return (
      <AdminLayout>
        {this.buildAddButtons()}
        {this.buildTitleTextField()}
        {this.buildHeaderImg()}
        {this.buildHeaderImgDescription()}
        {this.buildContentFields()}
        {this.buildSubmitButton()}
      </AdminLayout>
    );
  }
}

export default withRouter(index);
