import React, { PropTypes, Component } from 'react';
import Navigation from 'containers/Navigation';
import Message from 'containers/Message';
import classNames from 'classnames/bind';
import styles from 'css/main';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import BFOTheme from '../theme/config'

const cx = classNames.bind(styles);
/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
class Layout extends React.Component {
    getChildContext() {
        return {
            muiTheme: getMuiTheme(BFOTheme)
        };
    }
    render() {
        return (
            <div className="gradient-colors-bg">
                <Navigation />
                <Message />
                {this.props.children}
            </div>
        );
    };
}

Layout.childContextTypes = {
    muiTheme: React.PropTypes.object
}

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;
