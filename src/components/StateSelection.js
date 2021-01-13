import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react'

class StateSelection extends React.Component {

    constructor(props) {
        super(props);

        this.stateOptions = [    
            { key: 'al', text: 'Alabama', value: 'al' },
            { key: 'ak', text: 'Alaska', value: 'ak' },   
            { key: 'az', text: 'Arizona', value: 'az' },  
            { key: 'ar', text: 'Arkansas', value: 'ar' },  
            { key: 'ca', text: 'California', value: 'ca' },  
            { key: 'co', text: 'Colorado', value: 'co' },  
            { key: 'ct', text: 'Connecticut', value: 'ct' },            
            { key: 'de', text: 'Delaware', value: 'de' }, 
            { key: 'dc', text: 'District Of Columbia', value: 'dc' },     
            { key: 'fl', text: 'Florida', value: 'fl' },     
            { key: 'ga', text: 'Georgia', value: 'ga' },     
            { key: 'hi', text: 'Hawaii', value: 'hi' },     
            { key: 'id', text: 'Idaho', value: 'id' },  
            { key: 'il', text: 'Illinois', value: 'il' },     
            { key: 'in', text: 'Indiana', value: 'in' },     
            { key: 'ks', text: 'Kansas', value: 'ks' },     
            { key: 'ky', text: 'Kentucky', value: 'ky' },     
            { key: 'la', text: 'Louisiana', value: 'la' },     
            { key: 'me', text: 'Maine', value: 'me' },     
            { key: 'md', text: 'Maryland', value: 'md' },     
            { key: 'ma', text: 'Massachusetts', value: 'ma' },     
            { key: 'mi', text: 'Michigan', value: 'mi' },     
            { key: 'mn', text: 'Minnesota', value: 'mn' },     
            { key: 'ms', text: 'Mississippi', value: 'ms' },     
            { key: 'mo', text: 'Missouri', value: 'mo' },     
            { key: 'mt', text: 'Montana', value: 'mt' },            
            { key: 'ne', text: 'Nebraska', value: 'ne' },      
            { key: 'nv', text: 'Nevada', value: 'nv' },      
            { key: 'nh', text: 'New Hampshire', value: 'nh' },      
            { key: 'nj', text: 'New Jersey', value: 'nj' },      
            { key: 'nm', text: 'New Mexico', value: 'nm' },      
            { key: 'ny', text: 'New York', value: 'ny' },                
            { key: 'nc', text: 'North Carolina', value:'nc'},
            { key: 'nd', text: 'North Dakota', value:'nd'},
            { key: 'oh', text: 'Ohio', value:'oh'},
            { key: 'ok', text: 'Oklahoma', value:'ok'},
            { key: 'or', text: 'Oregon', value:'or'},
            { key: 'pa', text: 'Pennsylvania', value:'pa'},
            { key: 'ri', text: 'Rhode Island', value:'ri'},
            { key: 'sc', text: 'South Carolina', value:'sc'},
            { key: 'sd', text: 'South Dakota', value:'sd'},
            { key: 'tn', text: 'Tennessee', value:'tn'},
            { key: 'tx', text: 'Texas', value:'tx'},
            { key: 'ut', text: 'Utah', value:'ut'},
            { key: 'vt', text: 'Vermont', value:'vt'},
            { key: 'va', text: 'Virginia', value:'va'},
            { key: 'wa', text: 'Washington', value:'wa'},
            { key: 'wv', text: 'West Virginia', value:'wv'},
            { key: 'wi', text: 'Wisconsin', value:'wi'},
            { key: 'wy', text: 'Wyoming', value:'wy'}
        ]
        
        this.state = { stateCode: props.defaultStateCode, stateName: props.defaultStateName };
    }

    onSelectionChange = (e, { value }) => {
       this.setState({ stateCode: value, stateName: e.currentTarget.textContent });
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.props.onSelectionSubmit(this.state.stateCode, this.state.stateName);
    }
    
    render() {

        return (     
            <div className="center-text padding-bottom-space">
                <form onSubmit={this.onFormSubmit}>
                    <Dropdown
                        placeholder="State"
                        search
                        selection
                        value={this.state.stateCode}
                        onChange={this.onSelectionChange}
                        options={this.stateOptions}
                    />

                    <Button 
                        basic 
                        color="green"
                        type="submit"
                    > Submit
                    </Button>
                </form>

            </div>
        );
    }
}

export default StateSelection;