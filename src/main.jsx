// import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import {DomainRecordProvider} from './contexts/DomainRecordContext.jsx';
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <DomainRecordProvider>
      <App />
    </DomainRecordProvider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
)
