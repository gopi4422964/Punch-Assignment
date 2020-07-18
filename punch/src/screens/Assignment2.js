import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, Dimensions, View, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import loaderHoc from './Hoc/LoaderHoc';
const FlatListWithLoader = loaderHoc(FlatList);

export default class Assignment2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsArr: [],
            searchTerm: '',
            switchView: 2,
            currentView: 'Grid',
            isLoading: true,
        }
    }
    componentDidMount() {
        this.getSongsList()
    }
    render() {
        const { isLoading } = this.state;

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', height: 60, marginBottom: 5, justifyContent: 'space-between' }}>
                        <TextInput style={styles.search} placeholder={'Search'} value={this.state.searchTerm} onChangeText={(text) => {
                            this.setState({
                                searchTerm: text
                            })
                            this.getSongsList(text)
                        }} />
                        <TouchableOpacity style={{ width: 50, height: 60, top: 40 }}
                            onPress={() => this.swithcView()}>
                            <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: '600' }}>{this.state.currentView} </Text>
                        </TouchableOpacity>


                    </View>
                    {this.state.resultsArr && this.state.resultsArr.length > 0 ? <FlatListWithLoader style={styles.flatListStyle} isLoading={isLoading}
                        data={this.state.resultsArr}
                        numColumns={this.state.switchView}
                        key={this.state.switchView}
                        keyExtractor={(item) => (item.trackId)}
                        renderItem={this.renderItem} /> :
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', padding: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: '400', padding: 10 }}>No Result found, Please try other keyword</Text>
                            <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: 'gray', borderColor: 'black' }}
                                onPress={() => this.tryAgagin()}>
                                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center', padding: 10 }}> RETRY </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </SafeAreaView>
        );
    }
    swithcView = () => {
        { this.state.switchView == 2 ? this.setState({ switchView: 1, currentView: 'List' }) : this.setState({ switchView: 2, currentView: 'Grid' }) }
    }
    renderItem(item) {

        return (
            <View  >
                <Image style={styles.image} source={{ uri: item.item.artworkUrl100 }} />
                <View style={styles.imageContainer}>
                    <Text style={styles.title}>{item.item.artistName}</Text>
                </View>
            </View>

        )
    }
    tryAgagin() {
        this.state.searchTerm = ""
        this.getSongsList()
    }
    getSongsList(text) {

        const urlEndpoint = `https://itunes.apple.com/search?term=${text}`
        console.log("urlEndpoint --> ", urlEndpoint)
        axios.get(urlEndpoint)
            .then((response) => {
                console.log(response)
                this.setState({
                    resultsArr: response.data.results,
                    isLoading: false,

                })
            }).catch((error) => {
                console.log(error)
            })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    image: {
        width: (Dimensions.get('window').width / 2) - 20,
        height: 150,
        margin: 10,
    },
    imageContainer: { left: 10, width: (Dimensions.get('window').width / 2) - 20, position: 'absolute', padding: 10, backgroundColor: 'rgba(52, 52, 52, 0.6)', bottom: 10 },
    title: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700'
    },
    flatListStyle: {
        flex: 1,
    },
    search: {
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        marginTop: 10,
        width: 300,
        borderBottomWidth: 2,
        borderBottomColor: 'gray'
    }
});