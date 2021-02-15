import React, { useState } from "react";
import { Button, Text, View, PanResponder, Animated, StyleSheet } from "react-native";


//Boxes --> place in its own class?
const Box1 = (props) => {
    return (
        <View style={styles.row}>
            <Animated.View
              style={[styles.square]}
            />
      </View>
    );  
}

const boxContainer = () => {
    return (
        <View style={styles.square}>
            <>
            <Box1/>
            <Box2/>
            </>
        </View>
    ); 
}



const Slot1 = (props) => {
  const [box, setBox] = useState(null);

  return (
    <View style={styles.slot1}>
        <Text style={styles.text}>Slot 2</Text>
    </View>
  );
}

const Slot2 = (props) => {
    const [box, setBox] = useState(null);
  
    return (
      <View style={styles.slot2}>   
        <Text style={styles.text}>Slot 2</Text>
      </View>
    );
  }

const dropZone = () => {
    return (
        <View style={styles.dropZone}>
            <View style={{flex: 1, flexDirection: 'row', alignContent: `stretch`}}>
                <>
                <Slot1/>
                <Slot2/>
                </>
            </View>
        </View>
    ); 
}
export default dropZone;





const App = () => {
    return (
        <View style={styles.square}>
            <>
            <Box1/>
            <Box2/>
            </>
        </View>
    ); 
}






let FINAL_INT = 30;
const styles = StyleSheet.create({
    mainContainer: {
      flex: 2
    },
    ballContainer: {
      height:200,
    },
    square: {
        backgroundColor: "skyblue",
        width: FINAL_INT*2,
        height: FINAL_INT*2,
    },
    slot1: {
        backgroundColor: "lightblue",
        width: FINAL_INT*4,
        height: FINAL_INT*4,
        alignItems: "stretch",
    },
    slot2: {
        backgroundColor: "pink",
        width: FINAL_INT*4,
        height: FINAL_INT*4,
        alignItems: "stretch",
    },
    row: {
      flexDirection: "row"
    }, 
    col: {
        flexDirection: "column"
      },  
    dropZone: {
        alignItems: "stretch",
      backgroundColor: "#00334d"
    },
    text: {
      marginTop: 25,
      marginLeft: 5,
      marginRight: 5,
      textAlign: "center",
      color: "#fff",
      fontSize: 25,
      fontWeight: "bold"
    }
  });