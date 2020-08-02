import React from 'react';
import Header from './Header';
import OverviewStats from './OverviewStats';
import Chart from './Chart';

import './App.css';


// TODO: use Redux
// Add footer to credit chart tool and API used
const App = () => {
    return (
        <div className="ui container">                 
            <Header />
            <OverviewStats stateAbbrev="nc" />
            <Chart stateAbbrev="nc" stateName="North Carolina" />
        </div>
    );
};

export default App;

