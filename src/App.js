import React, { Component } from 'react';
import Navigation from './components/Navigation.js';
import Logo from './components/Logo.js';
import ImageLinkForm from './components/ImageLinkForm.js';
import './App.css';
import Particles from "react-tsparticles";



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