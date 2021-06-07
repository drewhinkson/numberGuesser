import React from "react";
import {View, Text, StyleSheet, Button, Image} from "react-native";
import Colors from "../constants/colors";
import BodyText from "../Components/BodyText";
import TitleText from "../Components/TitleText";
import MainButton from "../Components/MainButton";
const GameOver = (props) => {
	return (
		<View style={styles.screen}>
			<TitleText> The game is over </TitleText>
			<View style={styles.imageContainer}>
				<Image
					source={require("../assets/success.png")}
					style={styles.image}
					resizeMode='cover'
				/>
			</View>
			<BodyText>
				Your phone needed
				<Text style={styles.highlight}> {props.roundsNumber} </Text> rounds to
				guess the number
				<Text style={styles.highlight}> {props.userNumber} </Text>
			</BodyText>

			<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: 30,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	highlight: {
		color: Colors.accent,
		fontFamily: "open-sans-bold",
		fontSize: 20,
		marginVertical: 15,
		margin: 30,
	},
});

export default GameOver;
