import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className='ma4 mt0'>
			<p className='f3'>
				{'Detect faces in picture'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='w-80 center' type='text' placeholder='Enter image URL' onChange={onInputChange} />
					<button
						className='w-20 grow link pointer bg-light-purple'
						onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>

		</div>
	);
}


export default ImageLinkForm;