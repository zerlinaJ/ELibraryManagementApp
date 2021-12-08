import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: "normal",
      hasCameraPermissions: null,
      scanned: false, 
      scannedData: ""
    };
  }

  getCameraPermissions = async () => {
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
      buttonState: "clicked",
      hasCameraPermissions: status === "granted",
      scanned: false
    });
    
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      buttonState: "normal",
      scanned: true
    });
  };

  render() {
    const { buttonState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (buttonState === "clicked" && hasCameraPermissions===true) {
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
    else if (buttonState === "clicked" && hasCameraPermissions===false) {
      return (
       <Text>Permission Denied</Text>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            {hasCameraPermissions ? scannedData : "Request for Camera Permission"}
          </Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: 25 }]}
            onPress={() => this.getCameraPermissions()}
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );


    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 15
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF"
  }
});
