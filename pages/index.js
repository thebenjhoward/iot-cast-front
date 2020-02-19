// pages/index.js
const React = require('react');
const layout = require('../layout/layout.json');
import ModuleA from "../components/moduleA";
import ModuleB from "../components/moduleB";

class Index extends React.Component {


    render() {
        return (
            <div className="index">
                <p>We up and running bois</p>
                {layout.map((item) => {
                    if(item.type == "moduleA") {
                        return (<ModuleA text={item.text}/>)
                    } else if (item.type == "moduleB") {
                        return (<ModuleB text={item.text}/>)
                    }
                })}
            </div>
        )
    }
};

export default Index;