import React, { Component } from 'react';
import './App.css';
import './nprogress.css'
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents'
import { getEvents, extractLocations } from './api';


class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
        events, 
        locations: extractLocations(events) 
        
        });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location = null, eventCount = null) => {
    this.mounted = true;
    getEvents().then((events) => {
      const locationEvents =
        location === "all" || !location
          ? events
          : events.filter((event) => event.location === location);
  
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(
            0,
            eventCount || this.state.numberOfEvents
          ),
        });
      }
    });
  };

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      { 
        numberOfEvents, 
      },
      this.updateEvents(null, numberOfEvents)
    );
  };

  render() {
    return (
      <div className="App">
        <div className="Appheader">
          <h1>Search for Events!</h1>
          <p>I am a student at CareerFoundry and this app uses the google calendar API to search for events. You can search a city and filter the amount of events you want to see below.</p>
        </div>
        <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents} />
        <NumberOfEvents 
          updateNumberOfEvents = {(number) => {
            this.updateNumberOfEvents(number);
          }} />
        <EventList 
          events={this.state.events} 
        />
      </div>
    );
  }
}

export default App;
