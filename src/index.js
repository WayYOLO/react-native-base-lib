import { NativeModules } from 'react-native';

import Input from './component/input';

const { RNBaseLib } = NativeModules;

export { RNBaseLib as NativeBaseLib, Input };
