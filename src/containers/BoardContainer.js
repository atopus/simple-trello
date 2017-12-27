import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateBoardContainer from './CreateBoardContainer'
import ShowAllBoards from './ShowAllBoards'
import { fadeIn } from '~utils/Animations'

import Board from '../components/Board'
import ListItem from '../components/ListItem'
import createList from '../actions'

const BoardContainer = ({ title, lists }) => {
  <Board title={title}>
    {lists.map(list =>
      <ListItem
        key={list.id}
        list={list}
      />
    )}
  </Board>
)

BoardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  createList: PropTypes.fun.isRequired
}

const mapStateToProps = state => ({
  title: state.title,
  lists: getLists(state.lists)
})

export default connect(
  mapStateToProps,
  { createList }
)(BoardContainer)