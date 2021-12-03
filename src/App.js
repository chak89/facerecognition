import React, { Component } from 'react';
import TopBar from './components/TopBar.js';
import Logo from './components/Logo.js';
import ImageLinkForm from './components/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition.js';
import './App.css';
import Particles from "react-tsparticles";

const config = require('./utils/config')

//Azure Face API
const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");
const { "v4": uuidv4 } = require('uuid');



//Code for generating particles.
const particlesOptions = {
	interactivity: {
		events: {
			onClick: {
				enable: true,
				mode: "push",
			},
			onHover: {
				enable: true,
				mode: "repulse",
			},
			resize: true,
		},
		modes: {
			bubble: {
				distance: 400,
				duration: 2,
				opacity: 0.8,
				size: 40,
			},
			push: {
				quantity: 4,
			},
			repulse: {
				distance: 200,
				duration: 0.4,
			},
		},
	},
	particles: {
		color: {
			value: "#ffffff",
		},
		links: {
			color: "#ffffff",
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 1,
		},
		collisions: {
			enable: true,
		},
		move: {
			direction: "none",
			enable: true,
			outMode: "bounce",
			random: false,
			speed: 1,
			straight: false,
		},
		number: {
			density: {
				enable: true,
				value_area: 1500,
			},
			value: 60,
		},
		opacity: {
			value: 0.5,
		},
		shape: {
			type: "circle",
		},
		size: {
			random: true,
			value: 5,
		},
	},
	detectRetina: true,
}

class App extends Component {

	constructor() {
		super();
		this.state = {
			input: ""
		}
	}

	onInputChange = (event) => {
		console.log(event.target.value);
	}

	onSubmit = () => {
		console.log('click')

		async function DetectFaceExtract() {
			console.log("========DETECT FACES========");
			console.log();

			const image_base_url = "https://mymodernmet.com/wp/wp-content/uploads/2019/09/"
			// Create a list of images
			const image_file_names = [
				"100k-ai-faces-2.png"    // single female with glasses
				// "detection2.jpg", // (optional: single man)
			];

			// NOTE await does not work properly in for, forEach, and while loops. Use Array.map and Promise.all instead.
			await Promise.all(image_file_names.map(async function (image_file_name) {
				let detected_faces = await client.face.detectWithUrl(image_base_url + image_file_name,
					{
						returnFaceAttributes: ["Accessories", "Age", "Blur", "Emotion", "Exposure", "FacialHair", "Gender", "Glasses", "Hair", "HeadPose", "Makeup", "Noise", "Occlusion", "Smile"],
						// We specify detection model 1 because we are retrieving attributes.
						detectionModel: "detection_01"
					});
				console.log(detected_faces.length + " face(s) detected from image " + image_file_name + ".");
				console.log("Face attributes for face(s) in " + image_file_name + ":");

				// Parse and print all attributes of each detected face.
				detected_faces.forEach(async function (face) {
					// Get the bounding box of the face
					console.log("Bounding box:\n  Left: " + face.faceRectangle.left + "\n  Top: " + face.faceRectangle.top + "\n  Width: " + face.faceRectangle.width + "\n  Height: " + face.faceRectangle.height);

					// Get the accessories of the face
					let accessories = face.faceAttributes.accessories.join();
					if (0 === accessories.length) {
						console.log("No accessories detected.");
					}
					else {
						console.log("Accessories: " + accessories);
					}

					// Get face other attributes
					console.log("Age: " + face.faceAttributes.age);
					console.log("Blur: " + face.faceAttributes.blur.blurLevel);

					// Get emotion on the face
					let emotions = "";
					let emotion_threshold = 0.0;
					if (face.faceAttributes.emotion.anger > emotion_threshold) { emotions += "anger, "; }
					if (face.faceAttributes.emotion.contempt > emotion_threshold) { emotions += "contempt, "; }
					if (face.faceAttributes.emotion.disgust > emotion_threshold) { emotions += "disgust, "; }
					if (face.faceAttributes.emotion.fear > emotion_threshold) { emotions += "fear, "; }
					if (face.faceAttributes.emotion.happiness > emotion_threshold) { emotions += "happiness, "; }
					if (face.faceAttributes.emotion.neutral > emotion_threshold) { emotions += "neutral, "; }
					if (face.faceAttributes.emotion.sadness > emotion_threshold) { emotions += "sadness, "; }
					if (face.faceAttributes.emotion.surprise > emotion_threshold) { emotions += "surprise, "; }
					if (emotions.length > 0) {
						console.log("Emotions: " + emotions.slice(0, -2));
					}
					else {
						console.log("No emotions detected.");
					}

					// Get more face attributes
					console.log("Exposure: " + face.faceAttributes.exposure.exposureLevel);
					if (face.faceAttributes.facialHair.moustache + face.faceAttributes.facialHair.beard + face.faceAttributes.facialHair.sideburns > 0) {
						console.log("FacialHair: Yes");
					}
					else {
						console.log("FacialHair: No");
					}
					console.log("Gender: " + face.faceAttributes.gender);
					console.log("Glasses: " + face.faceAttributes.glasses);

					// Get hair color
					var color = "";
					if (face.faceAttributes.hair.hairColor.length === 0) {
						if (face.faceAttributes.hair.invisible) { color = "Invisible"; } else { color = "Bald"; }
					}
					else {
						color = "Unknown";
						var highest_confidence = 0.0;
						face.faceAttributes.hair.hairColor.forEach(function (hair_color) {
							if (hair_color.confidence > highest_confidence) {
								highest_confidence = hair_color.confidence;
								color = hair_color.color;
							}
						});
					}
			}));
		}
	}

	render() {
		return (
			<div className="App">
				<Particles id="tsparticles"
					options={particlesOptions} />
				<Navigation />
				<Logo />
				<ImageLinkForm
					onInputChange={this.onInputChange}
					onButtonSubmit={this.onSubmit}
				/>
				{/*<FaceRecognition />*/}
			</div>
		);
	}
}


export default App;