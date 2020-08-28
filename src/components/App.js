import React from 'react';
import { Container } from 'semantic-ui-react'

import Header from './Header';
import StateSelection from './StateSelection';
import OverviewStats from './OverviewStats';
import Chart from './Chart';
import Footer from './Footer';

import './App.css';

// TODO: add footer to credit chart tool and API used
class App extends React.PureComponent {

    state = {stateCode: 'nc', stateName: 'North Carolina'};

    onSelectionSubmit = (stateCode, stateName) =>  {
        this.setState({stateCode, stateName})       
    }

    render() {

        const { stateCode, stateName } = this.state;

        // using a key on components to create a new instance rather than update the current one due to 
        // multiple rerenders caused by the stateCode prop changing and waiting to fetch data from API.
        return (    
            <div>
                <Container>
                    <Header />
                    <StateSelection onSelectionSubmit={this.onSelectionSubmit} 
                                    defaultStateCode={stateCode}
                                    defaultStateName={stateName}
                    />
                    
                    <OverviewStats key={'1' + stateCode} stateCode={this.state.stateCode} /> 

                    <Chart key={'2' + stateCode} 
                        stateCode={stateCode} 
                        stateName={stateName} 
                    />
                </Container>   
                <Footer />      
            </div>           
        );
    }
};

export default App;

