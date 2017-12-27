import React from 'react'
import { shallow, } from 'enzyme'
import Board from './Board'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

const setup = props => {
  const component = shallow(
    <Board title={props.title}>
        {props.children}
    </Board>
  )

  return {
    component: component,
    children: component.children().at(1),
    h3: component.find('h3')
  }
}

describe('Board component', () => {
  it('should render title and price', () => {
    const { component } = setup({ title: 'Test Board' })
    expect(component.text()).toBe('Test Board')
  })

  it('should render children', () => {
		const { children } = setup({
			title: 'Test Board',
			children: 'Test list'
		})
		expect(children.text()).toMatch(/^Test list$/)
  })

})
