import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
    
    static defaultProps ={
        country :"in",
        pageSize :9,
        category : 'general'
    }
    static propTypes ={
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string
    }

    
    constructor() {
        super();
        console.log("I am a constructor from News Component");
        this.state = {
            articles: [],
            loading: false,
            page:1   
        }
    }

    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parserData = await data.json();
        this.setState({articles : parserData.articles ,
            totalResults : parserData.totalResults 
                       }) 
         this.setState({loading:false});
    }
    
     handlePreviousClick = async () =>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data = await fetch(url);
        let parserData = await data.json();
        this.setState({page:this.state.page -1,
            articles : parserData.articles
           });
        this.setState({loading:false});

    }

     handleNextClick= async () =>{
         if(this.state.page + 1 > Math.ceil(this.state.totalResults/`${this.props.pageSize}`)){

         }
         else  {
             let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
             this.setState({loading:true});
                let data = await fetch(url);
                let parserData = await data.json();
                this.setState({page:this.state.page +1,
                            articles : parserData.articles
                            });
                    }
        this.setState({loading:false});

                }


                
    render() {
        return (
            <div className="container my-1" >
              <ins >  <h1 className="my-3 mx-4 text-center" style={{fontFamily:'Pacifico cursive'}}>TOP <mark><span style={{color:'blue', fontFamily:'Pacifico cursive'}}>HEADLINES</span></mark></h1> </ins>
                {this.state.loading && <Spinner/>}
                <div className="row my-2">
                    
                    {!this.state.loading && this.state.articles.map( (articles) => {
                               let a = articles.publishedAt ;
                               let d = new Date(a);
                 return <div className="col-md-4 my-3" key={articles.url}>
                            <NewsItem title={articles.title?articles.title.slice(0,45):""} key={articles.id} description={articles.description?articles.description.slice(0,88):""} imgUrl={articles.urlToImage} newsUrl={articles.url} author={articles.author}
                            date={d.toGMTString()} source={articles.source.name} /> 
                        </div>
                    }) 
                    }
                    </div>
                          <hr />
                          <div className="container d-flex justify-content-between my-5">
                          <button  disabled={this.state.page<=1} type="button"  className="btn btn-dark" onClick={this.handlePreviousClick} >&#8592;Previous</button>
                          <button disabled= {this.state.page + 1 > Math.ceil(this.state.totalResults/`${this.props.pageSize}`)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next&#8594;</button>
                          </div>
                    </div>
                )
    }
}

                export default News

