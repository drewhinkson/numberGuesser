import React, {useState} from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
} from "react-native";
import Card from "../Components/Card";
import Colors from "../constants/colors";
import Input from "../Components/Input";
import NumberContainer from "../Components/NumberContainer";
import BodyText from "../Components/BodyText";
import MainButton from "../Components/MainButton";
const StartGame = (props) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};
	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};
	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (Number.isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert("Invalid Number!", "Number has to be a number between 1-99", [
				{text: "Okay", style: "destructive", onPress: resetInputHandler},
			]);
			return;
		}
		setConfirmed(true);
		setEnteredValue("");
		setSelectedNumber(chosenNumber);
		Keyboard.dismiss();
	};

	let confirmedOutput;
	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.confirmation}>
				<BodyText> You selected: </BodyText>
				<NumberContainer> {selectedNumber}</NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>
					START GAME
				</MainButton>
			</Card>
		);
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<Text style={styles.title}>Start a New Game!</Text>
				<Card style={styles.inputContainer}>
					<BodyText> Select a number </BodyText>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize='none'
						autoCorrect={false}
						keyboardType='number-pad'
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button1}>
							<Button
								title='Confirm'
								onPress={confirmInputHandler}
								color={Colors.primary}
							/>
						</View>
						<View style={styles.button1}>
							<Button
								title='Reset'
								onPress={resetInputHandler}
								color={Colors.accent}
							/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	button1: {
		width: Dimensions.get("window").width / 4,
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "open-sans-bold",
	},
	inputContainer: {
		width: "80%",
		minWidth: 300,
		maxWidth: "95%",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 25,
	},
	input: {
		width: 50,
		textAlign: "center",
	},
	confirmation: {
		marginTop: 20,
		alignItems: "center",
		width: "75%",
	},
});
export default StartGame;
