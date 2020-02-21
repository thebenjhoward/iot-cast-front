// components/moduleA.js
import "./moduleA.scss";

const moduleA = (props) => (
    <div className="moduleA">
        <p>This is module A<br /></p>
        <p>{props.text}</p>
    </div>
);

export default moduleA;