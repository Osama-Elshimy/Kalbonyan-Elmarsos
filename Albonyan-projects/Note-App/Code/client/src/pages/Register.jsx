import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppContext } from '../context/appContext';
import { Logo, FormRow, Alert, LanguageButton } from '../components';

const initialState = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
	phone: '',
	birthYear: '',
	isMember: true,
};

const Register = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [values, setValues] = useState(initialState);
	const [formStep, stetFormStep] = useState(1);

	const {
		user,
		isLoaing,
		showAlert,
		displayAlert,
		setupUser,
		passwordMismatch,
	} = useAppContext();

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const toggleMember = () => {
		stetFormStep(1);
		setValues({ ...values, isMember: !values.isMember });
	};

	const formStepHandler = () => {
		if (!values.isMember && formStep === 1) {
			stetFormStep(2);
			return;
		}
	};

	const onSubmit = e => {
		e.preventDefault();

		const {
			username,
			email,
			password,
			confirmPassword,
			phone,
			birthYear,
			isMember,
		} = values;

		if (formStep === 1) {
			if (!email || !password || (!isMember && !confirmPassword)) {
				displayAlert();
				return;
			}
		}

		if (!isMember && password !== confirmPassword) {
			passwordMismatch();
			return;
		}

		formStepHandler();

		if (formStep === 2) {
			if (!username || !phone || !birthYear) {
				displayAlert();
				return;
			}
		}

		let currentUser;

		if (isMember) {
			currentUser = {
				email,
				password,
			};

			setupUser({
				currentUser,
				endPoint: 'login',
				alertText: 'Login Successful! Redirecting...',
			});
		} else {
			currentUser = {
				email,
				password,
				confirmPassword,
				username,
				phone,
				birthYear,
			};

			setupUser({
				currentUser,
				endPoint: 'register',
				alertText: 'User Created! Redirecting...',
			});
		}
	};

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 1500);
		}
	}, [user, navigate]);

	if (isLoaing) return <h1>Loading...</h1>;

	return (
		<section className='register'>
			<div className='register__logo'>
				<Logo width='7rem' height='7rem' />
				<h1>{t('title')}</h1>
				<LanguageButton classes='btn-lang' />
			</div>

			<div className='register__form'>
				<form className='form' onSubmit={onSubmit}>
					<h2>
						{values.isMember
							? t('login')
							: formStep === 1
							? t('signup')
							: t('complete-signup')}
					</h2>

					{showAlert && <Alert />}

					{formStep === 1 && (
						<FormRow
							labelText={t('email')}
							type='email'
							name='email'
							value={values.email}
							handleChange={handleChange}
						/>
					)}

					{formStep === 1 && (
						<FormRow
							labelText={t('password')}
							type='password'
							name='password'
							value={values.password}
							handleChange={handleChange}
						/>
					)}

					{formStep === 1 && !values.isMember && (
						<FormRow
							labelText={t('confirm-password')}
							type='password'
							name='confirmPassword'
							value={values.confirmPassword}
							handleChange={handleChange}
						/>
					)}

					{formStep === 2 && !values.isMember && (
						<FormRow
							labelText={t('username')}
							type='text'
							name='username'
							value={values.username}
							handleChange={handleChange}
						/>
					)}

					{formStep === 2 && !values.isMember && (
						<FormRow
							labelText={t('phone')}
							type='text'
							name='phone'
							value={values.phone}
							handleChange={handleChange}
						/>
					)}

					{formStep === 2 && !values.isMember && (
						<FormRow
							labelText={t('birth-year')}
							type='text'
							name='birthYear'
							value={values.birthYear}
							handleChange={handleChange}
							max={new Date().getFullYear()}
							min={1900}
						/>
					)}

					{values.isMember && (
						<button className='btn btn-block form__btn' type='submit'>
							{t('login')}
						</button>
					)}

					{!values.isMember && (
						<button className='btn btn-block form__btn' type='submit'>
							{t('complete-signup')}
							<svg
								width='17'
								height='17'
								viewBox='0 0 17 17'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M1.93848 8.5H15.9385'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M8.93848 1.5L15.9385 8.5L8.93848 15.5'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					)}

					{formStep === 2 && (
						<button
							className='btn btn-block form__btn'
							type='button'
							onClick={() => stetFormStep(1)}>
							{t('back')}
							<svg
								width='17'
								height='17'
								viewBox='0 0 17 17'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M15.9385 8.5L1.93848 8.5'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M8.93848 15.5L1.93848 8.5L8.93848 1.5'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					)}
				</form>
				<p>{!values.isMember ? t('member') : t('new-member')}</p>
				<button className='btn btn-switch' onClick={toggleMember}>
					{values.isMember ? t('signup') : t('login')}
				</button>
			</div>
		</section>
	);
};

export default Register;
