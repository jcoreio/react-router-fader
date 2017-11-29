// @flow

import * as React from 'react'

export type Route = {
  path?: string,
}

export type RouteProps = {
  children?: React.Element<any>,
  route: Route,
  routes: Array<Route>,
}

function getKey({route, routes}: RouteProps): ?string {
  let routeFound = false
  for (let otherRoute of routes) {
    if (otherRoute === route) routeFound = true
    else if (routeFound && otherRoute.path) return otherRoute.path
  }
  return undefined
}

export default function makeReactRouterFader<FaderProps: Object>(
  Fader: React.ComponentType<FaderProps>,
  extraProps?: $Shape<FaderProps> = {}
): React.ComponentType<RouteProps> {
  const ReactRouterFader = ({children, route, routes}: RouteProps) => (
    <Fader {...extraProps}>
      {children && React.cloneElement(children, {key: getKey({route, routes})})}
    </Fader>
  )
  return ReactRouterFader
}

