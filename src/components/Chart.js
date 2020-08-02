import React from 'react';
import covidTracking from '../apis/covidTracking';
import Grade from './Grade';
import Spinner from './Spinner';

class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.spinnerControl = React.createRef();
        this.state = {historyStats: [], slope: 0};
    }    

    componentDidMount() {
        window.google.charts.load('current', {packages: ['corechart', 'bar']});        
        this.fetchHistoryStats();
    }

    buildChart = chartData => {        
        window.google.charts.setOnLoadCallback(() => this.drawBasic(chartData));
    }    

    drawBasic = chartData => {
        
        var data = new window.google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Cases');

        //console.log(chartData);

        data.addRows(chartData);

        var options = {
            title: '7 Day Case Count',
            legend: 'none',
            width: 1150,
            height: 500,
            vAxis: {
                title: 'Number of Cases'
            }
        };        

        var chart = new window.google.visualization.ColumnChart(
            document.getElementById('chart_div')
        );

        chart.draw(data, options);
        
        if (this.spinnerControl.current.isShowing()) {
            this.spinnerControl.current.hide();
        }
    }

    fetchHistoryStats = async () => {

        const response = await covidTracking.get(`states/${this.props.stateAbbrev}/daily.json`);
        const size = 7;
        let day = size;
       
        let history = response.data.slice(0, size).map(({date, positiveIncrease}) => {
            return {date: date.toString(), positiveIncrease, day: day--};
        });

        history = history.reverse();
        const slope = this.calculateSlope(history);
        
        let sortedHistory = history.map(({date, positiveIncrease}) => {
            const yr = date.substring(0, 4);
            const month = date.substring(4, 6);
            const day = date.substring(6, 8);
            const formattedDate = `${month}/${day}/${yr}`;
            return [formattedDate, positiveIncrease] 
        });

        this.setState({historyStats: sortedHistory, slope: slope});
    }

    calculateSlope = stats => {

        if (stats.length > 0) {

            const sum = array => array.reduce((a, b) => a + b);
            const average = array => array.reduce((a, b) => a + b) / array.length;
            
            const days = stats.map( ({day}) => { return day });
            const cases = stats.map( ({positiveIncrease}) => { return positiveIncrease });
            
            // console.log('days: ' + days);
            // console.log('cases: ' + cases);
            
            const meanX = average(days);
            const meanY = average(cases);

            // console.log('meanX: ' + meanX);
            // console.log('meanY: ' + meanY);

            const slopePoints = stats.map( ({day, positiveIncrease}) => {
                const xiMinusMeanX = day - meanX;
                const yiMinusMeanY = positiveIncrease - meanY;
                const product = xiMinusMeanX * yiMinusMeanY;
                const xiMinusMeanXSquared = xiMinusMeanX * xiMinusMeanX;
                return {product, xiMinusMeanXSquared};
            });

            //console.log(slopePoints);

            const products = slopePoints.map( ({product}) => { return product });
            const xiMinusMeanXSquareds = slopePoints.map( ({xiMinusMeanXSquared}) => { return xiMinusMeanXSquared });
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
                <div>
                    <Spinner ref={this.spinnerControl} message="Loading Chart..." />
                    <div id="chart_div"></div>
                    <Grade slope={this.state.slope} stateName={this.props.stateName} />
                </div>
            );
        } 

        console.log('Chart.js render');
        
        return <Spinner message="Loading Chart..." />;
    }
}

export default Chart;