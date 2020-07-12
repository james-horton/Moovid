import React from 'react';
import covidTracking from '../apis/covidTracking';

class OverviewStats extends React.Component {

    state = {currentStats: null};
    
    componentDidMount() {
        this.fetchOverviewstats();
    }

    fetchOverviewstats = async () => {
        const response = await covidTracking.get('states/nc/current.json');         
        //console.log(response.data);
        this.setState({currentStats: response.data})
    }  

    render() {
        if (this.state.currentStats) {
            
            const { positive, hospitalizedCurrently, death, positiveIncrease } = this.state.currentStats;

            return (
                <h3>
                    <div>Cases: {positive.toLocaleString()}</div>
                    <div>Currently Hospitalized: {hospitalizedCurrently.toLocaleString()}</div>
                    <div>Deaths: {death.toLocaleString()}</div>
                </h3>
            );
        }

        // TODO: add load animation 
        return <div>Loading Overview...</div>
    }
}

export default OverviewStats;