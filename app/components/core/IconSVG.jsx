import React, {PropTypes} from 'react'
import SvgIcon from 'material-ui/SvgIcon'

const INFORMATION = 'information'

const renderSvg = (type) => {
    switch (type) {
        case INFORMATION:
            return (
                <g>
                    <circle fill={'#FFFFFF'} cx="77" cy="77" r="77"/>
                    <linearGradient id="SVGID_31_" gradientUnits="userSpaceOnUse" x1="51.524" y1="526.3663" x2="105.0836"
                                    y2="379.2128" gradientTransform="matrix(1 0 0 -1 0 531.1)">
                        <stop offset="0" stopColor={'#F09917'} stopOpacity={0.7}/>
                        <stop offset="1" stopColor={'#F09917'}/>
                    </linearGradient>
                    <path fill={'url(#SVGID_31_)'} d="M23,22.9c-30.6,30.6-30.6,80.1,0,110.7s80.1,30.6,110.7,0s30.6-80.1,0-110.7C103.5-7.6,53.6-7.6,23,22.9z
		 M81.5,32.9c6.7,0,12,5.3,12,12s-5.3,12-12,12s-12-5.3-12-12.3C69.5,38.2,74.8,32.9,81.5,32.9z M98.9,113.7c-0.3,1-1,2-1.6,2.7
		c-4.3,4.3-9.6,7-15.9,7c-3,0-5.6,0-8.6-0.3c-4.6-0.6-11-6.7-10-12.9c0.6-4.3,1.3-8.6,2-12.9c1.3-7.3,2.7-15,4-22.6c0-0.3,0-1,0-1.3
		c0-3-1-4.3-4-4.6c-1.3,0-2.7-0.3-4-0.6s-2.4-1.6-2-3c0-1.3,1-2,2.7-2.4c0.6,0,1.6,0,2.7,0c3.7,0,7.3,0,11,0c4,0,7.6,0,11.6,0
		c2.7,0,4.3,1.3,4.3,4c0,2.4-0.3,4.6-0.6,7c-1.3,8.6-3,16.9-4.6,25.6c-0.3,2.7-1,5.6-1.3,8.3c0,1.3,0,2.7,0.3,4
		c0.3,1.6,1.6,2.7,3.7,2.7c1.3,0,3-0.6,4.3-1.3c1-0.3,2-1.3,3.3-1.6C97.8,110.8,99.2,112.1,98.9,113.7z"/>
                </g>
            )
        default:
            return null
    }
}

const Icon = ({
    type,
    size = 24,
    style = {},
    viewBox = "0 0 156 156",
    position = 'absolute',
    ...rest
}) => {
    const styles = {
        ...style,
        fill: style.color,
        display: 'block',
        verticalAlign: 'middle',
        width: size,
        height: size,
        top: rest.top ? rest.top : size === 24 ? 0 : size === 28 ? '-2px' : 0,
        position: rest.position ? rest.position : position,
        right: rest.right ? rest.right : 0,
        left: rest.left ? rest.left : 0,
        marginLeft: rest.marginLeft ? rest.marginLeft : 'auto',
        marginRight: rest.marginRight ? rest.marginRight : 'auto',
        marginBottom: rest.marginBottom ? rest.marginBottom : 'auto',
        marginTop: rest.marginTop ? rest.marginTop : 'auto',
        bottom: rest.bottom ? rest.bottom : 0
    }
    return (

        <SvgIcon {...rest} style={styles} viewBox={viewBox}>
            {renderSvg(type)}
        </SvgIcon>

    )
}

Icon.PropTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    style: PropTypes.object,
    viewBox: PropTypes.string
}

export default Icon