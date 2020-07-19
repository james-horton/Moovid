import React from 'react';
import covidTracking from '../apis/covidTracking';

class Chart extends React.Component {

    state = { historyStats: [] };

    componentDidMount() {
        this.fetchHistoryStats();
    }

    buildChart(chartData) {
        window.google.charts.load('current', {packages: ['corechart', 'bar']});
        window.google.charts.setOnLoadCallback(() => this.drawBasic(chartData));
    }    

    drawBasic(chartData) {

        var data = new window.google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Cases');

        console.log(chartData);

        data.addRows(
            chartData
             //[[{v: '07/12/2020', f: ''}, 12]]
            // [{v: '07/13/2020', f: '07/13/2020'}, 8],
            // [{v: '07/14/2020', f: '07/14/2020'}, 17],
            // [{v: '07/15/2020', f: '07/15/2020'}, 20],
            // [{v: '07/16/2020', f: '07/16/2020'}, 22],
            // [{v: '07/17/2020', f: '07/17/2020'}, 26],
            // [{v: '07/18/2020', f: '07/18/2020'}, 32],
            
            // [{v: new Date(2020,6,12), f: '07/12/2020'}, 12],
            // [{v: new Date(2020,6,13), f: '07/13/2020'}, 8],
            // [{v: new Date(2020,6,14), f: '07/14/2020'}, 17],
            // [{v: new Date(2020,6,15), f: '07/15/2020'}, 20],
            // [{v: new Date(2020,6,16), f: '07/16/2020'}, 22],
            // [{v: new Date(2020,6,17), f: '07/17/2020'}, 26],
            // [{v: new Date(2020,6,18), f: '07/18/2020'}, 32],

            //[{v: '07/19/2020', f: '07/19/2020'}, 2],
            // [{v: [10, 0, 0], f:'10 am'}, 3],
            // [{v: [11, 0, 0], f: '11 am'}, 4],
            // [{v: [12, 0, 0], f: '12 pm'}, 5],
            // [{v: [13, 0, 0], f: '1 pm'}, 6],
            // [{v: [14, 0, 0], f: '2 pm'}, 7],
            // [{v: [15, 0, 0], f: '3 pm'}, 8],
            // [{v: [16, 0, 0], f: '4 pm'}, 9],
            // [{v: [17, 0, 0], f: '5 pm'}, 10],
        );

        //var shortDateFormat = new window.google.visualization.DateFormat({formatType: 'short'});
        //shortDateFormat.format(data, 1);

        var options = {
            title: '7 Day Case Count',
            legend: 'none',
            width: 1150,
            height: 500,
            //hAxis: {
                //title: 'Date' 
                //format: 'MMddyy',
                // viewWindow: {
                //     min: new Date(2020,6,12),
                //     max: new Date(2020,6,18)
                // }
            //},
            vAxis: {
                title: 'Number of Cases'
            }
        };        

        var chart = new window.google.visualization.ColumnChart(
            document.getElementById('chart_div')
        );

        chart.draw(data, options);
    }

    fetchHistoryStats = async () => {
        const response = await covidTracking.get('states/nc/daily.json');

        const size = 7;
        let day = size;
        let history = response.data.slice(0, size).map(({date, positiveIncrease}) => {
            return {date: date.toString(), positiveIncrease, day: day--};
        });

        history = history.reverse();
        //console.log(history);

        let newHistory = history.map(({date, positiveIncrease}) => {
            const yr = date.substring(0, 4);
            const month = date.substring(4, 6);
            const day = date.substring(6, 8);
            const newDate = month + '/' + day + '/' + yr;
            return [newDate, positiveIncrease] 
        });
        //console.log(newHistory);    

        this.setState({historyStats: newHistory });
        
        //this.buildChart(newHistory);
    }

    // TODO: build chart

    render() {
        
        if (this.state.historyStats.length > 0) {
            this.buildChart(this.state.historyStats);
            return <div id="chart_div"></div>
        } else {
            console.log('no historyStats set');
        }

        // TODO: add load animation
        return <div>Loading Chart...</div>
    }
}

export default Chart;