import React from 'react'
import "../App.css"
import {Container} from "react-bootstrap";
export function RimozionePersonale () {
  return (

      <Container className="inserisciPersonale">
        <h1 className="h1">Inserisci credenziali nuovo membro</h1>
        <form className="needs-validation" noValidate>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label htmlFor="validationCustom01">Inserisci Nome<span className="text-danger"> *</span></label>
              <input type="text" className="form-control" id="validationCustom01" placeholder="First name" value="Mark"
                     required></input>
              <div className="valid-feedback"></div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="validationCustom02">Inserisci Cognome</label>
              <input type="text" className="form-control" id="validationCustom02" placeholder="Last name" value="Otto"
                     required></input>
              <div className="valid-feedback"></div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="validationCustomUsername">Inserisci Email</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend">@</span>
                </div>
                <input type="text" className="form-control" id="validationCustomUsername" placeholder="Username"
                       aria-describedby="inputGroupPrepend" required></input>
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom03">City</label>
              <input type="text" className="form-control" id="validationCustom03" placeholder="City" required></input>
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom04">State</label>
              <input type="text" className="form-control" id="validationCustom04" placeholder="State" required></input>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom05">Zip</label>
              <input type="text" className="form-control" id="validationCustom05" placeholder="Zip" required></input>
              <div className="invalid-feedback">
                Please provide a valid zip.
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required></input>
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <button className="btn btn-primary" type="submit">Submit form</button>
        </form>

        <script>
          (function() {
          window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
              form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add('was-validated');
              }, false);
            });
          },false)
        })();
        </script>
      </Container>
  )
}
export default RimozionePersonale
