
import {MaterialUIApp} from './lib/material-ui-components'
import {appBase} from './lib/routes'
import {AFrameScene} from './lib/aframe-components'
import {Scene} from './views/scene'
declare let React: any
declare let ReactDOM: any
declare let ReactRouterDOM: any

const {BrowserRouter, Route, Switch} = ReactRouterDOM

const base = appBase()



class App extends React.Component {
  componentDidMount() {
    const model = document.getElementsByTagName('#model')
    console.log('model: ', model)
  }


  render() {
    return  <Scene/>
  }
}


const render = () => {
  document.body.insertAdjacentHTML('beforeend', '<div id="root"></div>')
  ReactDOM.render(
    <MaterialUIApp>
      <App />
    </MaterialUIApp>,
    document.getElementById('root')
  )
}

export {render}