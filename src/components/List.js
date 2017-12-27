import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fadeIn } from '../utils/Animations'

const List = ({ title, children }) => (
  <div>
		<h3>{title}</h3>
		<div>{children}</div>
	</div>  
)

List.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node
}

export default List