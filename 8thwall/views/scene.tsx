import {AFrameScene} from '../lib/aframe-components'
import {FloatingSlider} from '../lib/material-ui-components'

declare var React: any




// Renders an AFrame Scene and Material UI, and binds interaction between them.
const Scene = () => {

  // Store the currently selected color as react state.
  const [scale, setScale] = React.useState(1)
   const [rot, setRot] = React.useState(0)




  const handleScaleChange = (event, newValue) => {

    setScale(newValue);
    document.querySelector('#model').setAttribute('scale', `${newValue} ${newValue} ${newValue};`)

  }

   const handleRotChange = (event, newValue) => {
    setRot(newValue);
    document.querySelector('#model').setAttribute('rotation', `0  ${newValue} 0`)
  }


  // Render the aframe scene and Material UI.
  return (
    <React.Fragment>
        <FloatingSlider handleChange={handleScaleChange} value = {scale}  min = {0.5} max = {3} title = "scale"/>

        <FloatingSlider handleChange={handleRotChange} value = {rot}  min = {-180} max = {180} title = "rotation"/>
      
        <AFrameScene sceneHtml={
        require('./aframeScene.html')}
      />
      

    </React.Fragment>
  )
}
export {Scene}