import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground } from "react-native";
import * as Permissions from "expo-permissions";

import { BarCodeScanner } from "expo-barcode-scanner";

const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");

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
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <View style={styles.upperContainer}>
            <Image source={appIcon} style={styles.appIcon} />
            <Image source={appName} style={styles.appName} />
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.textinputContainer}>
              <TextInput
                style={styles.textinput}
                placeholder={"Book Id"}
                placeholderTextColor={"#FFFFFF"}
                value={this.state.scannedBookId}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("BookId")}
              >
                <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.textinputContainer, { marginTop: 25 }]}>
              <TextInput
                style={styles.textinput}
                placeholder={"Student Id"}
                placeholderTextColor={"#FFFFFF"}
                value={this.state.scannedStudentId}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("StudentId")}
              >
                <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      );


    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop:50
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  appName: {
    width: 80,
    height: 80,
    marginBottom: 50,
    resizeMode: "contain"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center",
    marginTop:50
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  }
});