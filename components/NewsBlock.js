// components/NewsBlock.js
import "./NewsBlock.scss";
import React, { useRef, useEffect } from "react";
const fetch = require("isomorphic-unfetch");
import NewsItem from "./NewsItem";

//const endRef = useRef(null);

class NewsBlock extends React.Component {

    constructor() {
        super();
        this.state = { fetched: false };

    }

    componentDidUpdate() {

    }

    updateNews(news) {
        this.setState({
            fetched: true,
            news
        });
    }

    render() {
        console.log("rendered with state");
        console.log(this.state);
        if(!this.state.fetched) {
            fetch("http://localhost:3001/api/news").then(res => res.json())
            .then((data) => {
                //console.log(data);
                this.updateNews(data);
            })
            .catch((err) => {
                console.error(err);
            });
        }
        if(this.state.news) {
            return (
                <div className="NewsBlock" >
                    {this.state.news.articles.map((art) => (
                        <NewsItem article={art}/>
                    ))}
                </div>
            )
        } else {
            return (
                <div className="Loading">Loading...</div>
            )
        }

    }
}

export default NewsBlock