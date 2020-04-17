// components/NasaBlock.js
import './NasaBlock.scss';
import React from 'react';
const fetch = require('../util/clientFetch');

class NasaBlock extends React.Component {

    constructor() {
        super();
        this.state = { fetched: false, apod: null };
    }

    async fetchApod() {
        try {
            return await fetch(document, '/api/nasa', true)
        } catch (err) {
            return Promise.reject(err);
        }
    }

    componentDidMount() {
        if (!this.state.fetched) {
            this.fetchApod().then((res) => {
                this.setState({ fetched: true, apod: res });
            })
        }
    }

    render() {
        if(!this.state.fetched) {
            return (
                <div className="NasaBlock">
                    Loading Astronomy Picture of the Day...
                </div>
            )
        } else {
            if(this.state.error) {
                return (
                    <div className="NasaBlock">
                        Failed to Load Astronomy Picture of the Day
                    </div>
                )
            } else {
                return (
                    <div className="NasaBlock">
                        <style jsx>{`
                            .NasaBlock {
                                background-image: url("${this.state.apod.url}")
                            }
                        `}</style>
                        {/* <img className="image" src={this.state.apod.url} /> */}
                    </div>
                )
            }
        }
    }
}

export default NasaBlock;