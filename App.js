import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import Header from "./Components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};
export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	const [dataloaded, setDataLoaded] = useState(false);

	if (!dataloaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}
	const resetGameHandler = () => {
		setGuessRounds(0);
		setUserNumber(null);
	};
	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
	};

	const gameOverHandler = (numOfRounds) => {
		setGuessRounds(numOfRounds);
	};
	let content = <StartGameScreen onStartGame={startGameHandler} />;
	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOver
				roundsNumber={guessRounds}
				userNumber={userNumber}
				onRestart={resetGameHandler}
			/>
		);
	}
	return (
		<View style={styles.screen}>
			<Header title='Guess a number' />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
