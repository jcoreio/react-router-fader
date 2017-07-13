# react-router-fader

[![Build Status](https://travis-ci.org/jcoreio/react-router-fader.svg?branch=master)](https://travis-ci.org/jcoreio/react-router-fader)
[![Coverage Status](https://coveralls.io/repos/github/jcoreio/react-router-fader/badge.svg?branch=master)](https://coveralls.io/github/jcoreio/react-router-fader?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Wraps [`react-fader`](https://github.com/jcoreio/react-fader) for use with
[`react-router`](https://github.com/ReactTraining/react-router) version 2 or 3

Just use it as the `component` of a parent route, and voila, you automatically get fade transitions between its child
routes!

## Usage

```sh
npm install --save react-fader react-router-fader
```

```js
import Fader from 'react-router-fader' // or react-router-fader/lib/withTransitionContext

// example route components
import Home from './Home'
import Users from './Users'
import UserGroups from './UserGroups'
import Policies from './Policies'

// use Fader as the component of your parent routes, like so:

export const rootRoute = {
  component: Fader,
  childRoutes: [
    {
      path: '/admin',
      component: Fader,
      childRoutes: [
        {path: '/users', component: Users},
        {path: '/userGroups', component: UserGroups},
        {path: '/policies', component: Policies},
      ],
    },
    {path: '/', component: Home},
  ],
}
```

## withTransitionContext

```sh
npm install --save react-fader react-router-fader react-transition-context
```
```js
import Fader from 'react-router-fader/lib/withTransitionContext'
```

This works exactly like `Fader` except that it renders its children within a `TransitionContext` component from
`react-transition-context` with the given `transitionState`.  This is useful for doing things like focusing an `<input>`
element after the children have transitioned in.

## API

#### `makeReactRouterFader(Fader: ReactClass<FaderProps>, extraProps?: $Shape<FaderProps>): ReactClass<RouteProps>`

```js
import makeReactRouterFader from 'react-router-fader/lib/makeReactRouterFader'
```

This is a HOC that is used by `import 'react-router-fader'` and `import `react-router-fader/lib/withTransitionContext`.
Those modules use `{animateHeight: false}` for `extraProps`.  You can use this function to pass different props to the
wrapped `Fader` component.

