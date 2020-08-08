import React from 'react';
import Spinner from './Spinner';
import covidTracking from '../apis/covidTracking';

class OverviewStats extends React.Component {

    state = {currentStats: null};
    
    componentDidMount() {
        this.fetchOverviewstats();
    }

    fetchOverviewstats = async () => {
        const response = await covidTracking.get(`states/${this.props.stateAbbrev}/current.json`);         
        this.setState({currentStats: response.data})
    }  

    render() {
        if (this.state.currentStats) {
            
            const { positive, hospitalizedCurrently, death } = this.state.currentStats;

            return (
                <div className="padding-bottom-space">
                    <div className="ui stackable three column grid statistics">
                        <div className="column">
                            <div className="statistic">
                                <div className="label">
                                    Cases
                                </div>
                                <div className="value">
                                    {positive.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="column">
                            <div className="statistic">
                                <div className="label">
                                    Currently Hospitalized
                                </div>
                                <div className="value">
                                    {hospitalizedCurrently.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="column">
                            <div className="statistic">
                                <div className="label">
                                Deaths
                                </div>
                                <div className="value">
                                    {death.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
                
        return <Spinner message="Loading Stats..." />;
    }
}

export default OverviewStats;