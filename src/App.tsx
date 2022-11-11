import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
import InvoicePage from "./invoices/pages/InvoicePage";

function App() {
    return (
        <div className="app__root">
            <Router>
                <div className="app__header">
                    <h1>Moje Faktury</h1>
                </div>
                <div className="app__page container">
                    <Route exact path="/" component={InvoicePage}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
