import React, {Component} from 'react'
import ItineraryDetails from '../components/ItineraryDetails'

export default class Itinerary extends Component {
  state = {
    itineraries: [],
    errors: []
  }

  tryToGetItineraries = (link, propsToLookAt, setStateTo) => {
    if (propsToLookAt.auth) {
      fetch(`http://localhost:3000/api/v1/users/${ propsToLookAt.auth.user_id }${link}`, {
        headers:  {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          "Authorization": `Token token=${propsToLookAt.auth.token}`
        }
        })
      .then((res) => res.json())
      .then((json) => {
      json.error ? this.setState({
        errors: [json]
      }) : this.setState({
        [setStateTo]: json
      })})
    }
  }


  componentDidMount = () => {
    this.tryToGetItineraries('/itineraries', this.props, 'itineraries')
  }

  componentWillReceiveProps = (nextProps) => {
    this.tryToGetItineraries('/itineraries', nextProps, 'itineraries')
  }

  render(){
    return(
      <div>
        <h1>Upcoming Trips</h1>
        <br />
        <div className="ui grid">
          <div className="ui list">
          {this.state.itineraries.map(trip => <ItineraryDetails key={trip.id} trip={trip} auth={this.props.auth}/>)}
          </div>
        </div>
      </div>
    )
  }
}
