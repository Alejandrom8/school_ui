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

    componentDidMount(){
        this.setState({
            loading: false,
            feed: [
                {id: 1, owner: 'Alenajdro Gomez Garcia', message:'La tarea se entrega en que fecha?'},
                {id: 2, owner: 'Lizbeth Torres Bargas', message: 'HOlaaaaaaaaaaa'},
                {id: 3, owner: 'Lazka Gómez García', message: 'wooof wof wooof woof wof'},
            ]
        })
    }

    getFeed(){
        return this.state.feed.map(card => {
            return (
                <li key={card.id}>
                    <Card owner={card.owner} message={card.message} />
                </li>
            );
        });
    }

    render(){
        return(
            <section className="Feed">
                <ul>
                {this.getFeed()}
                </ul>
            </section>
        )
    }
}

export default Feed;