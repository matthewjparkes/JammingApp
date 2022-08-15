import React from 'react'; 
import './track.css';

export class Track extends React.Component{
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAudioPreview=this.renderAudioPreview.bind(this);
    }
    renderAction(){
        if(this.props.isRemoval){
            return (
                <button className='Track action' onClick = {this.removeTrack} >-</button>
            )
        }else{
        return (
            <button className="Track action" onClick = {this.addTrack} >+</button>
        )
        }
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    renderAudioPreview(){
        if(this.props.track.preview){
            return( 
            <audio src={this.props.track.preview} controls type="audio/mpeg"></audio>
            )
        }else{
            return(
                <p className="NoPreview">No Preview Available</p>
            )
        }
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    render(){
        return (
<div className="Track">
    <div className="Track-information">
        <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p> {this.renderAudioPreview()}
    </div>
    
    {this.renderAction()}
    
    </div>
        )
    }
}