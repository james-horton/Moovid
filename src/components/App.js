import React from 'react';
import OverviewStats from './OverviewStats';
import Chart from './Chart';

// TODO: use Redux
// Add footer to credit chart tool and API used
const App = () => {
    return (
        <div className="ui container">
            <h1>Moovid</h1>
            <OverviewStats stateAbbrev="nc" />
            <Chart stateAbbrev="nc" stateName="North Carolina" />
        </div>
    );
};

export default App;

