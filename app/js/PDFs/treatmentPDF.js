import {
	styles,
	defaultStyle,
	pageMargins,
  header,
	getDataUriFromSVG,
	getDataUriFromIMG,
  saveAs,
  b64toBlob,
	getGraphSvg
} from './utils'

const pushToArr = ({arr, graphId, arrHeight, maxHeight, pos}) => {
	if( arrHeight > maxHeight ) {
		arr.push({
			svg: getGraphSvg(graphId),
			maxHeight: maxHeight,
			arrHeight: arrHeight,
			pos
		})
		pushToArr({arr, graphId, arrHeight: arrHeight - maxHeight, maxHeight, pos: pos + 1})
	} else {
		arr.push({
			svg: getGraphSvg(graphId),
			maxHeight: maxHeight,
			arrHeight: arrHeight,
			pos
		})
	}
}

export default ({dashboard, service}) => {
	const maxHeight = 900
	let activationDateGraphArr = []
	let activationCodesByServiceGraphArr = []
	pushToArr({
		arr: activationDateGraphArr,
		graphId: 'activationDateGraph',
		arrHeight: getGraphSvg('activationDateGraph').getBBox().height,
		maxHeight,
		pos: 0
	})

	pushToArr({
		arr: activationCodesByServiceGraphArr,
		graphId: 'activationCodesByServiceGraph',
		arrHeight: getGraphSvg('activationCodesByServiceGraph').getBBox().height,
		maxHeight,
		pos: 0
	})

	return Promise.all([ // eslint-disable-line
		getDataUriFromIMG('/imgs/PDFs/PDF.Logo.Transparency.png'),
		...activationDateGraphArr.map(m => getDataUriFromSVG(m.svg, undefined, m.arrHeight, m.maxHeight, m.pos)),
		...activationCodesByServiceGraphArr.map(m => getDataUriFromSVG(m.svg, undefined, m.arrHeight, m.maxHeight, m.pos)),
		getDataUriFromSVG(getGraphSvg('versionGraphPie')),
		getDataUriFromSVG(getGraphSvg('mainProblemGraphPie')),
		getDataUriFromSVG(getGraphSvg('ageGraph')),
		getDataUriFromSVG(getGraphSvg('genderGraphPie')),
		getDataUriFromSVG(getGraphSvg('ethnicityGraphPie')),
		getDataUriFromSVG(getGraphSvg('RetentionGraphPie')),
		getDataUriFromSVG(getGraphSvg('goalGraphPie')),
		getDataUriFromSVG(getGraphSvg('EBIGraphPie')),
		getDataUriFromSVG(getGraphSvg('successGraph')),
		getDataUriFromSVG(getGraphSvg('abstinenceGraph')),
		getDataUriFromSVG(getGraphSvg('offWorkGraph')),
	]).then((dataImgs) => new Promise(resolve => {
		// Count the length of array
		const activationDateGraphLength = activationDateGraphArr.length
		const activationCodesByServiceLength = activationCodesByServiceGraphArr.length

		let activationCardsMonthSplitted = {}
		let activationCodesByServiceSplitted = {}

		let activationCardsMonthImages = []
		let activationCodesByServiceImages = []

		activationDateGraphArr.forEach((m, i) => {
			activationCardsMonthSplitted[`activationCardsMonth${i + 1}`] = dataImgs[i + 1]
			activationCardsMonthImages.push({
				image: `activationCardsMonth${i + 1}`,
				width: 400,
				margin: [0, 20, 0, 0],
				alignment: 'center'
			})
			activationCardsMonthImages.push(...header(dashboard, {}))
		})

		activationCodesByServiceGraphArr.forEach((m, i) => {
			activationCodesByServiceSplitted[`activationCodesByService${i + 1}`] = dataImgs[activationDateGraphLength + i + 1]
			activationCodesByServiceImages.push({
				image: `activationCodesByService${i + 1}`,
				width: 400,
				margin: [0, 20, 0, 0],
				alignment: 'center'
			})
			activationCodesByServiceImages.push(...header(dashboard, {}))
		})

		const offset = activationDateGraphLength + activationCodesByServiceLength

		const images = {
			logo: dataImgs[0],
			...activationCardsMonthSplitted,
			...activationCodesByServiceSplitted,
			treatmentPathways: dataImgs[offset + 1],
			focusTreatment: dataImgs[offset + 2],
			age: dataImgs[offset + 3],
			gender: dataImgs[offset + 4],
			ethnicity: dataImgs[offset + 5],
			retention: dataImgs[offset + 6],
			completion: dataImgs[offset + 7],
			EBI: dataImgs[offset + 8],
			reductionsInSubstanceUse: dataImgs[offset + 9],
			abstinence: dataImgs[offset + 10],
			access: dataImgs[offset + 11]
		}


		const content = [
			...header(dashboard, {firstPage: true}),
			{
				text: 'Activation of access cards by month',
				style: 'contentTitle',
				margin: [0, 30, 0, 0]
			},
			...activationCardsMonthImages,
			{
				text: 'Activation of access cards by service',
				style: 'contentTitle',
				margin: [0, 20, 0, 0]
			},
			...activationCodesByServiceImages,
			{
				text: 'Treatment pathways',
				style: 'contentTitle',
				margin: [0, 30, 0, 0]
			},
			{
				text: 'Breaking Free treatment pathways',
				style: 'contentSubTitle',
				margin: [0, 20, 0, 0]
			},
			{
				image: 'treatmentPathways',
				width: 400,
				margin: [0, 0, 0, 0],
				alignment: 'center'
			},
			...header(dashboard, {}),
			{
				text: 'Focus of treatment',
				style: 'contentTitle',
				margin: [0, 30, 0, 0]
			},
			{
				text: 'Main problem substance',
				style: 'contentSubTitle',
				margin: [0, 20, 0, 0]
			},
			{
				image: 'focusTreatment',
				width: 400,
				margin: [0, 0, 0, 0],
				alignment: 'center'
			},
			...header(dashboard, {}),
			{
				text: 'Demographic profile',
				style: 'contentTitle',
				margin: [0, 30, 0, 0]
			},
			{
				text: 'Age',
				style: 'contentSubTitle',
				margin: [0, 20, 0, 0]
			},
			{
				image: 'age',
				width: 400,
				margin: [0, 0, 0, 0],
				alignment: 'center'
			},
			{
				text: 'Gender',
				style: 'contentTitle',
				margin: [0, 0, 0, 0]
			},
			{
				image: 'gender',
				width: 400,
				margin: [0, 0, 0, 0],
				alignment: 'center'
			},
			...header(dashboard, {}),
			{
				text: 'Ethnicity',
				style: 'contentTitle',
				margin: [0, 50, 0, 0]
			},
			{
				image: 'ethnicity',
				width: 400,
				margin: [0, 0, 0, 0],
				alignment: 'center'
			},
			...header(dashboard, {}),
			{
				text: 'Treatment retention',
				style: 'contentTitle',
				margin: [0, 30, 0, 0]
			},
			{
				text: 'Actively engaged in treatment',
				style: 'contentSubTitle',
				margin: [0, 20, 0, 0]
			},
			{
				image: 'retention',
				width: 400,
				margin: [0, 20, 0, 0],
				alignment: 'center'
			},
			...header(dashboard, {}),
			{
				text: 'Treatment completion',
				style: 'contentTitle',
				margin: [0, 30, 0, 0]
			},
			{
				text: 'Status of treatment',
				style: 'contentSubTitle',
				margin: [0, 20, 0, 0]
			},
			{
				image: 'completion',
				margin: [0, 20, 0, 0],
				width: 400,
				alignment: 'center'
			},
			...header(dashboard, {}),
			{
				text: 'Treatment impact',
				style: 'contentTitle',
				margin: [0, 30, 0, 0]
			},
			{
				text: 'Completion of Extended Brief Intervention for alcohol',
				style: 'contentSubTitle',
				margin: [0, 20, 0, 0]
			},
			{
				image: 'EBI',
				width: 400,
				margin: [0, 0, 0, 0],
				alignment: 'center'
			},
			{
				text: 'Measurable reductions in substance use',
				style: 'contentSubTitle',
				margin: [0, 20, 0, 0]
			},
			{
				image: 'reductionsInSubstanceUse',
				width: 400,
				margin: [0, 0, 0, 0],
				alignment: 'center'
			},
			...header(dashboard, {}),
			{
				text: 'Mantained abstinence',
				style: 'contentSubTitle',
				margin: [0, 20, 0, 0]
			},
			{
				image: 'abstinence',
				width: 400,
				margin: [0, 0, 0, 0],
				alignment: 'center'
			},
			...header(dashboard, {}),
			{
				text: 'Treatment access',
				style: 'contentTitle',
				margin: [0, 30, 0, 0]
			},
			{
				text: 'Treatment accessed outside service operating hours',
				style: 'contentSubTitle',
				margin: [0, 20, 0, 0]
			},
			{
				image: 'access',
				width: 400,
				margin: [0, 0, 0, 0],
				alignment: 'center'
			}

		]

		const doc = {
			content,
			defaultStyle,
			styles,
			pageMargins,
			images
		}

		console.log("TODO: GENERATE PDF")
		// Meteor.call('generatePDF', doc, (err, pdf) => {
		// 	if(err) {
		// 		console.log(err)
		// 		return reject()
		// 	}
		// 	if (pdf !== undefined) {
		// 		// Meteor.call('saveResource', pdf, 'usage', {dashboard, service}, (err, res) => {
		// 		// 	resolve(res)
		// 		// })
		// 		console.log('back generatePDF')
		//
		// 		saveAs(b64toBlob(pdf, 'application/pdf'), 'Breaking Free Reach Report.pdf')
		// 		resolve({
		// 			success: true
		// 		})
		// 	}
		// 	resolve()
		// })
	}))
}
