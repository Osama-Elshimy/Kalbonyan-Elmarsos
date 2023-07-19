import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const Modal = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { closeModal, isModalOpen, user, logoutUser } = useAppContext();

	return (
		isModalOpen && (
			<div className='nav__modal' onClick={e => e.stopPropagation()}>
				<h3>{t('welcome') + ' ' + user.username + '!'}</h3>
				<button
					className='btn btn-block nav__mode-info-btn'
					onClick={() => {
						navigate('/modifyuser');
						closeModal();
					}}>
					{t('modify-user')}
				</button>
				<button
					className='btn btn-block nav__mode-info-btn'
					onClick={() => {
						navigate('/');
						closeModal();
					}}>
					{t('home-page')}
				</button>
				<button className='btn btn-block' type='submit' onClick={logoutUser}>
					{t('logout')}
				</button>
			</div>
		)
	);
};

export default Modal;
