import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import * as Permissions from "expo-permissions";

import { BarCodeScanner } from "expo-barcode-scanner";

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedBookId: '',
      scannedStudentId:'',
    };
  }

  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // const response= await Permissions.askAsync(Permissions.CAMERA);
    // console.log(response);
    // const { per } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY); 
    console.log(status);
    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      //buttonState = "normal" or buttonState = "clicked"
      //buttonState will be 'normal' when the application starts. 
      //When the button is clicked to get camera permissions, buttonState should change to 'scanner'.
      // buttonState: "clicked",
      buttonState: id,
      hasCameraPermissions: status === "granted",
      scanned: false
    });

  };

  handleBarCodeScanned = async ({ type, data }) => {
    // this.setState({
    //   scannedData: data,
    //   buttonState: "normal",
    //   scanned: true
    // });

    const {buttonState} = this.state

    if(buttonState==="BookId"){
      this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: 'normal'
      });
    }
    else if(buttonState==="StudentId"){
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: 'normal'
      });
    }
    
  };

  render() {
    const { buttonState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (buttonState !== 'normal' && hasCameraPermissions === true) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          //onBarCodeScanned is like onPress, 
          //onPress = {this.doSomething}, Similarly, 
          //onBarCodeScanned = {this.handleBarCodeScanned} -- this gets called only when scanned is false, ie. if scanning is not already done
          style={StyleSheet.absoluteFillObject} //absoluteFillObject is predefined
        />
        // <Camera></Camera>
      );
    }
    else if (buttonState === "normal"){
      return (
        <View style={styles.container}>

          <View>
            <Image source={require("../assets/booklogo.jpg")} style={{ width: 200, height: 200 }} />
            <Text style={{ textAlign: 'center', fontSize: 30 }}>Wily</Text>
          </View>

          <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox} 
              placeholder="Book Id" 
              value={this.state.scannedBookId} 
              onChangeText={text => this.setState({scannedBookId:text})}
              />
            <TouchableOpacity style={styles.scanButton} onPress={() => { this.getCameraPermissions("BookId") }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox} 
              placeholder="Student Id" 
              value={this.state.scannedStudentId} 
              onChangeText={text => this.setState({scannedStudentId:text})}
              />
            <TouchableOpacity style={styles.scanButton} onPress={() => { this.getCameraPermissions("StudentId") }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      );


    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  inputView:{
    flexDirection: 'row',
    margin: 20
  },
  
  inputBox:{
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20
  },
  buttonText:{
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10
  },
 
  scanButton:{
    backgroundColor: '#66BB6A',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0
  }
});