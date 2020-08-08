import React from 'react';
import styles from './Grade.module.css';

import Happy1 from '../images/happy1.jpg';
import Happy2 from '../images/happy2.jpg';
import Happy3 from '../images/happy3.jpg';
import Happy4 from '../images/happy4.jpg';
import Disappointed1 from '../images/disappointed1.jpg';
import Disappointed2 from '../images/disappointed2.jpg';
import Disappointed3 from '../images/disappointed3.jpg';


class Grade extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {show: false};

        this.happyPhotos = [Happy1, Happy2, Happy3, Happy4];
        this.disappointedPhotos = [Disappointed1, Disappointed2, Disappointed3];
        
        this.moose = 'Moose';
        this.happyMessages = [
            'happy to see cases going down in',
            'quite pleased to see the number of cases going down in',
            'glad to see a downward trend in cases in'
        ];
        
        this.disappointedMessages = [
            'disappointed to see cases going up in',
            'a bit miffed to see the number of cases going up in',
            'displeased to see an upward trend in cases in'
        ];

        this.photo = null;
        this.message = '';        
        this.altText = '';    
        
        if (this.props.slope > 0) {

            this.message = `${this.moose} is 
            ${this.disappointedMessages[Math.floor(Math.random() * this.disappointedMessages.length)]} 
            ${this.props.stateName}`;
    
            this.photo = this.disappointedPhotos[Math.floor(Math.random() * this.disappointedPhotos.length)];
            this.altText = 'Disappointed';
        } else {

            this.message = `${this.moose} is 
            ${this.happyMessages[Math.floor(Math.random() * this.happyMessages.length)]} 
            ${this.props.stateName}`;
    
            this.photo = this.happyPhotos[Math.floor(Math.random() * this.happyPhotos.length)];
            this.altText = 'Happy';
        }          
    }   

    show = () => this.setState({show: true});

    render() {
        
        if (this.state.show) {      
            return (                
                <div>
                    <p className={`${styles.msg} center-text`} key='1'>
                        {this.message}
                    </p>
                    <img className={`${styles.image} center-image`} src={this.photo} alt={this.altText} key='2'/>
                </div>   
            );
        } 

        return null;
    }
}

export default Grade;