import React from 'react';
import axios from 'axios';
import covidTracking from '../apis/covidTracking';
import Grade from './Grade';
import Spinner from './Spinner';

import FadeInSection from './FadeInSection';

class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.spinnerControl = React.createRef();
        this.gradeComponent = React.createRef();

        this.data = null;
        this.options = null;
        this.chart = null;
        this.source = axios.CancelToken.source();
        this.responseStatus = null;

        this.state = { historyStats: [], slope: 0 };
    }

    componentDidMount() {
        if (window.google) {
            window.google.charts.load('current', { packages: ['corechart'] });
            this.fetchHistoryStats();
            this.setChartOptions();
            this.setResizeChartOptions();
            window.onresize = this.resizeChart;
        }
    }

    componentWillUnmount() {
        if (this.responseStatus === null) 
            this.source.cancel('fetch canceled');
    }

    chartLoaded = () => {
        this.spinnerControl.current.hide();
        this.gradeComponent.current.show();        
    }

    buildChart = chartData => {
        window.google.charts.setOnLoadCallback(() => this.drawBasic(chartData));
    }

    setChartOptions = () => {

        this.options = {
            title: 'Seven Day COVID Case Count',
            legend: 'none',
            vAxis: {
                title: 'Number of Cases'
            },            
            colors: ['#004411'], // dark green
            backgroundColor: 'transparent',
            fontName: 'Lato',
            titleTextStyle: {
                bold: false
            }
        };
    }

    setResizeChartOptions = () => {
        // mobile
        if (window.innerWidth <= 600)
        {
            this.options.titleTextStyle.fontSize = 18;
            this.options.height = 400;
            this.options.fontSize = 14;
        // everything else
        } else {
            this.options.titleTextStyle.fontSize = 25;
            this.options.height = 500;
            this.options.fontSize = 16;
        }
    }

    drawBasic = chartData => {

        this.data = new window.google.visualization.DataTable();
        this.data.addColumn('string', 'Date');
        this.data.addColumn('number', 'Cases');
        this.data.addRows(chartData);

        this.chart = new window.google.visualization.ColumnChart(
            document.getElementById('chart_div')
        );

        window.google.visualization.events.addListener(this.chart, 'ready', this.chartLoaded);
        this.drawChart();
    }

    resizeChart = () => {
        if (this.chart && this.data && this.options) {
            this.setResizeChartOptions();
            this.drawChart();
        }
    }

    drawChart = () => {
        this.chart.draw(this.data, this.options);
    }

    fetchHistoryStats = async () => {

        try {
            const response = await covidTracking.get(
                `states/${this.props.stateCode}/daily.json`,
                { cancelToken: this.source.token }
            );

            this.responseStatus = response.status;
            
            const size = 7;
            let day = size;

            let history = response.data.slice(0, size).map(({ date, positiveIncrease }) => {
                return { date: date.toString(), positiveIncrease, day: day-- };
            });

            history = history.reverse();
            const slope = this.calculateSlope(history);

            let sortedHistory = history.map(({ date, positiveIncrease }) => {
                const month = date.substring(4, 6);
                const day = date.substring(6, 8);
                const formattedDate = `${month}/${day}`;
                return [formattedDate, positiveIncrease]
            });

            this.setState({ historyStats: sortedHistory, slope: slope });

        } catch(err) {
            console.log(err);
        }
    }

    calculateSlope = stats => {

        if (stats.length > 0) {

            const sum = array => array.reduce((a, b) => a + b);
            const average = array => array.reduce((a, b) => a + b) / array.length;

            const days = stats.map(({ day }) => { return day });
            const cases = stats.map(({ positiveIncrease }) => { return positiveIncrease });

            // console.log('days: ' + days);
            // console.log('cases: ' + cases);

            const meanX = average(days);
            const meanY = average(cases);

            // console.log('meanX: ' + meanX);
            // console.log('meanY: ' + meanY);

            const slopePoints = stats.map(({ day, positiveIncrease }) => {
                const xiMinusMeanX = day - meanX;
                const yiMinusMeanY = positiveIncrease - meanY;
                const product = xiMinusMeanX * yiMinusMeanY;
                const xiMinusMeanXSquared = xiMinusMeanX * xiMinusMeanX;
                return { product, xiMinusMeanXSquared };
            });

            //console.log(slopePoints);

            const products = slopePoints.map(({ product }) => { return product });
            const xiMinusMeanXSquareds = slopePoints.map(({ xiMinusMeanXSquared }) => { return xiMinusMeanXSquared });
            const numerator = sum(products);
            const denominator = sum(xiMinusMeanXSquareds);
            if (denominator === 0) return 0;

            return numerator / denominator;
        }
    }

    render() {

        if (this.state.historyStats.length > 0) {
           
            this.buildChart(this.state.historyStats);
            console.log(`slope: ${this.state.slope.toFixed(2)}`);
            return (
                
                <div className="padding-top-space">

                    <Spinner ref={this.spinnerControl} message="Loading Chart..." /> 

                    <FadeInSection >
                        <div id="chart_div" className="padding-bottom-space"></div>
                    </FadeInSection>

                    <FadeInSection >
                        <Grade 
                            ref={this.gradeComponent} 
                            slope={this.state.slope} 
                            stateName={this.props.stateName}
                            key={this.props.stateName} 
                        />
                    </FadeInSection>                                   

                </div>
            );
        }

        return <Spinner message="Loading Chart..." />;
    }
}

export default Chart;