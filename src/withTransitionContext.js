// @flow

import Fader from 'react-fader/lib/withTransitionContext'
import makeReactRouterFader from './makeReactRouterFader'

export default makeReactRouterFader(Fader, {
  animateHeight: false,
})

