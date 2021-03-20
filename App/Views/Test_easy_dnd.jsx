import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { createDndContext } from "react-native-easy-dnd";

const { Provider, Droppable, Draggable } = createDndContext();

export default function App() {
  const droppableOpacity = React.useRef(new Animated.Value(0)); 
  const trashIconScale = React.useRef(new Animated.Value(1));
  const [items, setItems] = React.useState([1, 2, 3]);
  const [blue, setBlue] = React.useState([1, 2, 3]);

  const animateValue = (ref, toValue) =>
    Animated.timing(ref.current, {
      toValue,
      duration: 300,
    }).start();

  return (
    <Provider>
      <View style={styles.boxContainer}>
        <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
          {items.length === 0 ? (
            <Button
              title="Reset Draggable Items"
              onPress={() => {
                setItems([1, 2, 3]);
              }}
            />
          ) : null}
          {items.map((item) => (
            <Draggable
              key={item}
              onDragStart={() => {
                console.log("dragging item: ", item);
              }}
              onDragEnd={() => {
                console.log("dropped item: ", item);
              }}
              payload={item}
            >
              {({ viewProps }) => {
                return (
                  <Animated.View
                    {...viewProps}
                    style={[viewProps.style, styles.draggableRed]}
                  >
                    <Text style={{ color: "#333", fontWeight: "bold" }}>
                      Item {item}
                    </Text>
                  </Animated.View>
                );
              }}
            </Draggable>
          ))}
          {blue.map((item) => (
            <Draggable
              key={item}
              onDragStart={() => {
                console.log("dragging item: ", item, blue);
              }}
              onDragEnd={() => {
                console.log("dropped item: ", item);
              }}
              payload={item}
            >
              {({ viewProps }) => {
                return (
                  <Animated.View
                    {...viewProps}
                    style={[viewProps.style, styles.draggableBlue]}
                  >
                    <Text style={{ color: "#333", fontWeight: "bold" }}>
                      Item {item}
                    </Text>
                  </Animated.View>
                );
              }}
            </Draggable>
          ))}
        </View>

        <Droppable
          onEnter={() => {
            animateValue(trashIconScale, 1.2);
          }}
          onLeave={() => {
            animateValue(trashIconScale, 1);
          }}
          onDrop={({ payload }) => {
            if (items) {
              setItems(items.filter((item) => item !== payload));
            }
            else {
            setBlue(blue.filter((item) => item !== payload));
            }
            console.log("payload", payload);
          }}
        >
          {({ active, viewProps }) => {
            return (
              <Animated.View
                {...viewProps}
                style={[styles.slot1, viewProps.style, styles.droppableArea]}
              >
                <Text style={styles.droppableText}>Drag to delete</Text>
                <Animated.View
                  style={[
                    {
                      transform: [
                        {
                          scale: trashIconScale.current,
                        },
                      ],
                    },
                    styles.trashIconWrapper,
                  ]}
                >
                  <Feather name="trash-2" size={24} color="white" />
                </Animated.View>
              </Animated.View>
            );
          }}
        </Droppable>
      </View>
    </Provider>
  );
}

let FINAL_INT = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  droppableArea: {
    width: "100%",
    height: 120,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
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
    padding: 5
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
    height: FINAL_INT * 10,
  },
  dropZone: {
    alignItems: "stretch",
    backgroundColor: "#00334d",
    height: FINAL_INT * 5,
  },
  droppableText: { color: "white", fontWeight: "700" },
  trashIconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  draggableRed: {
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ababab",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "pink",
  },
  draggableBlue: {
    padding: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ababab",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "lightblue",
  }
});
