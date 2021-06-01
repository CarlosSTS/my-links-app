import React from 'react'
import { View, Text } from 'react-native'

import StatusBarPage from '../../components/StatusBarPage'

export default function MyLinks() {
  return (
    <View>
      <Text>MyLinks</Text>
      <StatusBarPage 
        barStyle='light-content'
        backgroundColor="#132742"
      />
    </View>
  )
}
