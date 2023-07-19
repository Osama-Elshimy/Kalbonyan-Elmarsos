import { useTranslation } from 'react-i18next';

const LanguageButton = ({ classes }) => {
	const { i18n, t } = useTranslation();

	const toggleLanguage = () => {
		const html = document.documentElement;
		i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
		html.lang = i18n.language;
		html.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
		localStorage.setItem('language', i18n.language);
	};

	return (
		<button className={classes} onClick={toggleLanguage}>
			{t('language')}
		</button>
	);
};
export default LanguageButton;
