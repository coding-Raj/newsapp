import React from "react";

function NewsItem(props) {
  return (
    <div className="my-3">
      <div className="card" style={{width: "18rem"}}>
        <img src={props.imageUrl ? props.imageUrl : 'https://w7.pngwing.com/pngs/400/76/png-transparent-computer-icons-news-media-newspaper-physical-address-extension-blue-text-label.png'} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <span className="badge rounded-pill text-bg-info">{props.source}</span>
          <p className="card-text">{props.description}</p>
          <p className="card-text"><small className="text-muted">By {!props.author? "Unknown" : props.author} on {new Date(props.date).toGMTString()}</small></p>
          <a href={props.newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
