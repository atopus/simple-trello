import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import List from './List'

Enzyme.configure({ adapter: new Adapter() })

const setup = props => {
	const component = shallow(
		<List title={props.title}>
			{props.children}
		</List>
	)

	return {
		component: component,
		children: component.children().at(1),
		h4: component.find('h4')
	}
}

describe('List component', () => {
	it('should render the List', () => {
		const { component } = setup({
			title: 'Test List'
		})
		expect(component.text()).toBe('Test List')
	})

	it('should render children', () => {
		const { children } = setup({
			title: 'Test List',
			children: 'Test Card'
		})
		expect(children.text()).toMatch(/^Test Card$/)
	})
})