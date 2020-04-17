// pages/index.js
const React = require('react');

// External elements
import ModuleA from "../components/moduleA";
import ModuleB from "../components/moduleB";
import NewsBlock from "../components/NewsBlock";
import NasaBlock from "../components/NasaBlock";
import JokeBlock from "../components/JokeBlock";
import CatsBlock from "../components/CatsBlock";


// Style sheet
import "../components/index.scss";

// utility functions
const fetch = require('../util/clientFetch');
import { v4 as uuid } from 'uuid';


class Index extends React.Component {

    constructor() {
        super();
        this.state = { fetched: false };
    }

    async updateFromServer() {
        console.log("Checking for updates...");
        console.log(this);
        const res = await fetch(document, "/api/layout");
        const layout = await res.json();
        console.log(layout);
        if (JSON.stringify(layout) !== JSON.stringify(this.state.layout)) {
            console.log("Layout updated on server");
            this.updateLayout(layout);
        } else {
            console.log("No change from last update")
        }
    }

    async getInitialLayout() {
        console.log("getInitialLayout")
        try {
            const res = await fetch(document, "/api/layout");
            const layout = await res.json();
            this.updateLayout(layout)
        } catch (err) {
            console.error(err);
        }
        console.log("done");
    }

    // made this a function in case I want to add more stuff here later
    // also its good practice to not do too much in render()
    updateLayout(layout, fetched = true) {
        this.setState({ firstUpdate: false, fetched, layout });
    }

    componentDidMount() {
        if (!this.state.fetched) {
            this.getInitialLayout().then(() => {
                this.timer = setInterval(() => {
                    console.log("Checking for updates...");
                    fetch(document, "/api/layout", true).then((layout) => {
                        if (JSON.stringify(layout) !== JSON.stringify(this.state.layout)) {
                            console.log("Layout updated on server");
                            this.updateLayout(layout);
                        } else {
                            console.log("No change from last update")
                        }
                    })
                }, 5000);
            });
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");

    }


    render() {
        if (this.state.fetched && this.state.layout) {
            return (
                <div className="topGrid">
                    <NewsBlock />
                    <div className="mainGrid">
                        {this.state.layout.objects.map((item) => {
                            if (item.type == "moduleA") {
                                return (<div className="item" key={uuid()}><ModuleA text={item.text} /></div>);
                            } else if (item.type == "moduleB") {
                                return (<div className="item" key={uuid()}><ModuleB text={item.text} /></div>);
                            } else if (item.type == "NewsBlock") {
                                return (<div className="news" key={uuid()}><NewsBlock /></div>);
                            } else if (item.type == "NasaBlock") {
                                return (<div className="item" key={uuid()}><NasaBlock /></div>);
                            } else if (item.type == "JokeBlock") {
                                return (<div className="item" key={uuid()}><JokeBlock /></div>);
                            } else if (item.type == "CatsBlock") {
                                return (<div className="item" key={uuid()}><CatsBlock /></div>);
                            }
                        })}
                    </div>
                </div>
            )
        } else {
            // todo, make this look better
            return <p>Loading...</p>
        }
    }
};

export default Index;