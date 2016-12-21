import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'

const ContentBox = ({
    children,
    zDepth = 2,
    title = undefined,
    questionsMargin = false,
    rootDivStyle = {},
    titleDivStyle = {},
    titleStyle = {},
    childrenDivStyle = {},
}) => {
    return (
        <Paper zDepth={zDepth} className="flex column contentBox" style={{
			margin: '0px 0px 30px 0px',
			color: '#000',
			backgroundColor: '#fff',
			...rootDivStyle
		}}>
            { title !== undefined ?
                <div className="flex justify-center align-items-center contentBoxTitle" style={{
					padding: '25px 30px 0px 30px',
					borderRadius: "2px 2px 0 0",
					...titleDivStyle
				}}>
                    <h4 className="subtitle" style={{
						margin: '5px 0',
						fontSize: 17,
						color: '#212121',
						fontWeight: 700,
						...titleStyle
					}}>
                        {title}
                    </h4>
                </div>

                : null
            }

            <div className="contentBoxBody" style={{
				padding: !questionsMargin ? '9px 30px 14px 30px' : '9px 20px 14px 20px',
				borderRadius: '0 0 2px 2px',
				...childrenDivStyle
			}}>
                {children}
            </div>
        </Paper>
    )
}

ContentBox.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    questionsMargin: PropTypes.bool,
    rootDivStyle: PropTypes.object,
    titleDivStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    childrenDivStyle: PropTypes.object
}

export default ContentBox