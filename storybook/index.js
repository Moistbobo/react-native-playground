// if you use expo remove this line
import {AppRegistry} from 'react-native';

import {getStorybookUI, configure, addDecorator} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-knobs';
import {loadStories} from './storyLoader';

import './rn-addons';
import {name as appName} from '../app.json';

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  // require('./stories');
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
// const StorybookUIRoot = getStorybookUI({});

const StorybookUIRoot = getStorybookUI({port: 7007, host: 'localhost'});
// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;
