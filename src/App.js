import React from 'react'
import happyFace from './imgs/happy.png'
import notHappyFace from './imgs/notHappy.png'
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const classes = {
  faceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

}
class App extends React.Component {

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
  }


  render() {

    return (
      <Container>
        <Container >
          <Typography variant='h2' align='center'>TELL US WHO WE DID TODAY!!!</Typography>
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

        <Container>
          <div>
            <Dialog
              open={this.state.openNot}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"THANK YOU"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Thank you for your feedback!
            </DialogContentText>
              </DialogContent>

            </Dialog>
          </div>
        </Container>
        <Container>
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
        </Container>


        <Container style={classes.faceContainer}>
          <Typography variant='h4' align='center'>{this.state.happyCount}</Typography>
          <Typography variant='h4' align='center'>{this.state.notHappyCount}</Typography>
        </Container>
        <Container>
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
                  Thank you for your feedback!
            </DialogContentText>
              </DialogContent>

            </Dialog>
          </div>
        </Container>

      </Container>


    )
  }
}

export default App