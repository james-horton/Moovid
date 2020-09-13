import React from 'react';
import styles from './Grade.module.css';
import GradeFactory from '../core/GradeFactory';

class Grade extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {show: false};

        this.grade = GradeFactory.getGrade(
            this.props.slope, 
            this.props.stateName
        );
    }   

    show = () => this.setState({show: true});
    hide = () => this.setState({show: false});  

    render() {
        
        if (this.state.show) {  

            return (                
                <div>
                    <p className={`${styles.msg} center-text`} key='1'>
                        {this.grade.message}
                    </p>
                    <img className={`${styles.image} center-image`} 
                         src={this.grade.photo} 
                         alt={this.grade.altText} key='2'
                    />
                </div>   
            );
        } 

        return null;
    }
}

export default Grade;