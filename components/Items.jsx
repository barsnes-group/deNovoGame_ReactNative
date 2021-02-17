import React, { useState } from "react";
import { Button, Text, View, PanResponder, Animated, StyleSheet } from "react-native";

//------------BOXES & BOX CONTAINER----------------------
function Box(props) {
    const type = props.type;
    
    if (type == `red`) {
        return (<View style={styles.redBox}> 
        <Text style={styles.text}>{props.type}</Text>
         </View>
         );
    }
    else if (type == `blue`) {
        return (<View style={styles.blueBox}>
            <Text style={styles.text}>{props.type}</Text>
        </View>
        );
    }    
}


//-----------SLOTS & DROPZONE-----------------
// const Slot = (props) => {}
function Slot(props) {
  const [box, setBox] = useState(null); 
  const number = props.number;
        if (number == `1`) {
            return (
            <View style={styles.slot1}> 
                <Text style={styles.text}>Slot {props.number}</Text>
            </View>
             );
        }
        else if (number == `2`) {
            return (
            <View style={styles.slot2}>
                <Text style={styles.text}>Slot {props.number}</Text>
            </View>
            );
        }    
}


function App() {
    return (
        <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
            <Text style={styles.text}>Dropzone</Text>
            <View style={{flex: 1, flexDirection: 'row', alignContent: `stretch`}}>
                <>
                <Slot number="1"/>
                <Slot number="2"/>
                </>
            </View>
        </View>

        <View style={styles.boxContainer}>
            <Text style={styles.text}>BoxContainer</Text>
           <View style={{flex: 1, flexDirection: 'row', alignContent: `stretch`}}>
                <>
                <Box type="red"/>
                <Box type="blue"/>
                <Box type="red"/>
                <Box type="blue"/>
                </>
            </View> 
        </View>
        </View>
    ); 
}
export default App;



//----------------STYLES----------------------
let FINAL_INT = 30;
const styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    blueBox: {
        backgroundColor: "skyblue",
        width: FINAL_INT*3,
        height: FINAL_INT*3,
    },
    redBox: {
        backgroundColor: "pink",
        width: FINAL_INT*3,
        height: FINAL_INT*3,
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
    boxContainer: {
        alignItems: "stretch",
        backgroundColor: "powderblue",
        alignSelf: `stretch`,
        height: FINAL_INT*8,

    },
    dropZone: {
        alignItems: "stretch",
        backgroundColor: "#00334d",
        height: FINAL_INT*8,
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