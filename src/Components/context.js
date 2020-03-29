import React, { Component } from 'react'

const InfoContext = React.createContext();

// Provider
// Consumer

class InfoProvider extends Component {
    render() {
        return (
           <InfoContext.Provider value="Hello">
               {this.props.children}
           </InfoContext.Provider>
        )
    }
}


const InfoConsumer = InfoContext.Consumer;

export { InfoProvider, InfoConsumer };