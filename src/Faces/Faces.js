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
import firebase from '../Firebase/firebase'
import "./Faces.css"
import Footer from '../Footer/Footer';

const classes = {
  faceContainer: {


  },
  title: {
    color: 'gray'
  },
  mainContainer: {
    flexGrow: 1,
  },
  titleContainer: {

  },
  paper: {

  },
  dialog: {
    // height: 400,
    // width: 600
  }

}
class Faces extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      happyCount: '',
      sadCount: '',
      open: false,
      openNot: false,
      date: new Date(),
      name: '',
      email: '',
      phone: '',
      comment: '',
      sadReview: []
    }
  }
  componentDidMount() {
    this.getHappyCount()
    this.getSadCount()
    console.log('Current Count: ' + this.state.happyCount)
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

  onDismiss = () => {
    this.setState({ openNot: false })
  }

  getHappyCount() {
    const happyCount = []
    firebase.firestore().collection("ratingCount").doc('happyCount')
      .get().then((doc) => {
        if (doc.exists) {
          console.log(doc.data())
          this.setState({
            happyCount: doc.data().happyCount
          })
        }
      })
    console.log('happyCount' + happyCount)
  }

  getSadCount() {
    const sadCount = []
    firebase.firestore().collection("ratingCount").doc('sadCount')
      .get().then((doc) => {
        if (doc.exists) {
          console.log(doc.data())
          this.setState({
            sadCount: doc.data().sadCount
          })
        }
      })

  }
  happyClicks = (e) => {

    const happyCount = this.state.happyCount + 1
    firebase.firestore().collection("ratingCount").doc('happyCount')
      .set({
        happyCount
      })
      .then((res) => {
        this.setState({
          happyCount,
          open: true
        },
          () => {
            setTimeout(() => {
              this.setState({ open: false })
            }, 10000);//5 Second delay   
          })
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    console.log(this.state.happyCount)
  }
  notHappyClicks = () => {
    const sadCount = this.state.sadCount + 1
    firebase.firestore().collection("ratingCount").doc('sadCount')
      .set({
        sadCount
      })
      .then((res) => {
        this.setState({
          sadCount,
          openNot: true
        },
          () => {
            setTimeout(() => {
              this.setState({ openNot: false })
            }, 100000);//5 Second delay   
          })
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  }

  onSubmitReview = (e) => {
    const { name, email, phone, comment } = this.state

    firebase.firestore().collection("sadReviews")
      .add({
        name, email, phone, comment,

      }).then(
        this.setState({
          name: '',
          email: '',
          phone: '',
          comment: '',
          openNot: false
        })
      )


  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };


  render() {

    return (
      <div className="container">

        <div className="title">
          <h1 className="title__text" >PLEASE RATE YOUR EXPERIENCE TODAY</h1>
        </div>
        <div className="facesContainer">
          <img
            className="faces"
            src={happyFace}
            alt="happyFace"
            onClick={this.happyClicks}
          />
          <img
            className="faces"
            src={notHappyFace}
            alt="notHappyFace"
            onClick={this.notHappyClicks}
          />
        </div>
        <Footer />

        <Dialog
          style={classes.dialog}
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
              type="text"
              fullWidth
              InputProps={{ name: "name" }}
              onChange={this.onChange}
              value={this.state.name}
            />
            <TextField

              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              InputProps={{ name: "email" }}
              onChange={this.onChange}
              value={this.state.email}
            />
            <TextField
              margin="dense"
              id="name"
              label="Phone Number"
              type="email"
              fullWidth
              InputProps={{ name: "phone" }}
              onChange={this.onChange}
              value={this.state.phone}
            />
            <TextField
              margin="dense"
              id="standard-multiline-flexible"
              label="Comments"
              fullWidth
              multiline
              rowsMax={10}
              InputProps={{ name: "comment" }}
              onChange={this.onChange}
              value={this.state.comment}
            />
            <Button onClick={this.onSubmitReview} color="primary">
              Send
          </Button>
            <Button onClick={this.onDismiss} color="primary">
              Dismiss
          </Button>
          </DialogContent>
        </Dialog>
        <Dialog
          style={{ marginTop: 25, marginBottom: 25, marginRight: 10, marginLeft: 10 }}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"THANK YOU"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className="text__thanks">
              We've received your feedback. 🎉 <br />
              Have a nice day! 🎉
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>


    )
  }
}

export default Faces