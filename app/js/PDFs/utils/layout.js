import {getVerboseDate} from './functions.js'

export const pageMargins = [40, 30, 40, 60]

export const header = (title, {firstPage = false}) => {
	let render = []

	if (!firstPage) {
		const breakPage = {
			text: 'break',
			color: 'white',
			fontSize: 1,
			pageBreak: 'after'
		}

		render.push(breakPage)
	}
	const renderHeader = [
		{
			text: title,
			style: ['title', 'bold', 'bfColorTitle']
		},
		{
			text: getVerboseDate(new Date()),
			style: ['title', 'myActionPlan', 'grey']
		}
	]

	return render.concat(renderHeader)
}
