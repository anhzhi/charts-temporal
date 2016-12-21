import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import * as Colors from 'material-ui/styles/colors'

const cx = classNames.bind(styles);

const style = {
    title: {
        textAlign: 'center',
        background: 'radial-gradient(rgba(255,255,255, 0.95), rgba(255,255,255,0.7)) 5%',
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: '100'
    }
}
const Navigation = ({ user, logOut }) => {
    const title = "DASHBOARDS"
    return (
    <Toolbar style={style.title}>
        <ToolbarGroup firstChild style={{width: 150 }}>
            { user.authenticated ? (
            <Link onClick={logOut} className={cx('item')} to="/"
                  style={{cursor: "pointer", padding: 20}}>
                LOG OUT
            </Link>
            ) : (
                <Link className={cx('item')} to="/login">Log in</Link>
            )}
        </ToolbarGroup>
        <div className="flex" style={{margin: 'auto'}}>
            {title}
        </div>
        <ToolbarGroup lastChild style={{width: 150}}>
        </ToolbarGroup>
    </Toolbar>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
