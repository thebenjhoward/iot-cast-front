// components/NewsItem.js
import "./NewsItem.scss";
import React from 'react';

function trim(str) {
    var maxLength = 200;
    if (str.length > maxLength) {
        var trimmedStr = str.substr(0, maxLength);
        trimmedStr = trimmedStr.substr(0, Math.min(trimmedStr.length, trimmedStr.lastIndexOf(" ")));
        return trimmedStr + "...";
    } else {
        return str;
    }
};

class NewsItem extends React.Component {
    render() {
        var article = this.props.article;
        return (
            <div className="NewsItem">
                <div className="head">
                    <img className="image" src={article.urlToImage} alt={article.source.name} />
                    <h3>{article.title}</h3>
                </div>
                <div className="byline">
                    <p>from {article.source.name}</p>
                </div>
                <div className="content">
                    <p>{article.content ? trim(article.content) : ""}</p>
                </div>
            </div>
        )
    }
}

export default NewsItem;