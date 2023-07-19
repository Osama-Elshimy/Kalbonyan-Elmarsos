const FormRow = ({ type, name, value, handleChange, labelText, icon = '' }) => {
	return (
		<div className='form__row'>
			<label htmlFor={name}>{labelText || name}</label>

			<input type={type} value={value} name={name} onChange={handleChange} />
		</div>
	);
};

export default FormRow;
