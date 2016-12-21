import React, {Component, PropTypes} from 'react'

export const PageTitle = ({
    title
}) => (
    <div className="header" style={{padding: 0}}>
        <h3 className="title" style={{margin: '0 0 30px 0', fontWeight: 500}}>{title}</h3>
    </div>
)