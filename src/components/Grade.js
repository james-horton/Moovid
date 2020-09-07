import React from 'react';
import styles from './Grade.module.css';

import Happy1 from '../images/happy1.jpg';
import Happy2 from '../images/happy2.jpg';
import Happy3 from '../images/happy3.jpg';
import Happy4 from '../images/happy4.jpg';
import Disappointed1 from '../images/disappointed1.jpg';
import Disappointed2 from '../images/disappointed2.jpg';
import Disappointed3 from '../images/disappointed3.jpg';
import Disappointed4 from '../images/disappointed4.jpg';
import Disappointed5 from '../images/disappointed5.jpg';
import Concerned1 from '../images/concerned1.jpg';
import Optimistic1 from '../images/optimistic1.jpg';


class Grade extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {show: false};

        this.happyPhotos = [Happy1, Happy2, Happy3, Happy4];
        this.disappointedPhotos = [
            Disappointed1, Disappointed2, Disappointed3,
            Disappointed4, Disappointed5
        ];
        this.concernedPhotos = [Concerned1];
        this.optimisticPhotos = [Optimistic1];
        
        this.name = 'Moose';
        
        this.happyMessages = [
            'happy to see COVID cases going down in',
            'quite pleased to see the number of COVID cases going down in',
            'glad to see a downward trend in COVID cases in'
        ];
        
        this.disappointedMessages = [
            'disappointed to see COVID cases going up in',
            'a bit miffed to see the number of COVID cases going up in',
            'displeased to see an upward trend in COVID cases in'
        ];

        this.concernedMessages = [
            'concerned about COVID cases going up in'
        ];

        this.optimisticMessages = [
            'optimistic about COVID cases going down in'
        ];

        this.photo = null;
        this.message = '';        
        this.altText = '';        
        
        this.setRandomPhotoMessage();
    }   

    getRandomPhoto = photos => {
        return photos[Math.floor(Math.random() * photos.length)];
    }

    getRandomMessage = messages => {
        return `${this.name} is 
            ${messages[Math.floor(Math.random() * messages.length)]} 
            ${this.props.stateName}`;
    }

    setRandomPhotoMessage = () => {

        const slope = this.props.slope;

        const slopes = {
            DISAPPOINTED: 5,
            CONCERNED: 0,
            OPTIMISTIC: -5
        };
        
        if (slope > slopes.DISAPPOINTED) {
            this.altText = 'Disappointed';
            this.message = this.getRandomMessage(this.disappointedMessages);     
            this.photo = this.getRandomPhoto(this.disappointedPhotos);

        } else if (slope >= slopes.CONCERNED) { 
            this.altText = 'Concerned';
            this.message = this.getRandomMessage(this.concernedMessages);     
            this.photo = this.getRandomPhoto(this.concernedPhotos);

        } else if (slope >= slopes.OPTIMISTIC) {
            this.altText = 'Optimistic';                
            this.message = this.getRandomMessage(this.optimisticMessages);     
            this.photo = this.getRandomPhoto(this.optimisticPhotos);

        } else {
            this.altText = 'Happy';       
            this.message = this.getRandomMessage(this.happyMessages);     
            this.photo = this.getRandomPhoto(this.happyPhotos); 
        }          
    }

    show = () => this.setState({show: true});
    hide = () => this.setState({show: false});  

    render() {
        
        if (this.state.show) {  

            return (                
                <div>
                    <p className={`${styles.msg} center-text`} key='1'>
                        {this.message}
                    </p>
                    <img className={`${styles.image} center-image`} 
                         src={this.photo} 
                         alt={this.altText} key='2'
                    />
                </div>   
            );
        } 

        return null;
    }
}

export default Grade;