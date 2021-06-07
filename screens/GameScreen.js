import React, {useState, useRef, useEffect} from "react";
import {
	View,
	StyleSheet,
	Text,
	Button,
	Alert,
	ScrollView,
	FlatList,
} from "react-native";
import NumberContainer from "../Components/NumberContainer";
import Card from "../Components/Card";
import BodyText from "../Components/BodyText";
import MainButton from "../Components/MainButton";
import {Ionicons} from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};
const renderListItem = (listLength, itemData) => (
	<View style={styles.list}>
		<BodyText>#{listLength - itemData.index}</BodyText>
		<BodyText>{itemData.item}</BodyText>
	</View>
);

const GameScreen = (props) => {
	const initGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initGuess);
	const [pastGuesses, setPastGuesses] = useState([initGuess.toString()]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	const {userChoice, onGameOver} = props;

	useEffect(() => {
		if (currentGuess === props.userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);
	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong.", [
				{
					text: "Sorry!",
					style: "cancel",
				},
			]);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);

		setCurrentGuess(nextNumber);
		setPastGuesses((curPastGuesses) => [
			nextNumber.toString(),
			...curPastGuesses,
		]);
	};
	return (
		<View style={styles.screen}>
			<Text> Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={() => nextGuessHandler("lower")}>
					<Ionicons name='md-remove' size={24} color='white' />
				</MainButton>

				<MainButton onPress={() => nextGuessHandler("greater")}>
					<Ionicons name='md-add' size={24} color='white' />
				</MainButton>
			</Card>

			<View style={styles.listItem}>
				<FlatList
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 400,
		maxWidth: "99%",
	},
	list: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	listItem: {
		width: "80%",
		flex: 1,
	},
});

export default GameScreen;
