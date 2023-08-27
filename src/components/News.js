import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function News(props) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      // Set the document title based on the category
      const capitalizedCategory = capitalizeFirstLetter(props.category);
      document.title = `${capitalizedCategory} - NewsApp`;

      // Function to fetch data from the API
      const fetchNewsData = async () => {
        try {
          setLoading(true);
          const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
              apiKey: '', // Replace with your NewsAPI API key,
              country: props.country, // Set the country code as needed
              category : props.category,
              page: page,
              pageSize : props.pageSize
            },
          });
          setLoading(false);
          
          // Set the total number of records from the API response
          setTotalRecords(response.data.totalResults);

          // Set the articles state with the data from the API response
          setArticles(response.data.articles);
        } catch (error) {
          console.error('Error fetching news data:', error);
        }
      };
  
      // Call the fetchNewsData function when the component mounts
      fetchNewsData();
    }, [page, props.pageSize, props.country, props.category]);

    const handlePreviousClick = () => {
      // Decrement the page number when the previous button is clicked
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const handleNextClick = () => {
      // Increment the page number when the next button is clicked
      setPage((prevPage) => Math.min(prevPage + 1, Math.ceil(totalRecords / props.pageSize)));
    };

  return (
    <div className='container my-3'>
        <h1>NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <div className="row">
            {!loading && articles.map((ele) => {
                return <div className="col-md-4" key={ele.url}>
                <NewsItem title={ele.title} description={ele.description} imageUrl={ele.urlToImage} newsUrl={ele.url} source={ele.source.name} author={ele.author} date={ele.publishedAt}/>
            </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" onClick={handlePreviousClick} disabled={page === 1} className="btn btn-dark">&larr; Previous</button>
          <button type="button" onClick={handleNextClick} disabled={page >= Math.ceil(totalRecords / props.pageSize)} className="btn btn-dark">Next &rarr;</button>
        </div>
    </div>
  )
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number
}

News.defaultProps = {
  country: 'in',
  category: 'general',
  pageSize: 10
}

export default News
