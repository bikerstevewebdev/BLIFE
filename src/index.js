import React from 'react';
import ReactDOM from 'react-dom';
import {
     green500,
     green700,
     grey400,
     blue800,
     grey100,
     grey500,
     darkBlack,
     white,
     green50,
     lightGreenA200,
     fullBlack
     } from 'material-ui/styles/colors'
// import '../semantic/dist/semantic.min.css'
import {fade} from 'material-ui/utils/colorManipulator'
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './ducks/store'
import { HashRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import muiThemeable from 'material-ui/styles/muiThemeable'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import { StripeProvider } from 'react-stripe-elements'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: green500,
        primary2Color: green700,
        primary3Color: grey400,
        accent1Color: blue800,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: green50,
        borderColor: lightGreenA200,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: green500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack
    },
    appBar: {
      height: 50,
    },
  })

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <MuiThemeProvider muiTheme={muiTheme}>
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>,
 document.getElementById('root'));
// registerServiceWorker();
