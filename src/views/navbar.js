import React, { useState } from 'react'
import "./icss/navbar.css"
function Navbar () {
  return (
    <html>
        <head>
          <title>UnisaEat</title>
          <link
            href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet'
            integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
            crossOrigin='anonymous'
          />

        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand" href="#">Mouri</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Portfolio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

     {/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="https://i.postimg.cc/bNQp0RDW/1.jpg" alt="First slide"></img>
            <div class="carousel-caption d-none d-md-block">
              <h5>Slider One Item</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, nulla, tempore. Deserunt excepturi quas vero.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="https://i.postimg.cc/pVzg3LWn/2.jpg" alt="Second slide"></img>
            <div class="carousel-caption d-none d-md-block">
              <h5>Slider One Item</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, nulla, tempore. Deserunt excepturi quas vero.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="https://i.postimg.cc/0y2F6Gpp/3.jpg" alt="Third slide"></img>
            <div class="carousel-caption d-none d-md-block">
              <h5>Slider One Item</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, nulla, tempore. Deserunt excepturi quas vero.</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div> */}
      <script src='https://code.jquery.com/jquery-3.3.1.slim.min.js'></script>
      <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'></script>

      </body>
    </html>
  )
}

export default Navbar
