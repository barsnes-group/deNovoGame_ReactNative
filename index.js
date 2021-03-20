import { registerRootComponent } from 'expo';

//import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
//registerRootComponent(App);

//Use dnd from react native page  
import App from './App/Views/DnD.jsx';

//Use dnd from easy_dnd package
//import App from './Views/Test_easy_dnd.jsx';

registerRootComponent(App);