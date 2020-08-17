import React from 'react';
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
        this.state = { historyStats: [], slope: 0 };
    }

    componentDidMount() {
        if (window.google) {
            window.google.charts.load('current', { packages: ['corechart', 'bar'] });
            this.fetchHistoryStats();
            this.setupChartOptions();
            window.onresize = this.resizeChart;
        }
    }

    chartLoaded = () => {
        this.spinnerControl.current.hide();
        this.gradeComponent.current.show();        
    }

    buildChart = chartData => {
        window.google.charts.setOnLoadCallback(() => this.drawBasic(chartData));
    }

    setupChartOptions = () => {

        this.options = {
            title: 'Seven Day COVID Case Count',
            legend: 'none',
            height: 500,
            vAxis: {
                title: 'Number of Cases'
            },
            // dark green
            colors: ['#004411'],
            backgroundColor: 'transparent',
            fontName: 'Lato',
            titleTextStyle: {
                fontSize: 25,
                bold: false
            }
        };
    }

    drawBasic = chartData => {

        this.data = new window.google.visualization.DataTable();
        this.data.addColumn('string', 'Date');
        this.data.addColumn('number', 'Cases');

        //console.log(chartData);

        this.data.addRows(chartData);
        this.setupChartOptions();

        this.chart = new window.google.visualization.ColumnChart(
            document.getElementById('chart_div')
        );

        window.google.visualization.events.addListener(this.chart, 'ready', this.chartLoaded);
        this.drawChart();
    }

    resizeChart = () => {
        if (this.chart && this.data && this.options) {
            this.drawChart();
        }
    }

    drawChart = () => {
        this.chart.draw(this.data, this.options);
    }

    fetchHistoryStats = async () => {

        const response = await covidTracking.get(`states/${this.props.stateCode}/daily.json`);
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

    // TODO: add chartLoading state to manage renders? have doubts that will work bc statename change will still
    // cause a rerender.

    // OR... add a new state called ready: false/true to control visibility. This might solve the problem of not having
    // to hide components and show later after the data and chart is loaded. Parent App.js can pass value as a prop
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