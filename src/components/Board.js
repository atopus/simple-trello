import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fadeIn } from '../utils/Animations'

const Title = styled.h3`
	color: white;
	text-shadow: 0px 0px 3px #000;
`

const Wrapper = styled.div`
	display: flex;
	padding: 60px 35px;
	flex-wrap: wrap;
	animation: ${fadeIn} 300ms linear;
`

const TopWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	border-bottom: solid 1px rgb(240,240,240);
`

const CloseBoardIcon = styled.img`
	width: 24px;
	height: 24px;
	padding: 5px;
	transition: all 200ms ease-in-out;

	&:hover {
		transition: all 200ms ease-in-out;
		transform: scale(1.25) rotate(4.5deg);
	}
`

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px;
`

const BoardNamingTitle = styled.h5`
	color: white;
	text-shadow: 0px 0px 3px #000;
	font-weight: 400;
`

const Board = ({ title, children }) => (
	<div>
		<h3>{title}</h3>
		<div>{children}</div>
	</div>
)

Board.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node
}

export default Board