import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLists } from '../actions'
import List from '../components/List'
import CardItem from '../components/CardItem'

const ListContainer = ({ title, cards, createList }) => (
	<List title={title}>
		{cards.map(card =>
			<CardItem 
				key={card.id}
				title={card.title}
			/>
		)}
	</List>
)

ListContainer.propTypes = {
	title: PropTypes.string.isRequired,
	cards : PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired
	}))
}

const mapStateToProps = state => ({
	lists: getLists(state.lists)
})