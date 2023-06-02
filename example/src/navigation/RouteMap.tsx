import Roles from '../constants/Roles';

import TestScreen from '../screens/test/TestScreen';

// import BuyerScreen from "../screens/downtime/BuyerScreen";
// import BuyerRaiseScreen from "../screens/downtime/BuyerRaiseScreen";
// import BuyerDetailScreen from "../screens/downtime/BuyerDetailScreen";

import enhanceScreen from './enhanceScreen';

export interface Route {
  route: string;
  component?: any;
  initialRouteName?: string;
  routes?: Route[];
}

export interface RouteMapType {
  [roleId: string]: {
    Primary: Route[];
    Secondary?: Route[];
  };
}

const RouteMap: RouteMapType = {
  [Roles.ADMIN.id]: {
    Primary: [
      {
        route: 'Test',
        component: enhanceScreen(TestScreen, { i18nKey: `Screens.Test` }),
      },
      // {
      //   route: "Buyer",
      //   initialRouteName: "BuyerHome",
      //   routes: [
      //     { route: "BuyerHome", component: enhanceScreen(BuyerScreen, { i18nKey: `Screens.BuyerHome` }) },
      //     { route: "BuyerRaise", component: enhanceScreen(BuyerRaiseScreen, { i18nKey: `Screens.BuyerRaise` }) },
      //     { route: "BuyerDetail", component: enhanceScreen(BuyerDetailScreen, { i18nKey: `Screens.BuyerDetail` }) },
      //   ],
      // },
    ],
    Secondary: [
      {
        route: 'Test2',
        component: enhanceScreen(TestScreen, { i18nKey: `Screens.Test` }),
      },
    ],
  },
  [Roles.USER.id]: {
    Primary: [
      {
        route: 'Test',
        component: enhanceScreen(TestScreen, { i18nKey: `Screens.Test` }),
      },
    ],
    Secondary: [
      // { route: "Test2", component: enhanceScreen(TestScreen, { i18nKey: `Screens.Test` }) },
    ],
  },
};

export default RouteMap;
