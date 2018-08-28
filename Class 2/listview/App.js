import React, { Component } from 'react';
import Modal from 'react-native-modalbox'
import { AppRegistry, FlatList, StyleSheet, Text, View ,Image,Platform,Dimensions,Button} from 'react-native';
import axios from 'axios';
var screen=Dimensions.get('window');
export default class FlatListBasics extends Component {
  constructor(props){
      super(props);
      this.arrayholder=[{key:"Andres"}];
      this.state={
        dataSource:this.arrayholder,
        modalVisible:false,
        imagen:''
      };
  }
  cargarListaRazas(){
    axios.get('https://dog.ceo/api/breeds/list')
    .then(response=>{
      //https://dog.ceo/api/breed/"+ $("#razas").val()+"/images/random
      this.arrayholder=response.data.message;
      var listaCiudades=response.data.message;
      for(var x=0;x<listaCiudades.length;x++){
        listaCiudades[x]={key:listaCiudades[x]}
      }
      this.arrayholder=listaCiudades;
      this.setState({
        dataSource: this.arrayholder
      }, function() {
        // In this block you can do something with new state.
        this.arrayholder = response.data.message;
      })
    }).catch(function (error) {
      return error.data
  })
  }
  GetListViewItem(item){
    axios.get("https://dog.ceo/api/breed/"+item+"/images/random")
    .then(response=>{
      console.log(response.data.message);
      this.setState({
        imagen:response.data.message,
        modalVisible:true
      }, function() {
      })
    }).catch(function (error) {
      return error.data
  })
  }
  componentWillMount(){
      this.cargarListaRazas();
  }
  setStateModalImagen(){
    this.setState({
      modalVisible:false
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text style={styles.item} onPress={this.GetListViewItem.bind(this, item.key)}>{item.key} </Text>}
        />
        <Modal
            style={styles.modal}
            position='center'
            backdrop={true}
            isOpen={this.state.modalVisible}
            onClosingState={()=>{
                  this.setState({
                      modalVisible:false
                  })
                  }}>
                  <View style={styles.modalImg}>
                       <Image
                           source={{ uri: this.state.imagen}}
                           style={styles.img}
                        />
                  </View>
                  <Button style={styles.botonModal} title="Cerrar" color="black" onPress={this.setStateModalImagen.bind(this)}></Button>
         </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  modal:{
    justifyContent:'center',
    borderRadius: Platform.OS==='android'?30:0,
    shadowRadius: 10,
    width:screen.width-80,
    height:280
  },
  img:{
    marginTop: 10,
    marginLeft: 0,
    width: 193,
    height: 110,
  },modalImg: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'column',
  },botonModal:{
    marginBottom:0
  }
})
// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => FlatListBasics);