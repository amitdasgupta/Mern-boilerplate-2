import React from "react";
import axios from "axios";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Snackbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

import Delete from "@material-ui/icons/Delete";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  inputField: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
});

const DEFAULT_STATE = {
  url: "",
  siteId: "",
  email: "",
  tags: [],
  blockedUrls: [],
  setSize: "",
  oldTag: "",
  newTag: "",
  batchSize: "",
  platform: "",
  priority: "",
  blockUrl: "",
  open: false,
  error: false,
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      siteId: "",
      email: "",
      tags: [],
      blockedUrls: [],
      setSize: "",
      oldTag: "",
      newTag: "",
      batchSize: "",
      platform: "",
      priority: "",
      blockUrl: "",
      open: false,
      error: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleTags = () => {
    const { oldTags, newTags, apTags } = this.state;

    this.setState({ apTags: [...apTags, { oldTags, newTags }] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      url,
      siteId,
      email,
      batchSize,
      platform,
      priority,
      blockedUrls,
      setSize,
      tags,
      error,
    } = this.state;

    const isValid = !!(
      siteId &&
      url &&
      email &&
      platform &&
      priority &&
      batchSize &&
      setSize &&
      blockedUrls.length &&
      tags.length
    );

    const data = {
      url,
      siteId,
      email,
      batchSize,
      platform,
      priority,
      blockedUrls,
      setSize,
      tags,
    };

    if (!isValid) {
      this.setState({ error: true });
    } else {
      console.log(data);

      axios
        .post("/api/lighthouse", data)
        .then((res) => {
          console.log(`response - ${res}`);
        })
        .catch((err) => {
          console.log(`error - ${err}`);
        });

      this.setState(DEFAULT_STATE);
    }
  };

  handleSelect = (value, key) => {
    this.setState({ [key]: value });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleAdd = () => {
    const { blockUrl, blockedUrls } = this.state;

    if (!blockUrl) {
      this.setState({ open: true });
    } else {
      this.setState({
        blockUrl: "",
        open: false,
        blockedUrls: [...blockedUrls, blockUrl],
      });
    }
  };

  handleAddTag = () => {
    const { oldTag, newTag, tags } = this.state;

    if (!oldTag || !newTag) {
      this.setState({ open: true });
    } else {
      this.setState({
        tags: [...tags, { oldTag, newTag }],
        oldTag: "",
        newTag: "",
      });
    }
  };

  handleDelete = (index) => {
    const { blockedUrls } = this.state;
    blockedUrls.splice(index, 1);
    this.setState({ blockedUrls });
  };

  handleDeleteTag = (index) => {
    const { tags } = this.state;
    tags.splice(index, 1);
    this.setState({ tags });
  };

  renderTagsField() {}

  render() {
    const { classes } = this.props;
    const {
      platform,
      url,
      siteId,
      batchSize,
      priority,
      email,
      setSize,
      blockUrl,
      oldTag,
      newTag,
      error,
    } = this.state;

    return (
      <div className='box'>
        <div className='box-primary'>
          <img
            src={
              "https://www.adpushup.com/wp-content/uploads/2020/02/support_1a_changes-e1581649133824.png"
            }
            height='300px'
            alt=''
          />
        </div>
        <div className='box-secondary'>
          <Typography variant='h3' component='h2'>
            AP Optimizer
          </Typography>

          <React.Fragment>
            <TextField
              placeholder='Enter the URL'
              label='Enter the URL*'
              variant='outlined'
              fullWidth
              name='url'
              value={url}
              className={classes.inputField}
              onChange={this.handleChange}
              error={error && !url}
            />
            <TextField
              placeholder='Enter Site Id'
              label='Site Id*'
              variant='outlined'
              fullWidth
              name='siteId'
              value={siteId}
              className={classes.inputField}
              onChange={this.handleChange}
              error={error && !siteId}
            />
            <TextField
              placeholder='Enter Your E-mail Address'
              label='E-mail*'
              variant='outlined'
              fullWidth
              name='email'
              value={email}
              className={classes.inputField}
              onChange={this.handleChange}
              error={error && !email}
            />
            <FormControl fullWidth className={classes.inputField}>
              <InputLabel id='demo-simple-select-label'>Batch Size*</InputLabel>

              <Select
                name='batchSize'
                onChange={this.handleChange}
                value={batchSize}
                error={error && !batchSize}
              >
                <MenuItem value=''>Choose the batch size</MenuItem>
                <MenuItem value='5'>5</MenuItem>
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value='15'>15</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder='Number of Sets'
              label='Enter Number of Sets*'
              fullWidth
              name='setSize'
              value={setSize}
              onChange={this.handleChange}
              className={classes.inputField}
              error={error && !setSize}
            />
            <FormControl fullWidth className={classes.inputField}>
              <InputLabel id='demo-simple-select-label'>Platform*</InputLabel>

              <Select
                name='platform'
                onChange={this.handleChange}
                value={platform}
                error={error && !platform}
              >
                <MenuItem value=''>Choose the Platform</MenuItem>
                <MenuItem value='mobile'>Mobile</MenuItem>
                <MenuItem value='Desktop'>Desktop</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth className={classes.inputField}>
              <InputLabel id='demo-simple-select-label'>Priority*</InputLabel>

              <Select
                name='priority'
                value={priority}
                onChange={this.handleChange}
                error={error && !priority}
              >
                <MenuItem value=''>Choose Priority</MenuItem>
                <MenuItem value='low'>Low</MenuItem>
                <MenuItem value='normal'>Normal</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='high'>High</MenuItem>
                <MenuItem value='critical'>Critical</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  name='oldTag'
                  label='Current Tag*'
                  placeholder='Add current running tag'
                  value={oldTag}
                  margin='normal'
                  className={classes.inputField}
                  onChange={this.handleChange}
                  error={error && !oldTag && !this.state.tags.length}
                />{" "}
              </Grid>
              <Grid item xs={5}>
                <TextField
                  placeholder='Enter APTag Id'
                  label='Ap Tag Id*'
                  margin='normal'
                  className={classes.inputField}
                  name='newTag'
                  value={newTag}
                  onChange={this.handleChange}
                  error={error && !newTag && !this.state.tags.length}
                />{" "}
              </Grid>

              <Grid item xs={2}>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  style={{ marginTop: "25px" }}
                  size='small'
                  onClick={this.handleAddTag}
                >
                  Add{" "}
                </Button>
              </Grid>
            </Grid>

            {this.state.tags.map((val, index) => (
              <Grid key={index} container spacing={2}>
                <Grid item xs={5}>
                  <TextField
                    value={val.oldTag}
                    margin='normal'
                    className={classes.inputField}
                  />{" "}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    margin='normal'
                    className={classes.inputField}
                    value={val.newTag}
                  />{" "}
                </Grid>

                <Grid item xs={2}>
                  <IconButton
                    color='primary'
                    onClick={() => this.handleDeleteTag(index)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  name='blockUrl'
                  label='Block URLs*'
                  placeholder='Block URLs'
                  fullWidth
                  value={blockUrl}
                  margin='normal'
                  className={classes.inputField}
                  onChange={this.handleChange}
                  error={error && !blockUrl && !this.state.blockedUrls.length}
                />
              </Grid>

              <Grid item xs={2}>
                {" "}
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  style={{ marginTop: "25px" }}
                  size='small'
                  onClick={this.handleAdd}
                >
                  Add{" "}
                </Button>
              </Grid>
            </Grid>
            <Snackbar
              message='Please enter something to add'
              open={this.state.open}
              onClose={() => this.setState({ open: false })}
              autoHideDuration={2000}
            />

            <List>
              {this.state.blockedUrls.map((val, index) => (
                <ListItem key={index}>
                  <ListItemText primary={val} />
                  <ListItemSecondaryAction>
                    <IconButton
                      color='primary'
                      onClick={() => this.handleDelete(index)}
                      style={{ marginRight: "30px" }}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='generate-button'
              fullWidth
              style={{ marginTop: "20px" }}
              onClick={this.handleSubmit}
            >
              Generate Scores
            </Button>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
