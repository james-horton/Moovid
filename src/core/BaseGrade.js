class BaseGrade {

    constructor(stateName) { 
        this.stateName = stateName;
        this.name = 'Moose'; 
        this.photos = [];         
        this.messages = [];
        this.photo = null;
        this.message = '';        
        this.altText = '';  
    }

    getRandomPhoto = () => {
        return this.photos[Math.floor(Math.random() * this.photos.length)];
    }

    getRandomMessage = () => {
        return `${this.name} is 
            ${this.messages[Math.floor(Math.random() * this.messages.length)]} 
            ${this.stateName}`;
    }    

    setRandomPhotoMessage = () => {
        this.message = this.getRandomMessage(this.messages);     
        this.photo = this.getRandomPhoto(this.photos); 
    }
}

export default BaseGrade;