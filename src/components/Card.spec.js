import React from 'react'
import { shallow } from 'enzyme'
import Card from './Card'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

const setup = props => {
	const component = shallow(
		<Card title={props.title} />		
	)
	
	return {
		component: component,
		h4: component.find('h4')
	}
}

describe('Card Component', () => {
	it('should render a card', () => {
		const { component } = setup({
			title: 'Test Card'
		})
		expect(component.text()).toBe('Test Card')
	})
})