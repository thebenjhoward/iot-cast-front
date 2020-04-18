// components/moduleB.js
import "./moduleB.scss";

const moduleB = props => (
    <div className="moduleA">
        <p>{props.title}<br/></p>
        <p>{props.text}</p>
    </div>
);

export default moduleB;