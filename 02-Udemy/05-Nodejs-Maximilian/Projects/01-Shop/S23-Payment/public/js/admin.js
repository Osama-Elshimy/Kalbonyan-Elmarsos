const deleteProduct = async function (btn) {
	const prodId = btn.parentNode.querySelector('[name=productId]').value;
	const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

	const productElement = btn.closest('article');

	try {
		const result = await fetch('/admin/product/' + prodId, {
			method: 'DELETE',
			headers: {
				'csrf-token': csrf,
			},
		});
		console.log(result);

		const data = await result.json();
		console.log(data);

		productElement.parentNode.removeChild(productElement);
	} catch (err) {}
};
