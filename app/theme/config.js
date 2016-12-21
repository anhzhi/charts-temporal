import * as Colors from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
    spacing: Spacing,
    zIndex: zIndex,
    fontFamily: '"Gotham Rounded SSm A", "Gotham Rounded SSm B", "sans-serif"',
    palette: {
      primary1Color: Colors.lightGreen500,
      primary2Color: Colors.cyan700,
      primary3Color: Colors.lightBlack,
      accent1Color: Colors.pinkA200,
      accent2Color: Colors.grey100,
      accent3Color: Colors.grey500,
      textColor: Colors.grey900,
      alternateTextColor: Colors.white,
      canvasColor: Colors.white,
      borderColor: Colors.grey300,
      disabledColor: fade(Colors.darkBlack, 0.3),
      pickerHeaderColor: Colors.cyan500
    }
};
