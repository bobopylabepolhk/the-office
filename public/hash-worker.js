onmessage = (event) => {
	const accessCodeBuffer = new TextEncoder('utf-8').encode(event.data);
	crypto.subtle.digest('SHA-256', accessCodeBuffer)
		.then(buffer => {
			postMessage(new TextDecoder().decode(buffer))
		})
}