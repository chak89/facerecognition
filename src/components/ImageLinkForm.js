import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () => {
	return (
		<div className='ma4 mt0'>
			<p className='f3'>
				{'Detect faces in picture'}		
			</p>
			<div className='fl w-40'> &nbsp;</div>
			<div className='form centering fl w-20 pa4 br3 shadow-5'>
				<input className='' type='text' />
				<button className='pointer'>Detect</button>
			</div>
			<div className='fl w-40'>&nbsp; </div>
		</div>
	);
}


export default ImageLinkForm;