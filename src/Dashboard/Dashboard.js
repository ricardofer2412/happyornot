import React from 'react'
import Navbar from '../Navbar/Navbar'
import firebase from '../Firebase/firebase'
import { Container } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import {

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import './Dashboard.css'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const classes = {
  counters: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',


  },
  counts: {
    width: 350,
    height: 150
  },
  tablecell: {
    color: '#bdbdbd',
    fontSize: '18px'
  },
  tablecellTitle: {
    color: 'white',
    fontSize: '18px'
  }
}
class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      happyCount: '',
      sadCount: '',
      messagesList: []
    }
  }

  componentDidMount() {
    this.getHappyCount()
    this.getSadCount()
    this.getMessages()
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
    console.log('happyCount' + sadCount)
  }


  getMessages() {
    firebase.firestore().collection('sadReviews')
      .get().then((querySnapshot) => {
        const messagesList = []
        querySnapshot.forEach((doc) => {
          messagesList.push({ id: doc.id, ...doc.data() })
        })

        this.setState({
          messagesList: messagesList
        })
        console.log(this.state.messagesList)
      })

  }

  deleteMessage = (id, messageId) => {
    const messageList = Object.assign([], this.state.messageList)
    console.log(id)
    messageList.splice(id, 1)


    firebase.firestore().collection("sadReviews").doc(messageId)
      .delete()
      .then((res) => {
        this.setState({
          messageList
        })

      })
  }

  render() {
    return (
      <div className='dashboard'>
        <Navbar />
        <div className="widgets">
          <div className="counters">
            <div className="counts">
              <h1>Happy Counts</h1>
              <div className="counts__card">
                <p>{this.state.happyCount}</p>
                <TrendingUpIcon className='counts-card-icon' />
              </div>
            </div>
            <div className="counts">
              <h1>Sad Counts</h1>
              <div className="counts__card">
                <p>{this.state.sadCount}</p>
                <TrendingDownIcon className='counts-card-icon-down' />
              </div>
            </div>

            <div className="counts">
              <h1>Review Messages</h1>
              <div className="counts__card">
                <p>{this.state.sadCount}</p>
                <MailOutlineIcon className='counts-card-icon-messages' />
              </div>
            </div>

          </div>

          <div className='table'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={classes.tablecellTitle}>Name</TableCell>
                  <TableCell style={classes.tablecellTitle}>Phone </TableCell>
                  <TableCell style={classes.tablecellTitle}>Email</TableCell>
                  <TableCell style={classes.tablecellTitle}>Comment</TableCell>
                  <TableCell style={classes.tablecellTitle}> Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.messagesList.map((message, i) => (
                  <TableRow key={i}>
                    <TableCell style={classes.tablecell}>{message.name}</TableCell>
                    <TableCell style={classes.tablecell}>{message.phone}</TableCell>
                    <TableCell style={classes.tablecell}>{message.email}</TableCell>
                    <TableCell style={classes.tablecell}>{message.comment}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => this.deleteMessage(i, message.id)} aria-label="Delete" >
                        <DeleteIcon fontSize="small" className="deleteIcon" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard