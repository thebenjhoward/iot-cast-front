import React from 'react';
import './ClockBlock.scss';

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function ordinal(day) {
    if (day % 10 == 1 && day != 11) {
        return day + 'st';
    } else if (day % 10 == 2 && day != 12) {
        return day + 'nd';
    } else if (day % 10 == 3 && day != 13) {
        return day + 'rd';
    } else {
        return day + 'th';
    }
}

function getDate() {
    var d = new Date(Date.now());
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${ordinal(d.getDate())}, ${d.getFullYear()}`;
}

function getTime() {
    var d = new Date(Date.now());
    let seconds = d.getSeconds();
    if(seconds < 10) {
        seconds = '0' + seconds;
    }
    return d.getHours() + ":" + d.getMinutes() + ":" + seconds;
}

class ClockBlock extends React.Component {
    constructor() {
        super();
        this.state = { time: getTime(), date: getDate() };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let newTimes = { time: getTime(), date: getDate() };
            if(JSON.stringify(this.state) !== JSON.stringify(newTimes)) {
                this.setState(newTimes);

            }
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="Clock">
                <div className="date">{this.state.date}</div>
                <div className="time">{this.state.time}</div>
            </div>
        )
    }
}

export default ClockBlock;