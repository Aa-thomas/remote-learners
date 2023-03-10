const Form = (props) => {
	const { cancel, errors, submit, submitButtonText, elements } = props;

	const handleSubmit = (event) => {
		event.preventDefault();
		submit();
	};

	const handleCancel = (event) => {
		event.preventDefault();
		cancel();
	};

	return (
		<div>
			<ErrorsDisplay errors={errors} />
			<form onSubmit={handleSubmit}>
				{elements()}
				<div className="form--buttons">
					<button className="button" type="submit">
						{submitButtonText}
					</button>
					<button
						className="button button-secondary"
						onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

function ErrorsDisplay({ errors }) {
	let errorsDisplay = null;
	if (errors.length) {
		errorsDisplay = (
			<div>
				<h2 className="validation--errors--label">Validation errors</h2>
				<div className="validation--errors">
					<ul>
						{errors.map((error, i) => (
							<li key={i} className="shake-horizontal">
								{error}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}

	return errorsDisplay;
}

export default Form;
