import React from "react";
import image1 from '../img/2.jpg';
import image2 from '../img/3.jpg';
import image3 from '../img/4.jpg';
import './HomeBanner.css';
// home banner function component .. 
function HomeBanner() {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner banner-img">
          <div className="carousel-item active">
            <img src={image2} className="d-block w-100 img-fluid" alt="Slide 1" />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="mb-4">E-commerce..</h5>
              <p>New fashion is here.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={image3} className="d-block w-100 img-fluid" alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block">
              <h5>E-commerce..</h5>
              <p>New fashion is here.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={image1} className="d-block w-100 img-fluid" alt="Slide 3" />
            <div className="carousel-caption d-none d-md-block">
              <h5>E-commerce..</h5>
              <p>New fashion is here.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default HomeBanner;

