import classes from './Testimonials.module.css';
import TestimonialsSlider from './TestimonialsSlider';

const Testimonials = () => {
	return (
		<section id='testimonials' className={classes.testimonials}>
			<h2 className={classes.testimonials__title}>Testimonials</h2>
			<TestimonialsSlider />
			<img src='/assets/cars/testomonial-car.png' />
		</section>
	);
};

export default Testimonials;
