// @flow

import React from 'react'

import type {RouteProps} from './makeReactRouterFader'

function getKey({route, routes}: RouteProps): ?string {
  let routeFound = false
  for (let otherRoute of routes) {
    if (otherRoute === route) routeFound = true
    else if (routeFound && otherRoute.path) return otherRoute.path
  }
  return undefined
}

export default function makeReactRouterFader<FaderProps: Object>(
  Fader: ReactClass<FaderProps>,
  extraProps?: $Shape<FaderProps> = {}
): ReactClass<RouteProps> {
  const ReactRouterFader = ({children, route, routes}: RouteProps) => (
    <Fader {...extraProps}>
      {children && React.cloneElement(children, {key: getKey({route, routes})})}
    </Fader>
  )
  return ReactRouterFader
}

