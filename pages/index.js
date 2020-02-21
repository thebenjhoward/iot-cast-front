// pages/index.js
const React = require('react');
const layout = require('../layout/layout.json');
import ModuleA from "../components/moduleA";
import ModuleB from "../components/moduleB";
import NewsBlock from "../components/NewsBlock";
import "../components/index.scss";

class Index extends React.Component {

    constructor() {
        super();
        this.bottomRef = React.createRef();
    }

    scrollToRef() {

    }

    render() {
        return (
            <div className="topGrid">
                <NewsBlock/>
                <div className="mainGrid">
                    {/* <button onClick={this.scrollToRef()}>Go To Bottom</button> */}
                    {layout.map((item) => {
                        if (item.type == "moduleA") {
                            return (<div className="item"><ModuleA text={item.text} /></div>)
                        } else if (item.type == "moduleB") {
                            return (<div className="item"><ModuleB text={item.text} /></div>)
                        } else if (item.type == "NewsBlock") {
                            return (<div className="news"><NewsBlock /></div>);
                        }
                    })}
                    {/* <div ref={this.bottomRef}/> */}
                </div>
            </div>
        )
    }
};

export default Index;