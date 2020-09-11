import React from 'react';
import '../styles/Feed.css';

import Gravatar from './Gravatar';

function Card(props) {
    return(
        <div className="Feed__Card container">
            <div className="row">
                <div className="col s2">
                    <Gravatar 
                        className="circled" 
                        alt="profile" 
                        email={'alex' + Math.random() * 10}
                    />
                </div>
                <div className="col s10">
                    <span>
                        <b>{props.owner}</b>
                    </span>
                    <p>{props.message}</p>
                </div>
            </div>
        </div>
    )
}

class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            feed: []
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
            feed: [
                {id: 1, owner: 'Alenajdro Gomez Garcia', message:'La tarea se entrega en que fecha?'},
                {id: 2, owner: 'Lazka Gómez García', message: 'wooof wof wooof woof wof'},
                {id: 3, owner: 'Alenajdro Gomez Garcia', message:'La tarea se entrega en que fecha?'},
                {id: 4, owner: 'Lazka Gómez García', message: 'wooof wof wooof woof wof'},
            ]
        })
    }

    getFeed() {
        return this.state.feed.map(card => {
            return (
                <li key={card.id} className="collection-item">
                    <Card owner={card.owner} message={card.message} />
                </li>
            );
        });
    }

    render() {
        return(
            <section className="Feed">
                <ul id="Feed__list" className="collection">
                {this.getFeed()}
                </ul>
            </section>
        )
    }
}

export default Feed;