import React, { Component } from 'react';

class Footer extends Component {
    state = {  }
    render() { 
        return (
            <div className="mt-5">
          <div className="logodiv">
              <img src='/favicon.png' alt="logo" className="logo"></img>
          </div>
            <footer className="bg-dark text-white  p-4 text-center">
    Copyright &copy;  D-Connector
  </footer>
            </div>
          );

    }
}
 
export default Footer;