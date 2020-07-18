import React, { Component } from 'react'
import { View, Text } from 'react-native';

class Assignment1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hour: 4,
            min: 13,
            angle: 0
        }
    }

    componentDidMount(){
        this.calculateAngel(this.state.hour,this.state.min);
    }
    calculateAngel = (hour, min) => {
        let h = (hour * 360) / 12 + (min * 360) / (12 * 60);
        let m = (min * 360) / (60);
        let anglehounrmin = Math.abs(h - m);
        if (anglehounrmin > 180) {
            anglehounrmin = 360 - anglehounrmin;
        }
        console.log("Angel Betwen Hour & Min--> ", anglehounrmin)
        this.setState({angle:anglehounrmin})
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent:'center',alignItems:'center' }}>
                <Text style={{ color: 'black',fontSize:18,fontWeight:'500' }}>Assisgnment 1- {'\n\n'} Angle Betwen {this.state.hour} and {this.state.min} is - {this.state.angle}</Text>
            </View>)
    }

}

export default Assignment1;