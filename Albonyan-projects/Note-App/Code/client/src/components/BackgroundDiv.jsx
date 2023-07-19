import backgroundImage from '/assets/images/background.jpg';
import './BackgroundDiv.css';

const BackgroundDiv = ({ children }) => {
	return (
		<div className='background-wrapper'>
			<img
				src={backgroundImage}
				alt='Background'
				className='background-image'
			/>
			{children}
		</div>
	);
};
export default BackgroundDiv;
