// components/NewsBlock.js
import "./NewsBlock.scss";
import NewsItem from "./NewsItem";
const fetch = require('../util/clientFetch');

class NewsBlock extends React.Component {

    constructor() {
        super();
        this.state = { fetched: false };
    }

    updateNews(news) {
        this.setState({
            fetched: true,
            news
        });
    }

    componentDidMount() {
        if(!this.state.fetched) {
            fetch(document, '/api/news', true).then(data => {
                this.updateNews(data);
            })
        }
    }

    render() {
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