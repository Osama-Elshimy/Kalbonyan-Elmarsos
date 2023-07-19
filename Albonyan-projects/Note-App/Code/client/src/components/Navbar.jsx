import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/appContext';

import LanguageButton from './LanguageButton';
import Logo from './Logo';
import BrightModeLogo from '/assets/images/bright-mode.svg';
import DarkModeLogo from '/assets/images/dark-mode.svg';
import UserLogo from '/assets/images/user.svg';

const Navbar = () => {
	const { t } = useTranslation();

	const { openModal, closeModal, isModalOpen, isDarkMode, toggleDarkMode } =
		useAppContext();

	const handleOpenModal = () => {
		if (isModalOpen) {
			closeModal();
			return;
		} else {
			openModal();
			return;
		}
	};

	return (
		<nav className='nav'>
			<div className='nav__logo'>
				<Logo />
				<p>{t('title')}</p>
			</div>

			<div className='nav__buttons'>
				<LanguageButton />

				<button className='nav__dark-mode-button' onClick={toggleDarkMode}>
					<img
						src={isDarkMode ? BrightModeLogo : DarkModeLogo}
						alt='dark-mode'
					/>
				</button>
				<button className='nav__user-button' onClick={handleOpenModal}>
					<svg
						width='28'
						height='26'
						viewBox='0 0 28 26'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M27.5821 25.6668V22.0913C27.5821 20.1948 26.8556 18.3759 25.5624 17.0349C24.2693 15.6938 22.5154 14.9404 20.6866 14.9404H6.89552C5.06672 14.9404 3.31281 15.6938 2.01965 17.0349C0.72649 18.3759 0 20.1948 0 22.0913V25.6668'
							fill='#D375B9'
						/>
						<path
							d='M13.791 12.2587C17.1761 12.2587 19.9203 9.5145 19.9203 6.12935C19.9203 2.7442 17.1761 0 13.791 0C10.4058 0 7.66162 2.7442 7.66162 6.12935C7.66162 9.5145 10.4058 12.2587 13.791 12.2587Z'
							fill='#D375B9'
						/>
					</svg>
				</button>
			</div>
		</nav>
	);
};
export default Navbar;
