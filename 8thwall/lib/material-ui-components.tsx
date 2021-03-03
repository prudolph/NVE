// nts built on top of MUI (MaterialUI).
declare let MaterialUI: any
declare let React: any
declare let ReactRouterDOM: any
const {
  AppBar,
  Button,
  CssBaseline,
  Fab,
  IconButton,
  SvgIcon,
  ThemeProvider,
  colors,
  createMuiTheme,
  makeStyles,
  Typography,
  Slider,
} = MaterialUI
const {withRouter, Link} = ReactRouterDOM

const fabStyles = makeStyles(theme => ({
  scale: {
    display: 'flex',
    width: 150,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(4),
    zIndex: 2,
  },
  rotation: {
    display: 'flex',
    width: 150,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
    zIndex: 2,
  },
}))

const FloatingSlider = ({handleChange, value, min, max, title}) => {
  const classes = fabStyles()
  return (
    <Fab className={title === 'scale' ? classes.scale : classes.rotation} color={title}
      >

      <Typography id={title}>
        {title}
      </Typography>

      <Slider value={value} onChange={handleChange} min={min}
        max={max} aria-labelledby={title} />
    </Fab>

  )
}
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    scale: {
      main: '#464766',
    },
    rotation: {
      main: '#AD50FF',
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  props: {
    // Ripple causes flaky button press issues on iOS 13; disable it.
    // https://github.com/google/material-design-lite/issues/5281
    MuiButtonBase: {
      disableRipple: true,
    },
  },
})

const MaterialUIApp = props => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {props.children}
  </ThemeProvider>
)
export {FloatingSlider, MaterialUIApp}