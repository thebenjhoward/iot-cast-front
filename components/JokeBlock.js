// components/JokeBlock.js
import React from 'react';
import './JokeBlock.scss';
const fetch = require('../util/clientFetch');

class JokeBlock extends React.Component {
    constructor() {
        super();
        this.state = { fetched: false, joke: { setup: "Loading Joke...", punchline: "Loading Joke..." } };
    }

    async getNewJoke() {
        try {
            var joke = await fetch(document, '/api/joke', true);
            this.setState({ fetched: true, joke });
        } catch (err) {
            this.setState({ 
                fetched: true, 
                joke: { setup: "An error has occurred", punchline: JSON.stringify(err) } 
            }) 
        }
    }

    componentDidMount() {
        if (!this.state.fetched) {
            fetch(document, '/api/joke', true)
                .then(joke => { 
                    this.setState({ fetched: true, joke }) 
                })
                .catch(err => { 
                    this.setState({ 
                        fetched: true, 
                        joke: { setup: "An error has occurred", punchline: JSON.stringify(err) } 
                    }) 
                });
            this.timer = setInterval(() => {
                fetch(document, '/api/joke', true)
                    .then(joke => { 
                        this.setState({ fetched: true, joke }) 
                    })
                    .catch(err => { 
                        this.setState({ 
                            fetched: true, 
                            joke: { setup: "An error has occurred", punchline: JSON.stringify(err) } 
                        }) 
                    });
            }, 10000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="JokeBlock">
                <b>{this.state.joke.setup}</b><br />
                <i>{this.state.joke.punchline}</i>
            </div>
        )
    }
}

export default JokeBlock;