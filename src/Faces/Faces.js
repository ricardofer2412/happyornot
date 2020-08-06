import React from 'react'
import happyFace from '../imgs/happy.png'
import notHappyFace from '../imgs/notHappy.png'
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const classes = {
  faceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100
  },
  title: {
    color: 'gray'
  },
  mainContainer: {
    marginTop: 50,
    marginBottom: 50
  },
  titleContainer: {

  },
  paper: {

    width: "90%"
  }

}
class Faces extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      happyCount: 0,
      notHappyCount: 0,
      open: false,
      openNot: false
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true }
      ,
      () => {
        setTimeout(function () {
          this.setState({ open: false })
        }, 5000);//5 Second delay   
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  happyClicks = () => {
    this.setState({
      happyCount: this.state.happyCount + 1,
      open: true
    },
      () => {
        setTimeout(() => {
          this.setState({ open: false })
        }, 10000);//5 Second delay   
      })
    console.log(this.state.happyCount)
  }
  notHappyClicks = () => {
    this.setState({
      notHappyCount: this.state.notHappyCount + 1,
      openNot: true
    })
  }
  sendForm = () => {
    this.setState({
      openNot: false
    })
    console.log(this.state.notHappyCount)
  }


  render() {

    return (
      <Container maxWidth="lg" style={classes.mainContainer}>
        <Paper elevation={3}>
          <Container style={classes.titleContainer}>
            <Typography style={classes.title} variant='h2' align='center'>PLEASE RATE YOUR EXPERIENCE TODAY</Typography>
          </Container>
          <Container style={classes.faceContainer}>
            <img
              src={happyFace}
              alt="happyFace"
              onClick={this.happyClicks}
              style={{ height: 300, width: 300 }}
            />
            <img
              src={notHappyFace}
              alt="notHappyFace"
              onClick={this.notHappyClicks}
              style={{ height: 300, width: 300 }}
            />
          </Container>
          <div>
            <Dialog
              open={this.state.openNot}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"YOUR OPINION IS IMPORTANT TO US"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let us do it right!
            </DialogContentText>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="email"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Phone Number"
                  type="email"
                  fullWidth
                />
                <Button onClick={this.sendForm} color="primary">
                  Send
          </Button>
              </DialogContent>

            </Dialog>
          </div>

          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"THANK YOU"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  We've received your feedback.
                  Have a nice day!
            </DialogContentText>
              </DialogContent>

            </Dialog>
          </div>

        </Paper>
      </Container>


    )
  }
}

export default Faces