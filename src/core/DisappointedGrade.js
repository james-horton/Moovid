import BaseGrade from './BaseGrade';
import Disappointed1 from '../images/disappointed1.jpg';
import Disappointed2 from '../images/disappointed2.jpg';
import Disappointed3 from '../images/disappointed3.jpg';
import Disappointed4 from '../images/disappointed4.jpg';
import Disappointed5 from '../images/disappointed5.jpg';

class DisappointedGrade extends BaseGrade {

    constructor(stateName) {
        super(stateName);
        this.altText = 'Disappointed';
        this.photos = [
            Disappointed1, Disappointed2, Disappointed3,
            Disappointed4, Disappointed5
        ];
        this.messages = [
            'disappointed to see COVID cases going up in',
            'a bit miffed to see the number of COVID cases going up in',
            'displeased to see an upward trend in COVID cases in'
        ];

        this.setRandomPhotoMessage();
    }
}

export default DisappointedGrade;