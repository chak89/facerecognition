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
			input: "",
			imgUrl: "",
			boundingBox: {}
		}
	}

	calcFaceLocation = (data) => {
		// faceRectangle attributes
		// height = How high the face is (pixels)
		// width = How wide the face is (pixels)
		// top = The distance of the face from the top of the image (Y axis)
		// left = The distance of the face from the left of the image (X axis)
		const azureFaceBox = data;
		console.log('azureFaceBox:', azureFaceBox)
		let arrayOfRectangles = []

		const image = document.getElementById('inputimage');
		const realWidth = Number(image.naturalWidth);
		const realHeight = Number(image.naturalHeight);
		const height = Number(image.height)
		const width = Number(image.width)

		//Percentage difference
		let widthDiff = (width - realWidth) / realWidth * 100
		let heightDiff =(height - realHeight) / realHeight*100
		let sizeDiff = (100 + widthDiff) / 100
		
		azureFaceBox.forEach(e => {
			const rectangle = {
				top: e.faceRectangle.top*sizeDiff,
				left: e.faceRectangle.left*sizeDiff,
				width: e.faceRectangle.width*sizeDiff,
				height: e.faceRectangle.height*sizeDiff
			}
			arrayOfRectangles.push(rectangle)
		});

		this.setState({ boundingBox: arrayOfRectangles })
	}

	onInputChange = (event) => {
		console.log(event.target.value);
		this.setState({ input: event.target.value })
	}

	onSubmit = () => {
		//Reset face rectangles
		this.setState({ boundingBox: {} })
		this.setState({ imgUrl: this.state.input })

		const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': config.REACT_APP_API_KEY } });
		const client = new Face.FaceClient(credentials, config.REACT_APP_API_ENDPOINT);

		//ES6 IIFE with fat arrow functions
		const detectFaceExtract = (async () => {
			console.log("========DETECT FACES========");
			console.log();

			try {
				let detected_faces = await client.face.detectWithUrl(
					this.state.input,
					{
						returnFaceAttributes: ["Accessories", "Age", "Blur", "Emotion", "Exposure", "FacialHair", "Gender", "Glasses", "Hair", "HeadPose", "Makeup", "Noise", "Occlusion", "Smile"],
						// We specify detection model 1 because we are retrieving attributes.
						detectionModel: "detection_01"
					});
				console.log(detected_faces.length + " face(s) detected from image " + this.state.input + ".");
				console.log("Face attributes for face(s) in " + this.state.input + ":");
				this.calcFaceLocation(detected_faces)
			} catch (error) {
				console.log('error:', error)
			}
		})();
	}

	render() {
		return (
			<div className="App">
				<Particles id="tsparticles"
					options={particlesOptions} />
				<TopBar />
				<Logo />
				<ImageLinkForm
					onInputChange={this.onInputChange}
					onButtonSubmit={this.onSubmit}
				/>
				<FaceRecognition
					imgUrl={this.state.imgUrl}
					bBox={this.state.boundingBox}
				/>
			</div>
		);
	}
}

export default App;