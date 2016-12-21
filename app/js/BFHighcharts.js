// Highcharts.setOptions({
// 	chart: {
// 		style: {
// 			fontFamily: 'Gotham Rounded SSm B',
// 			fontStyle: "normal"
// 		}
// 	}
// });

const colorPalette = ['#A66959', '#B8877A', '#CAA59B', '#A67E59',
	'#9FA659', '#C5CA9B', '#768259', '#598275', '#719D8F', '#8FB2A7', '#597182',
	'#596182', '#71799D', '#8F96B2', '#665982', '#7A5982', '#95719D', '#AB8FB2', '#825969'
]

export const highchartsBar = ({name, graphId, data, isAdmin, chartHeight,
	colors = colorPalette,
	showPercentage = false,
	totalValues = 1}) => {
	new Highcharts.Chart({
		colors: colors,
		chart: {
			renderTo: graphId,
			type: 'bar',
			options3d: {
				enabled: true,
				alpha: 5,
				beta: 5,
				depth: 75,
				viewDistance: 0
			},
			height: chartHeight
		},
		title: {
			text: ''
		},
		xAxis: {
			allowDecimals: false,
			type: 'category'
		},
		yAxis: {
			allowDecimals: false,
			title: {
				text: ''
			},
			labels: {
				formatter: function() {
					const val = showPercentage ? parseInt(100 * this.value / totalValues, 10) : this.value
					return val.toFixed(1) + (showPercentage ? '%' : "");
				}
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true
				}
			},
			column: {
				depth: 25
			}
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		series: [{
			name: name,
			colorByPoint: true,
			data: data,
			dataLabels: {
				enabled: true,
				formatter: function() {
					const val = showPercentage ? (100 * this.y / totalValues).toFixed(1) : this.y
					return val + (showPercentage ? '%' : "");
				}
			}
		}]
	})
}

export const highchartsLine = ({name, graphId, data, admin, colors = colorPalette}) => {
	// console.log(data)
	new Highcharts.Chart({
		colors: colors,
		chart: {
			renderTo: graphId,
			type: 'line'
		},
		title: {
			text: ''
		},
		xAxis: {
			allowDecimals: false,
			type: "category"
		},
		yAxis: {
			allowDecimals: false,
			title: {
				text: ''
			}
		},
		tooltip: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				}
			}
		},
		series: [{
			name: name,
			data,
			connectNulls: true
		}]
	})
}

export const highchartsPie = ({name, graphId, data, isAdmin, binary, startAngle = 315,
colors = colorPalette}) => {
	(function(H) {
		let doSetData = true
		H.wrap(H.seriesTypes.pie.prototype, "drawDataLabels", function(p) {
			const x_offset = 4
			const y_offset = 12

			p.call(this)
			H.each(this.points, function(p) {
				if (p) {
					// console.log(p.dataLabel._pos)
					p.connector.attr({
						d: [
							"M",
							p.dataLabel._pos.x + (p.labelPos[6] === "left" ? -x_offset : x_offset),
							p.dataLabel._pos.y + y_offset,
							"L",
							p.labelPos[4],
							p.labelPos[5]
						]
					})
				}
			})
			if (doSetData) {
				doSetData = false
				setTimeout(() => {
					if (this.chart && this.chart.containerWidth < 700) {
						this.chart.series[0].update({
							dataLabels: {
								distance: 2
							}
						})
					}
				}, 0)
			}
		})
	})(Highcharts)
	new Highcharts.Chart({
		colors: colors,
		chart: {
			renderTo: graphId,
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 35,
				beta: 0
			}
		},
		title: {
			text: ''
		},
		legend: {
			itemStyle: {
				width: 90 // or whatever
			}
		},
		credits: {
			enabled: false
		},
		tooltip: {
			enabled: false,
			// pointFormat: graphId === "mainProblemOnlyDrugsGraphPie" ? '{point.percentage:.2f}%' : '{point.percentage:.1f}%'
		},
		yAxis: {
			allowDecimals: false,
			title: {
				text: ''
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				depth: window.innerWidth > 800 ? 55 : window.innerWidth > 600 ? 50 : window.innerWidth > 400 ? 40 : 20,
				innerSize: window.innerWidth > 800 ? 180 : window.innerWidth > 600 ? 120 : window.innerWidth > 400 ? 90 : 50,
				size: window.innerWidth > 800 ? 350 : window.innerWidth > 600 ? 300 : window.innerWidth > 400 ? 180 : 100,
				dataLabels: {
					style: {
						width: window.innerWidth > 800 ? 100 : window.innerWidth > 600 ? 85 : window.innerWidth > 400 ? 75 : 60
					},
					enabled: true,
					format: !isAdmin ? '{point.name}: {point.percentage:.1f}%' : '{point.name}: {point.percentage:.1f}% ({point.y})'
				},
				startAngle: startAngle
			}
		},
		series: [{
			name: name,
			data: data
		}]
	})
}

export const highchartsVerticalBar = ({name, graphId, data, isAdmin,
	min=0, max=undefined, units=undefined,
	multipleColors= false,
	colors = colorPalette.slice(6),
	showPercentage = false,
	totalValues = 1
}) => {
	new Highcharts.Chart({
		colors: colors,
		chart: {
			renderTo: graphId,
			type: 'column',
			options3d: {
				enabled: true,
				alpha: 5,
				beta: 5,
				depth: 75,
				viewDistance: 0
			}
		},
		tooltip: {
			enabled: false
		},
		title: {
			text: ''
		},
		xAxis: {
			allowDecimals: false,
			type: 'category',
			labels: {
				rotation: -45
			}
		},
		yAxis: {
			min: min,
			max: max,
			allowDecimals: false,
			title: {
				text: ''
			},
			plotLines: [{
				color: '#333', // Color value
				// dashStyle: 'longdashdot', // Style of the plot line. Default to solid
				value: 0, // Value of where the line will appear
				width: 2 // Width of the line
			}],
			labels: {
				formatter: function() {
					const val = showPercentage ? parseInt(100 * this.value / totalValues, 10) : this.value
					return val.toFixed(1) + (showPercentage ? '%' : "");
				}
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					formatter: function() {
						const val = showPercentage ? (100 * this.y / totalValues) : this.y
						return val.toFixed(1) + (showPercentage ? '%' : "");
					}
				}
			},
			column: multipleColors ? {} : {
				depth: 25,
				zones: [{
					value: 0, // Values up to 0 (not including) ...
					color: 'red'
				},{
					value: 25, // Values up to 0 (not including) ...
					color: '#C5CA9B'
				},{
					value: 50, // Values up to 0 (not including) ...
					color: '#9FA659'
				},{
					value: 75, // Values up to 0 (not including) ...
					color: '#768259'
				}, {
					color: '#598275'
				}]
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			name: name,
			colorByPoint: true,
			data: data
		}]
	})
}

