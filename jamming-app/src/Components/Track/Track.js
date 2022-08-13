import React from 'react'; 
import './track.css';

export class Track extends React.Component{
    renderAction(){
        return (
            <button className="Track action">{(this.props.isRemoval ? '-' : '+')}</button>
        )
    }
    render(){
        return (
<div className="Track">
    <div className="Track-information">
        {/* <h3><!-- track name will go here --></h3> */}
        {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
    </div>
    
    {this.renderAction()}
    
    </div>
        )
    }
}