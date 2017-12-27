import * as actions from '../constants/ActionTypes'
import reducer, * as cards from './cards'

describe('reducers', () => {
  describe('cards', () => {
    let state

		describe('when a card is added', () => {

			const cardTitle = 'New card to be added'

			beforeEach(() => {
				state = reducer(state, {
					type: actions.CREATE_CARD,
					id : 1,
					listId: 1,
					title: cardTitle
				})
			})
			
			it('the byId state contains the card', () => {
				expect(cards.getCards(state)).toEqual({
						'1' : {
							id: 1,
							listId: 1,
							title: cardTitle
					}
				})
			})

			it('the allIds state contains the id', () => {
				expect(cards.getCardsIds(state)).toContain(1)
			})
		})
	})
})