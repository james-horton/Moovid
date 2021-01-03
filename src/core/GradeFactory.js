import HappyGrade from './HappyGrade';
import DisappointedGrade from './DisappointedGrade';
import ConcernedGrade from './ConcernedGrade';
import OptimisticGrade from './OptimisticGrade';

class GradeFactory {

    static getGrade = (slope, stateName) => {
       
        const slopes = {
            DISAPPOINTED: 5,
            CONCERNED: 0,
            OPTIMISTIC: -5
        };
        
        if (slope > slopes.DISAPPOINTED) {            
            return new DisappointedGrade(stateName);

        } else if (slope >= slopes.CONCERNED) { 
            return new ConcernedGrade(stateName);

        } else if (slope >= slopes.OPTIMISTIC) {               
            return new OptimisticGrade(stateName);

        } else {
            return new HappyGrade(stateName);
        }       
    }
}

export default GradeFactory;