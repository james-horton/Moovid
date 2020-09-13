import BaseGrade from './BaseGrade';
import Happy1 from '../images/happy1.jpg';
import Happy2 from '../images/happy2.jpg';
import Happy3 from '../images/happy3.jpg';
import Happy4 from '../images/happy4.jpg';

class HappyGrade extends BaseGrade {

    constructor(stateName) {
        super(stateName);        
        this.altText = 'Happy';       
        this.photos = [Happy1, Happy2, Happy3, Happy4];
        this.messages = [
            'happy to see COVID cases going down in',
            'quite pleased to see the number of COVID cases going down in',
            'glad to see a downward trend in COVID cases in'
        ];

        this.setRandomPhotoMessage();
    }
}

export default HappyGrade;

