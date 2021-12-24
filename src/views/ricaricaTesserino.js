import React from "react";
import './componentsCss/ricaricaTesserinoCSS.css'

export function RicaricaTesserino()
{
    return(
        <div className="containerRicarica container">
            <div className="wrapper">
                <h4 className="text-uppercase">Payment Details</h4>
                <form className="form mt-4">
                    <div className="form-group"><label htmlFor="name" className="text-uppercase">name on the card</label>
                        <input type="text" className="form-control" placeholder="Nicolos Flemming"/></div>
                    <div className="form-group"><label htmlFor="card" className="text-uppercase">card number</label>
                        <div className="card-number"><input type="text" className="card-no" step="4"
                                                            placeholder="1234 4567 5869 1234" pattern="^[0-9].{15,}"/> <span
                            className=""> <img
                            src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-marcus-samuelsson-group-2.png"
                            alt="" width="30" height="30"/> </span></div>
                    </div>
                    <div className="d-flex w-100">
                        <div className="d-flex w-50 pr-sm-4">
                            <div className="form-group"><label htmlFor="expiry" className="text-uppercase">exp.date</label>
                                <input type="text" className="form-control" placeholder="03/2020"/></div>
                        </div>
                        <div className="d-flex w-50 pl-sm-5 pl-3">
                            <div className="form-group"><label htmlFor="cvv">CVV</label> <a href="#"
                                                                                            title="CVV is a credit or debit card number, the last three digit number printed on the signature panel">what's
                                this</a> <input type="password" className="form-control pr-5" maxLength="3"
                                                placeholder="123"/></div>
                        </div>
                    </div>
                    <div className="form-inline pt-sm-3 pt-2"><input type="checkbox" name="address" id="address"/> <label
                        htmlFor="address" className="px-sm-1 pl-1 pt-sm-0 pt-2">My billing address is the same as the
                        shipping</label></div>
                    <div className="form-inline py-sm-2"><input type="checkbox" name="details" id="details"/> <label
                        htmlFor="details" className="px-sm-2 pl-2 pt-sm-0 pt-2">Save my details for future purchases</label>
                    </div>
                    <div className="my-3"><input type="submit" value="place your order"
                                                 className="text-uppercase btn btn-primary btn-block p-3"/></div>
                    <div id="form-footer">
                        <p>By placing your order, you agree to our</p>
                        <p><a href="#">privacy notice</a> & <a href="#">terms of use</a>.</p>
                    </div>
                </form>
            </div>

            <div className="amountWrapper wrapper">
                <h4 className="text-uppercase">Payment Details</h4>
                <form className="form mt-4">
                    <div className="form-group"><label htmlFor="name" className="text-uppercase">name on the card</label>
                        <input type="text" className="form-control" placeholder="Nicolos Flemming"/></div>
                    <div className="form-group"><label htmlFor="card" className="text-uppercase">card number</label>
                        <div className="card-number"><input type="text" className="card-no" step="4"
                                                            placeholder="1234 4567 5869 1234" pattern="^[0-9].{15,}"/> <span
                            className=""> <img
                            src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-marcus-samuelsson-group-2.png"
                            alt="" width="30" height="30"/> </span></div>
                    </div>
                    <div className="d-flex w-100">
                        <div className="d-flex w-50 pr-sm-4">
                            <div className="form-group"><label htmlFor="expiry" className="text-uppercase">exp.date</label>
                                <input type="text" className="form-control" placeholder="03/2020"/></div>
                        </div>
                        <div className="d-flex w-50 pl-sm-5 pl-3">
                            <div className="form-group"><label htmlFor="cvv">CVV</label> <a href="#"
                                                                                            title="CVV is a credit or debit card number, the last three digit number printed on the signature panel">what's
                                this</a> <input type="password" className="form-control pr-5" maxLength="3"
                                                placeholder="123"/></div>
                        </div>
                    </div>
                    <div className="form-inline pt-sm-3 pt-2"><input type="checkbox" name="address" id="address"/> <label
                        htmlFor="address" className="px-sm-1 pl-1 pt-sm-0 pt-2">My billing address is the same as the
                        shipping</label></div>
                    <div className="form-inline py-sm-2"><input type="checkbox" name="details" id="details"/> <label
                        htmlFor="details" className="px-sm-2 pl-2 pt-sm-0 pt-2">Save my details for future purchases</label>
                    </div>
                    <div className="my-3"><input type="submit" value="place your order"
                                                 className="text-uppercase btn btn-primary btn-block p-3"/></div>
                    <div id="form-footer">
                        <p>By placing your order, you agree to our</p>
                        <p><a href="#">privacy notice</a> & <a href="#">terms of use</a>.</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RicaricaTesserino