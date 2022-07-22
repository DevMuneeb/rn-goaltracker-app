import { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [enteredText, setEnteredText] = useState("");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text>Create New Goal</Text>
      </Pressable>
      <Modal visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.inputContainer}>
            <Image
              source={require("./assets/goal.png")}
              style={{
                height: 100,
                width: 100,
              }}
            />
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="add your goal"
              onChangeText={setEnteredText}
            />
            <Pressable
              style={[styles.button, { padding: 15 }]}
              onPress={() => {
                console.log(enteredText, "iam entered text");
                setGoals([
                  ...goals,
                  { id: goals.length + 1, goal: enteredText },
                ]);
                setModalVisible(false);
              }}
            >
              <Text style={{ color: "#000" }}>Add Goal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.goals}>
        <Text style={{ color: "white" }}>Here are your goals</Text>
        <FlatList
          style={{
            paddingVertical: 20,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={goals}
          renderItem={({ item }) => {
            console.log(item, "iam item");
            return (
              <Pressable
                style={styles.goalList}
                onPress={() => {
                  const filteredGoals = [...goals].filter(
                    (goal) => goal.id !== item.id
                  );
                  setGoals(filteredGoals);
                }}
              >
                <Text
                  style={{
                    color: "#000",
                  }}
                >
                  {item.goal}
                </Text>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
  },
  modalView: {
    backgroundColor: "#9C2CF3",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: 240,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 300,
    color: "#000",
    borderRadius: 10,
  },
  goals: {
    flex: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  goalList: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 2,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontSize: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
