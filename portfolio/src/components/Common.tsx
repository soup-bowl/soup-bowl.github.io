export const ErrorMessage = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<p style={{ fontSize: '4rem', lineHeight: 0 }}>:(</p>
			<p>An error occurred getting the info, sorry about that</p>
		</div>
	);
}

export const LoadingMessage = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<p>Loading...</p>
		</div>
	);
}
