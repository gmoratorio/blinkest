import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class BlinkestIndex extends Component{

    render(){
        return(
          <div>
              <h3>Welcome to Blinkest!</h3>
          </div>
        );
    }

}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {})(BlinkestIndex);