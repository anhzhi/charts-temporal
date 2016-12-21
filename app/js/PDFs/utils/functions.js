
export const getVerboseDate = (date) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
}

export const getGraphSvg = (id) => {
  return (
    document.getElementById(id).children[0].children[0]
  )
}
