import BaseGrade from './BaseGrade';
import Optimistic1 from '../images/optimistic1.jpg';

class OptimisticGrade extends BaseGrade {

    constructor(stateName) {
        super(stateName);
        this.altText = 'Optimistic';
        this.photos = [Optimistic1];
        this.messages = [
            'optimistic about COVID cases going down in'
        ];

        this.setRandomPhotoMessage();
    }
}

export default OptimisticGrade;