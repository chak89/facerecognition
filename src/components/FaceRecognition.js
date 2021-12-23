import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl, bBox }) => {
	//console.log('FaceRecognition')

	return (
		<div className='center'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imgUrl} width='600px' height='auto' />
				{bBox.length ? bBox.map((item, index) => (
						<div className='bounding-box' key={index} style={{ top: item.top, left: item.left, width: item.width, height: item.height }}></div>
				))
				:
				null
			}
			{bBox.length ? 
				<div>Faces detected: {bBox.length}</div>
				:
				null
			}
			</div>
		</div>
	)
}

export default FaceRecognition;

// Image examples
// https://samples.clarifai.com/face-det.jpg
// https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-2.png