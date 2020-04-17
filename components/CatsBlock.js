// components/CatBlock.js
import "./CatsBlock.scss";
import React, { useRef, useEffect } from "react";
const fetch = require("../util/clientFetch");

class CatsBlock extends React.Component {

    constructor() {
        super();
        this.state = { fetched: false, cats: "Loading Cat Fact..." };
    }

    async getNewFact() {
        try {
            cats = await fetch(document, '/api/cats', true)
            this.setState({ fetched: true, cats })
        } catch (err) {
            this.setState({ fetched: true, cats: "An unknown error has occurred\n" + JSON.stringify(err) })
        }

    }

    componentDidMount() {
        if (!this.state.fetched) {
            fetch(document, '/api/cats', true)
                .then((cats) => this.setState({ fetched: true, cats }))
                .catch((err) => this.setState({ fetched: true, cats: "An unknown error has occurred\n" + JSON.stringify(err) }));
            this.timer = setInterval(() => {
                fetch(document, '/api/cats', true)
                    .then((cats) => this.setState({ fetched: true, cats }))
                    .catch((err) => this.setState({ fetched: true, cats: "An unknown error has occurred\n" + JSON.stringify(err) }));
            }, 10000);
        }

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="CatsBlock">
                <b>Random Cat Fact!!</b><br />
                <i>{this.state.cats}</i>
            </div>
        )

    }
}

export default CatsBlock