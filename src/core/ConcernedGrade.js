import BaseGrade from './BaseGrade';
import Concerned1 from '../images/concerned1.jpg';

class ConcernedGrade extends BaseGrade {

    constructor(stateName) {
        super(stateName);
        this.altText = 'Concerned';
        this.photos = [Concerned1];
        this.messages = [
            'concerned about COVID cases going up in'
        ];

        this.setRandomPhotoMessage();
    }
}

export default ConcernedGrade;