import React, {PropTypes} from 'react'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

const PaperPanel = ({
    children,
    onRemovePanel,
    paperStyle = {}
}) => {
    const style = {
        padding: '15px',
        position: 'relative',
        backgroundColor: 'rgba(240, 153, 23, 0.8)',
        color: '#fff'
    }

    return (
        <Paper style={{...style, ...paperStyle}} zDepth={2}>
            <div style={{
  			position: 'absolute',
  			right: '-12px',
  			top: '-12px',
  			cursor: 'pointer'
  		}}>
                <IconButton onClick={() => onRemovePanel()} touch>
                    <NavigationClose color="#fff"/>
                </IconButton>
            </div>
            {children}
        </Paper>
    )
}

PaperPanel.propTypes = {
    children: PropTypes.node.isRequired,
    onRemovePanel: PropTypes.func.isRequired,
    paperStyle: PropTypes.object
}

export default PaperPanel