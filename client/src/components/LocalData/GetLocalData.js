import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleMinus, faCirclePlus, faStar} from '@fortawesome/free-solid-svg-icons';

import person from './data.js';

class GetLocalData extends Component {
    constructor(props){
        super(props);
        this.state = {            
            person :person            
        };
    }
    
    createStars(n){
        var Stars = [];
        var i =0;
        for(i =0; i < n; i++){
            Stars.push(<FontAwesomeIcon icon={faStar} fixedWidth/>);
        }
        return Stars;
    }

    render() {
        const {person} = this.state;
        return(
            <div>
               {
                    person.map(data => (
                        <div>
                            <h2 className="header">{data.name}</h2>
                            <div class="fa fa-4x stars">
                            {this.createStars(data.stars)}
                        </div>
                            <br />
                        </div>
                   ))
                }
            </div>
        );
    }
  }
  
  export default GetLocalData;