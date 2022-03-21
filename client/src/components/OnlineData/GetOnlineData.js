import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleMinus, faCirclePlus, faStar} from '@fortawesome/free-solid-svg-icons';

class GetOnlineData extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : false,
            isUpdated: false,
            posts : []          
        };
    }

    componentDidMount(){
        
        fetch("http://localhost:9000/user/list/")
        .then( response => response.json())
        .then(
            // handle the result
            (result) => {
                result.sort((a,b) => a.name.localeCompare(b.name));
                //console.log(result);
                this.setState({
                    isLoaded : true,
                    posts : result
                });
            },

            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            },
        )
    }

    createStars(n){
        var Stars = [];
        var i =0;
        for(i =0; i < n; i++){
            Stars.push(<FontAwesomeIcon icon={faStar} fixedWidth/>);
        }
        return Stars;
    }
    incrementStars(name, stars){
        if(stars == 10){
            return
        }else 
        stars++;
        fetch('http://localhost:9000/user/update/' + name, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    "name" : name,
                    "stars" : stars
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(
            // handle the result
            (response) => {
                //console.log(response.status);
                this.setState({
                    isUpdated: true 
                });
                this.componentDidMount()
            },

            // Handle error 
            (error) => {
                this.setState({
                    isUpdated: true,
                    error
                })
            },
        )
    }

    decrementStars(name, stars){
        if(stars == 0){
            return
        }else 
        stars--;
        return fetch('http://localhost:9000/user/update/' + name, {
            method: 'PUT',
            
            body: JSON.stringify(
                {
                    "name" : name,
                    "stars" : stars
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(
            // handle the result
            (response) => {
                //console.log(response.status);
                this.setState({
                    isUpdated: true 
                });
                this.componentDidMount()
            },

            // Handle error 
            (error) => {
                this.setState({
                    isUpdated: true,
                    error
                })
            },
        )
    }

    render() {
        const {error, isLoaded, posts} = this.state;

        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{
            return(
                <div>
                    {
                        posts.map(post => (
                            <div>
                            <h2 className="header">{post.name}</h2>
                            <div class="fa fa-3x stars">
                                {this.createStars(post.stars)}
                            </div>
                            <br />
                            <div class='fa fa-3x'>
                            <button onClick={ () => this.incrementStars(post.name, post.stars) } class='plus button'><FontAwesomeIcon icon={faCirclePlus} fixedWidth/></button>
                            <button onClick={ () => this.decrementStars(post.name, post.stars) } class='minus button'><FontAwesomeIcon icon={faCircleMinus} fixedWidth/></button>
                            </div>
                            <br />
                        </div> 
                        ))
                    }   
                </div>
            );
        } 
    }
  }
  
  export default GetOnlineData;