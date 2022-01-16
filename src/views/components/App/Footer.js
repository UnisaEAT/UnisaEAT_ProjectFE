import React from 'react'
import "../../styles/AppStyle/Footer.css"

export function Footer() {
    return (
        <footer className="mainfooter" role="contentinfo">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">

                            <div className="footer-pad">
                                <h4>Membri</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#">Maria</a></li>
                                    <li><a href="#">Claudio</a></li>
                                    <li><a href="#">Alex</a></li>
                                    <li><a href="#">Ale</a></li>
                                    <li><a href="#">Car</a></li>
                                    <li><a href="#">Nick</a></li>
                                    <li><a href="#">Gerry</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 copy">
                            <p className="text-center">&copy; Copyright 2022 - UnisaEAT. All rights reserved.</p>
                        </div>
                    </div>


                </div>
            </div>
        </footer>
    )
}

export default Footer