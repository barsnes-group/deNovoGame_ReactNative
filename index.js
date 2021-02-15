import { registerRootComponent } from 'expo';

//import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
//registerRootComponent(App);

import Draggable from './components/Draggable';

registerRootComponent(Draggable);