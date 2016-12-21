import React from 'react';
import Container from '../components/core/Container'
import RaisedButton from 'material-ui/RaisedButton'
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import { Link } from 'react-router';
import * as Colors from 'material-ui/styles/colors'

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Home = () => <Container>
    <p>Welcome to the image recognition neural network!!</p>
    <p>Click here to login</p>
    <Link className={cx('item')} to="/login">
        <RaisedButton
            className={``}
            label="Login"
            labelStyle={{color: Colors.blue700, textTransform: "none"}}
            onTouchTap={() => console.log("TODO: WINDOW SCROLL TO TOP")} >
        </RaisedButton>
    </Link>
</Container>

export default Home;
