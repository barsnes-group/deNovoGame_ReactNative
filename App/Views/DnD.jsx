import React, { useRef, useState } from "react";
import { Text, View, PanResponder, Animated, StyleSheet } from "react-native";

//TODO: box you pick is on top

/**
 * Component of movable boxes
 * @param {*} props 
 * @returns 
 */
function MovableBox(props) {
  const type = props.type;
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: (e, gesture) => {
        if (isDropArea(gesture, type)) {
          Animated.spring(pan, { toValue: { x: pan.x, y: pan.y } }).start();
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
        }
      },
    })
  ).current;


  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <View style={type=="red" ? styles.redBox : styles.blueBox } />
      </Animated.View>
    </View>
  );
}

//-----------SLOTS-----------------
//TODO: box in the middle of slot
//teng boks hvis slot ikke opptatt

/**
 * Component of different types of slots
 * Number represent the type of slot
 */
function Slot(props, id) {
  const number = props.number;
  if (number == "1") {
    return (
      <View style={styles.slot1}>
        <Text style={styles.text}>Slot {props.number}</Text>
      </View>
    );
  } else if (number == "2") {
    return (
      <View style={styles.slot2}>
        <Text style={styles.text}>Slot {props.number}</Text>
      </View>
    );
  }
}

//TODO: only one box per slot
//TODO: find element on position
//TODO: don't hardcode slots?

/**
 * Function that check if box can go in the slot
 * @param {PanResonderGestureState} gesture 
 * @param {any} type 
 * @returns true/false
 */
function isDropArea(gesture, type) {
  if (gesture.moveY > 200) {
    return false;
  }
  if (type == "blue" && gesture.moveX >= 0 && gesture.moveX < 120) {
    return true;
  } else if (type == "red" && gesture.moveX > 120 && gesture.moveX < 240) {
    return true;
  }
  return false;
}

function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropZone}>
        <Text style={styles.text}>Dropzone</Text>
        <View
          style={{ flex: 1, flexDirection: "row", alignContent: "stretch" }}
        >
          <Slot number="1" />
          <Slot number="2" />
        </View>
      </View>

      <View style={styles.boxContainer}>
        <Text style={styles.text}>BoxContainer</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <>
            <MovableBox type="red" />
            <MovableBox type="blue" />
            <MovableBox type="red" />
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
    flex: 1,
  },
  blueBox: {
    backgroundColor: "skyblue",
    width: FINAL_INT * 3,
    height: FINAL_INT * 3,
    borderWidth: 1,
    borderColor: "black",
  },
  redBox: {
    backgroundColor: "pink",
    width: FINAL_INT * 3,
    height: FINAL_INT * 3,
    borderWidth: 1,
    borderColor: "black",
  },
  slot1: {
    backgroundColor: "lightblue",
    width: FINAL_INT * 4,
    height: FINAL_INT * 4,
    alignItems: "stretch",
  },
  slot2: {
    backgroundColor: "pink",
    width: FINAL_INT * 4,
    height: FINAL_INT * 4,
    alignItems: "stretch",
  },
  boxContainer: {
    alignItems: "stretch",
    backgroundColor: "powderblue",
    height: FINAL_INT * 8,
  },
  dropZone: {
    alignItems: "stretch",
    backgroundColor: "#00334d",
    height: FINAL_INT * 8,
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});
