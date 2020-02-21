// pages/index.js
const React = require('react');

// External elements
import ModuleA from "../components/moduleA";
import ModuleB from "../components/moduleB";
import NewsBlock from "../components/NewsBlock";

// Style sheet
import "../components/index.scss";

// utility functions
const fetch = require('isomorphic-unfetch');
import { v4 as uuid } from 'uuid';
const sleep = require('util').promisify(setTimeout);


function compareObj(objA, objB) {
    //console.log(`comparing: ${JSON.stringify(objA)} and ${JSON.stringify(objB)}`)

    var aProps = Object.getOwnPropertyNames(objA);
    var bProps = Object.getOwnPropertyNames(objB);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (objA[propName] != objB[propName]) {
            return false
        }
    }

    return true;
}


class Index extends React.Component {

    constructor() {
        super();
        this.state = { fetched: false };
    }

    async updateFromServer() {
        console.log("Checking for updates...");
        const res = await fetch("http://localhost:3001/api/layout");
        const layout = await res.json();
        console.log(layout);
        if (JSON.stringify(layout) !== JSON.stringify(this.state.layout)) {
            console.log("Layout updated on server");
            this.updateLayout(layout);
        } else {
            console.log("No change from last update")
            this.updateLayout(this.state.layout);
        }
    }

    async getInitialLayout() {
        console.log("getInitialLayout")
        try {
            const res = await fetch("http://localhost:3001/api/layout");
            const layout = await res.json();
            this.updateLayout(layout)
        } catch (err) {
            console.error(err);
        }
        console.log("done");
        console.log(this.state);
    }

    // made this a function in case I want to add more stuff here later
    // also its good practice to not do too much in render()
    updateLayout(layout, fetched = true) {
        this.setState({ firstUpdate: false, fetched, layout });
    }

    componentDidMount() {
        if (!this.state.fetched) {
            this.getInitialLayout();
        }
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
        setTimeout(() => { this.updateFromServer() }, 10000)
    }


    render() {
        if (this.state.fetched && this.state.layout) {
            return (
                <div className="topGrid">
                    <NewsBlock />
                    <div className="mainGrid">
                        {this.state.layout.objects.map((item) => {
                            if (item.type == "moduleA") {
                                return (<div className="item" key={uuid()}><ModuleA text={item.text} /></div>)
                            } else if (item.type == "moduleB") {
                                return (<div className="item" key={uuid()}><ModuleB text={item.text} /></div>)
                            } else if (item.type == "NewsBlock") {
                                return (<div className="news" key={uuid()}><NewsBlock /></div>);
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