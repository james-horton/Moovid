import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.covidtracking.com/v1/'
});