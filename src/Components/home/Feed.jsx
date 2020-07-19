import React from 'react';
import '../styles/Feed.css';

class Card extends React.Component{
    render(){
        return(
            <div className="Feed__Card">
                <b>{this.props.owner}</b>
                <p>{this.props.message}</p>
            </div>
        )
    }
}

class Feed extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            feed: []
        }
    }

    componentWillMount(){
        this.setState({
            loading: false,
            feed: [
                {owner: 'Alenajdro Gomez Garcia', message:'La tarea se entrega en que fecha?'},
                {owner: 'Lizbeth Torres Bargas', message: 'A que hora me vas a besar Alejandro?'},
                {owner: 'Lazka Gómez García', message: 'wooof wof wooof woof wof'},
            ]
        })
    }

    getFeed(){
        return this.state.feed.map(card => {
            return <Card owner={card.owner} message={card.message} />;
        });
    }

    render(){
        return(
            <section className="Feed">
                {this.getFeed()}
            </section>
        )
    }
}

export default Feed;