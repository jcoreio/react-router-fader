import React from 'react'
import ReactRouterFader from '../src'
import Fader from 'react-fader'
import {mount} from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'
import {Router, createMemoryHistory} from 'react-router'

describe('Fader', () => {
  let clock
  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })
  afterEach(() => {
    clock.restore()
  })

  it('single transition works', () => {
    const Foo = () => <h3>Foo</h3>
    const Bar = () => <h3>Bar</h3>
    const Baz = () => <h3>Baz</h3>

    const routes = {
      component: ReactRouterFader,
      childRoutes: [
        {path: '/foo', component: Foo},
        {path: '/bar', component: Bar},
        {component: 'div', childRoutes: [
          {path: '/baz', component: Baz},
        ]}
      ]
    }

    const history = createMemoryHistory('/foo')

    const comp = mount(
      <Router history={history} routes={routes} />
    )

    expect(comp.text()).to.equal('Foo')
    expect(comp.find(Fader).prop('children').type).to.equal(Foo)
    expect(comp.find(Fader).prop('children').key).to.equal('/foo')

    history.push('/bar')

    expect(comp.text()).to.equal('Foo')
    expect(comp.find(Fader).prop('children').type).to.equal(Bar)
    expect(comp.find(Fader).prop('children').key).to.equal('/bar')
    clock.tick(1000)
    expect(comp.text()).to.equal('Bar')
    expect(comp.find(Fader).prop('children').type).to.equal(Bar)
    expect(comp.find(Fader).prop('children').key).to.equal('/bar')

    history.push('/baz')

    expect(comp.text()).to.equal('Bar')
    expect(comp.find(Fader).prop('children').type).to.equal('div')
    expect(comp.find(Fader).prop('children').key).to.equal('/baz')
    clock.tick(1000)
    expect(comp.text()).to.equal('Baz')
    expect(comp.find(Fader).prop('children').type).to.equal('div')
    expect(comp.find(Fader).prop('children').key).to.equal('/baz')

    comp.unmount()
  })
})
