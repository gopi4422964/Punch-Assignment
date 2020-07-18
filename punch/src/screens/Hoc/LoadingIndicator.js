import React, {Component} from 'react';
import { View, Text, ActivityIndicator} from 'react-native';

class LoadingIndicator extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        return (

            <View style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 0,
                backgroundColor: this.props.backgroundColor || 'white',
                top: 0,
                right: 0,
                left: 0
            }}>
                <ActivityIndicator size="large" color='gray'/>
                {this.props.msg ? <Text allowFontScaling={false} style={{
                    color: 'white',
                    fontSize: 16,
                    textAlign: 'center',
                    padding: 12
                }}>{this.props.msg}</Text> : <Text>Fetching results ...!</Text>}
            </View>
        );
    }
}

export default LoadingIndicator;
