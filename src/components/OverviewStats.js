import React from 'react';
import Spinner from './Spinner';
import axios from 'axios';
import covidTracking from '../apis/covidTracking';

class OverviewStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentStats: null};
        this.source = axios.CancelToken.source();
        this.responseStatus = null;
    }
    
    componentDidMount() {
        this.fetchOverviewStats();
    }

    componentWillUnmount() {
        if (this.responseStatus === null) 
            this.source.cancel('fetch cancelled');
    }

    fetchOverviewStats = async () => {

        try {
            const response = await covidTracking.get(
                `states/${this.props.stateCode}/current.json`,
                { cancelToken: this.source.token }
            ); 

            this.responseStatus = response.status;
            
            this.setState({currentStats: response.data})

        } catch(err) {
            console.log(err);
        }        
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