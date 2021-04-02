import React from 'react';
import {View} from 'react-native';

const DefaultView = ({children}: any) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    }}>
    {children}
  </View>
);

export default DefaultView;
