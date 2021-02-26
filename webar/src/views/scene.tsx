import {AFrameScene} from '../lib/aframe-components'
// import {FloatingBackButton} from '../lib/material-ui-components'
// import {COLORS} from '../lib/colors'
declare let React: any
declare let ReactRouterDOM: any
const {withRouter} = ReactRouterDOM

const Scene =() => (
  <React.Fragment>
    
    <AFrameScene sceneHtml={  // Use an HTML template, swapping its color for the color of this page.
      require('./cube.html')}
    />
  </React.Fragment>
)
export {Scene}
