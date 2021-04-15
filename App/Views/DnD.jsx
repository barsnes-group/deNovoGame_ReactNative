import React, { useRef, useState, useEffect } from "react";
import { render } from "react-dom";
import { Text, View, PanResponder, Animated, StyleSheet } from "react-native";
import { EventRegister } from "react-native-event-listeners";

//TODO: når boks mottar pos, så må slot oppdatere seg som opptatt + visualisere hvis boks er på rett slot

/**
 * Component of movable boxes
 * @param {*} props
 * @returns
 */
function MovableBox(props) {
  const myRef = useRef(null);
  const type = props.type;
  const pan = useRef(new Animated.ValueXY()).current;
  const [visible, setVisible] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: (e, gesture) => {
        myRef.current.measureInWindow((x, y) => {
          var dict = {
            type: type,
            x: x,
            y: y,
          };
          console.log(dict);
          var slot_number = isDropArea(type, x, y);
          if (slot_number) {
            EventRegister.emit("dropBox", dict);
            setVisible(false);
            Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start(
              ({ finished }) => {
                setVisible(true);
              }
            );
          } else {
            Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
          }
        });
      },
    })
  ).current;
  if (!visible) {
    return (
      <View>
        <Animated.View>
          <View style={styles.invisibleBox} />
        </Animated.View>
      </View>
    );
  }
  return (
    <View>
      <Animated.View
        ref={myRef}
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <View style={type == "red" ? styles.redBox : styles.blueBox} />
      </Animated.View>
    </View>
  );
}

/**
 * Component of different types of slots
 * Number represent the type of slot
 */
function Slot(props) {
  const number = props.number;
  const slot_type = props.type;
  //TODO:
  const [isOccupied, setIsOccupied] = useState(false);
  useEffect(() => {
    EventRegister.addEventListener("dropBox", (data) => {
      //unpacke dictionary
      var x = data.x;
      var y = data.y;
      var box_type = data.type;

      var slot_x = 120 * number;
      var slot_x_max = slot_x + 120;
      var slot_y = 120;

      if (x >= slot_x && x <= slot_x_max && slot_type == box_type) {
        console.log("in slot", number, x, slot_x, slot_x_max);
        //only one box per slot
        if (!isOccupied) {
          setIsOccupied(true);
        }
      }
    });
  });

  if (isOccupied) {
    return (
      <View style={styles.slot_occ}>
        <View style={slot_type == "red" ? styles.redBox : styles.blueBox} />
      </View>
    );
  } else {
    return <View style={number == "0" ? styles.slot0 : styles.slot1} />;
  }
}

/**
 * @returns slot number if box on drop area, else returns null
 */
function isDropArea(box_type, x, y) {
  //TODO: sjekk hvilken slot nr du er på
  var on_slot_number = Math.floor(x / 120);
  var slot_x = on_slot_number * 120;
  var slot_x_max = slot_x + 120;

  //TODO: sjekke om farge er riktig
  if (on_slot_number >= all_slots.length) {
    console.log("all_slots", all_slots);
    return null;
  }
  var slot_type = all_slots[on_slot_number][1];

  if (x >= slot_x && x <= slot_x_max) {
    if (slot_type == box_type) {
      console.log(slot_type, "in slot", on_slot_number, x, slot_x, slot_x_max);
      return on_slot_number; //TODO: map or boolean array -> 0,1 occupied or not
    } else {
      console.log(on_slot_number, slot_type, box_type, "wrong color");
    }
  } else {
    console.log("not in slot coor", on_slot_number, x, slot_x, slot_x_max);
  }
  return null;
}

//the different types of slots
const all_slots = [
  [0, "blue"],
  [1, "red"],
];
function App() {
  //list of slot elements
  const slotsEl = all_slots.map((slot) => (
    <Slot number={slot[0]} type={slot[1]} />
  ));

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropZone}>
        <Text style={styles.text}>Dropzone</Text>
        <View
          style={{ flex: 1, flexDirection: "row", alignContent: "stretch" }}
        >
          {slotsEl}
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
  invisibleBox: {
    backgroundColor: "transparent",
    width: FINAL_INT * 3,
    height: FINAL_INT * 3,
    borderWidth: 1,
    opacity: 0,
  },
  slot0: {
    backgroundColor: "lightblue",
    width: FINAL_INT * 4,
    height: FINAL_INT * 4,
    alignItems: "stretch",
  },
  slot1: {
    backgroundColor: "pink",
    width: FINAL_INT * 4,
    height: FINAL_INT * 4,
    alignItems: "stretch",
  },
  slot_occ: {
    backgroundColor: "green",
    width: FINAL_INT * 4,
    height: FINAL_INT * 4,
    alignItems: "center",
    justifyContent: "center",
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
