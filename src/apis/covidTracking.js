import axios from 'axios';

export default axios.create({
    baseURL: 'https://covidtracking.com/api/v1/'
});