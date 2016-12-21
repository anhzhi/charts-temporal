import React, { Component, PropTypes} from 'react'
import Icon from './IconSVG'
import IconButton from 'material-ui/IconButton'
import PaperPanel from './PaperPanel'

class TitleBF extends Component {
    constructor(props) {
        super(props)

        this.state = {showPanel: false}
    }

    showHidePanel(showHide) {
        this.setState({
            showPanel: showHide
        })
    }

    render() {
        const {title, labelQuestionStyle, info, questionIcon, style} = this.props
        if(!title) return <span/>
        return (
            <div>
                <div className="flex" style={style}>
                    {
                        questionIcon && (<div style={{marginRight: '10px'}}>
                            <span className="question-icon" style={{margin: '10px 0'}}>&nbsp;</span>
                        </div>)
                    }
                    <div className="flex align-items-center">
                        <h4 className="bold" style={{
                    	margin: '10px 0',
                    	...labelQuestionStyle
                  }}>
                            {title}
                        </h4>
                    </div>
                    {
                        info && (<div className="flex align-items-center">
                            <IconButton touch={true} onTouchTap={() => this.showHidePanel(!this.state.showPanel)}>
                                <Icon type="information" size={20}/>
                            </IconButton>
                        </div>)
                    }
                </div>

                {
                    info && this.state.showPanel && (<PaperPanel onRemovePanel={() => this.showHidePanel(false)} >
                        <div><p>{info}</p></div>
                    </PaperPanel>)
                }
            </div>
        )}
}

export default TitleBF