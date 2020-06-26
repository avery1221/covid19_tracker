import React, { Component } from 'react';
import { Card, CardImg, Button } from 'reactstrap';
import Img from './prevention4.svg';

class SafetyTips extends Component {
  render() {
    return (
      <div
        className=' position-fixed text-center'
        style={{ marginTop: '70px', marginLeft: '-15px', width: '23%' }}
      >
        <Card>
          <Button
            disabled
            style={{ backgroundColor: '#2D9707', color: 'white' }}
          >
            PREVENTION
          </Button>
          <CardImg src={Img} alt='Card image cap' />
          <a></a>
        </Card>
      </div>
    );
  }
}

export default SafetyTips;
