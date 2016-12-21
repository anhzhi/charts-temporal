import React from 'react';
import Container from '../components/core/Container'

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Dashboard = () => <Container>Welcome to the Dasboard. Stay tuned...</Container>;

export default Dashboard;
