import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux'

class Header extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    render() {
        return (
            <h1 style={{color: this.props.themeColor}}>react 小书</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

Header = connect(mapStateToProps)(Header)

export default Header