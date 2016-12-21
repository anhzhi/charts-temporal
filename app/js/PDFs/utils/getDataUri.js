
export const getDataUriFromSVG = (svg, options = {setWidth: false}, arrHeight, maxHeight, pos) => {
		const cv = document.createElement('canvas')
		const ctx = cv.getContext('2d')
		// ctx.clearRect(0, 0, cv.width, cv.height)

		if (typeof svg === 'string') {
			canvg(cv, svg) // eslint-disable-line no-undef
		} else {
			const pixelRatio = window.devicePixelRatio || 1

			cv.style.width = cv.width + 'px';
			cv.style.height = cv.height + 'px';
			cv.width *= pixelRatio;
			cv.height *= pixelRatio;
			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

			options.setWidth && svg.setAttribute('width', svg.getBBox().width)
			if(svg.getBBox().height > maxHeight) {
				const height = arrHeight > maxHeight ? maxHeight : arrHeight
				svg.setAttribute('height', height)
				svg.setAttribute('viewBox', `${svg.getAttribute('viewBox').split(" ")[0]} ${pos * maxHeight} ${svg.getAttribute('viewBox').split(" ")[2]} ${height}`)
			}
			const svgString  = (new XMLSerializer).serializeToString(svg)
			canvg(cv, svgString) // eslint-disable-line no-undef
		}

		return cv.toDataURL('image/png')
}

export const getDataUriFromIMG = (img) => new Promise( (resolve) => { // eslint-disable-line no-undef
	if (typeof img === 'string') {
		const image = new Image()
		let canvas = document.createElement('canvas')
		let ctx = canvas.getContext('2d')
		image.crossOrigin = ''
		image.src = img
		image.onload = () => {
			canvas.width = image.naturalWidth
			canvas.height = image.naturalHeight
			ctx.drawImage(image, 0, 0)
			// console.log(canvas.toDataURL('image/png'))
			resolve(canvas.toDataURL('image/png'))
		}
	}
})
