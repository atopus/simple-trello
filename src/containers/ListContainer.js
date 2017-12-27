import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ListContainer = ({ lists, createList }) => (
)

ListContainer.prototype = {
}

const mapStateToProps = state => ({
	lists: getLists(state.lists)
})