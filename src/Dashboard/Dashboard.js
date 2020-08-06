import React from 'react'
import Navbar from '../Navbar/Navbar'
import firebase from '../Firebase/firebase'

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      happyCount: '',
      notHappyCount: '',
    }
  }
  getHappyCount() {
    const happyCount = []
    firebase.firestore().collection("ratingCount").doc('happyCount')
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          happyCount.push({
            key: doc.id,
            happyCount

          })
        })
      })
    this.setState({
      happyCount
    })
    console.log('This is happy counts' + this.state.happyCount)
  }
  render() {
    return (
      <div>
        <Navbar />
        <h1>{this.state.happyCount}</h1>
      </div>
    )
  }
}

export default Dashboard