import React, {Component, PropTypes} from 'react'
import classNames from 'classnames/bind';
import { PageTitle } from './Elements'
import styles from 'css/common/layout';
import logoTransparent from 'images/logoTransparent.png'

const cx = classNames.bind(styles);

class Container extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            title,
            containerStyle,
            innerBodyStyle,
            children,
            removeWrapper,
            bodyStyle,
            superTitle
        } = this.props
        
        let SuperTitle
        if(superTitle) {
            SuperTitle = (
                <div className="flex" style={{color: "#FFF", paddingTop: 30, fontSize: 24}}>
                    <div style={{flex: 1}}>
                        <img src={logoTransparent} alt="BF Logo"/>
                    </div>
                    <div style={{flex: 4}} className="text-center">
                        {superTitle}
                    </div>
                    <div style={{flex: 1}}></div>
                </div>
            )
        }

        return (
            <div>
                <div style={containerStyle}>
                    <div className="mint current" style={{opacity: 1, transition: "opacity 5000ms linear"}}></div>
                    <div className={cx(`wrapper`)} style={{maxWidth: removeWrapper ? "100%" : 800}}>
                        <div className="body" style={{
						padding: title !== undefined ? '0px 40px 20px 40px' : '20px 40px',
						...bodyStyle
					}}>
                            { SuperTitle }
                            { title !== undefined ?
                                <PageTitle title={title}/>
                                : null
                            }
                            <div className="inner-body" id="inner-body" style={{
							backgroundColor: 'transparent',
							padding: 0,
							...innerBodyStyle
						}}>
                                { children }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Container.defaultProps = {
    title: undefined,
    containerStyle: {},
    innerBodyStyle: {},
    bodyStyle: {},
    removeWrapper: false,
    innerBodyTransparent: false
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    containerStyle: PropTypes.object,
    innerBodyStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    innerBodyTransparent: PropTypes.bool,
    removeWrapper: PropTypes.bool
}

export default Container
