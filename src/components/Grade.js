import React from 'react';
import styles from './Grade.module.css';

import Happy1 from '../images/happy1.jpeg';
import Happy2 from '../images/happy2.jpeg';
import Happy3 from '../images/happy3.jpeg';
import Happy4 from '../images/happy4.jpeg';
import Disappointed1 from '../images/disappointed1.jpeg';
import Disappointed2 from '../images/disappointed2.jpeg';
import Disappointed3 from '../images/disappointed3.jpeg';

const happyPhotos = [Happy1, Happy2, Happy3, Happy4];
const disappointedPhotos = [Disappointed1, Disappointed2, Disappointed3];

const moose = 'Moose';
const happyMessages = [
    'happy to see cases going down in',
    'quite pleased to see the number of cases going down in',
    'glad to see a downward trend in cases in'
];

const disappointedMessages = [
    'disappointed to see cases going up in',
    'a bit miffed to see the number of cases going up in',
    'displeased to see an upward trend in cases in'
];

const Grade = props =>  {

    let message;
    let photo;
    let altText;

    if (props.slope > 0) {

        message = `${moose} is 
        ${disappointedMessages[Math.floor(Math.random() * disappointedMessages.length)]} 
        ${props.stateName}`;

        photo = disappointedPhotos[Math.floor(Math.random() * disappointedPhotos.length)];
        altText = 'Disappointed';
    } else {

        message = `${moose} is 
        ${happyMessages[Math.floor(Math.random() * happyMessages.length)]} 
        ${props.stateName}`;

        photo = happyPhotos[Math.floor(Math.random() * happyPhotos.length)];
        altText = 'Happy';
    }

    return (
        <div>
            <p className={styles.msg}>{message}</p>
            <img className={styles.image} src={photo} alt={altText} />
        </div>
    );
}

export default Grade;