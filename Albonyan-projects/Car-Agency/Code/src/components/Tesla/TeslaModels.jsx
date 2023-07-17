import classes from './TeslaModels.module.css';

const TeslaModels = () => {
	return (
		<figure className={classes.figure}>
			<img src='/assets/cars/tesla-model-1.png' alt='Tesla model car' />
			<img src='/assets/cars/tesla-model-2.png' alt='Tesla model car' />
			<img src='/assets/cars/tesla-model-3.png' alt='Tesla model car' />
			<img src='/assets/cars/tesla-model-4.png' alt='Tesla model car' />
			<div>
				<h3>Tesla Model 3</h3>
				<p>Disruptive, avant-garde, futuristic, innovative.</p>
				<a href='#contact-us' className={classes.button}>
					Contact
				</a>
			</div>
			<img src='/assets/cars/tesla-model-6.png' alt='Tesla model car' />
			<img src='/assets/cars/tesla-model-7.png' alt='Tesla model car' />
			<img src='/assets/cars/tesla-model-8.png' alt='Tesla model car' />
			<img src='/assets/cars/tesla-model-9.png' alt='Tesla model car' />
		</figure>
	);
};

export default TeslaModels;
