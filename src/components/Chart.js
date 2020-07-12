import React from 'react';
import '../apis/covidTracking';

class Chart extends React.Component {

    state = { historyStats: [] };

    componentDidMount() {
        this.fetchHistoryStats();
    }

    fetchHistoryStats = async () => {
        const response = await covidTracking.get('states/nc/daily.json');

        const size = 7;
        let day = size;
        let history = response.data.slice(0, size).map(({date, positive}) => {
            return {date, positive, day: day--};
        });
        console.log(history.reverse());
        //this.setState({historyStats: response.data });
    }

    // TODO: build chart

    render() {
        if (this.state.historyStats) {

        }
        // TODO: add load animation
        return <div>Loading Chart...</div>
    }
}
