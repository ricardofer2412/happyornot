import React from 'react'
import Navbar from '../Navbar/Navbar'
import firebase from '../Firebase/firebase'

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      happyCount: '',
      sadCount: '',
    }
  }

  componentDidMount(){
    this.getHappyCount()
    this.getSadCount()
  }

  getHappyCount() {
    const happyCount = []
    firebase.firestore().collection("ratingCount").doc('happyCount')
     .get().then((doc) => {
       if (doc.exists){
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
       if (doc.exists){
         console.log(doc.data())
         this.setState({
           sadCount: doc.data().sadCount
         })
       }
     })
     console.log('happyCount' + sadCount)
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Happy Counts</h1>
        <h1>{this.state.happyCount}</h1>
        <h1>Sad Counts</h1>
        <h1>{this.state.sadCount}</h1>
      </div>
    )
  }
}

export default Dashboard