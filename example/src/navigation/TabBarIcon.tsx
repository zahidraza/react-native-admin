import * as React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import type { RouteProp, ParamListBase } from '@react-navigation/native';

type IconNameType =
  | 'person'
  | 'person-outline'
  | 'alarm'
  | 'alarm-outline'
  | 'shield-checkmark'
  | 'shield-checkmark-outline'
  | 'stats-chart'
  | 'stats-chart-outline'
  | 'people'
  | 'people-outline'
  | 'analytics'
  | 'analytics-outline'
  | 'home'
  | 'home-outline';

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<ParamListBase>;
}

const TabBarIcon = ({ focused, color, size, route }: TabBarIconProps) => {
  let iconName: IconNameType = 'person';
  if (route.name === 'AccountTab') {
    iconName = focused ? 'person' : 'person-outline';
  } else if (route.name === 'Downtime') {
    iconName = focused ? 'alarm' : 'alarm-outline';
  } else if (route.name === 'QualitySummary') {
    iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
  } else if (route.name === 'ProductionSummary') {
    iconName = focused ? 'stats-chart' : 'stats-chart-outline';
  } else if (route.name === 'Operator') {
    iconName = focused ? 'people' : 'people-outline';
  } else if (route.name === 'Prediction') {
    iconName = focused ? 'analytics' : 'analytics-outline';
  } else {
    iconName = focused ? 'home' : 'home-outline';
  }
  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabBarIcon;
