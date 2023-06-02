/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';

// 3rd-party
import { useColorMode, useTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate, useStoreLocale, useAuthProvider, isEmpty, UserIdentity } from '@jazasoft/react-native-admin';

// screens
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from '../screens/auth/LoginScreen';
import TenantSelectionScreen from '../screens/auth/TenantSelectionScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RoleSelectorScreen from '../screens/auth/RoleSelectorScreen';
import AccountScreen from '../screens/account/AccountScreen';

// local
import createRNTheme from './theme';
import TabBarIcon from './TabBarIcon';
import RouteMap, { Route } from './RouteMap';
import enhanceScreen from './enhanceScreen';
import NotificationModal from '../components/NotificationModal';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const BottomTab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const RoleStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();

const AuthNavigator = React.memo(() => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={enhanceScreen(LoginScreen)} options={{ headerShown: false }} />
    <AuthStack.Screen name="TenantSelection" component={enhanceScreen(TenantSelectionScreen)} />
    <AuthStack.Screen name="ForgotPassword" component={enhanceScreen(ForgotPasswordScreen)} />
  </AuthStack.Navigator>
));

interface AccountStackScreenProps {
  SecondaryRoutes: Route[];
  userIdentity?: UserIdentity;
}

const AccountStackScreen = React.memo(({ SecondaryRoutes, userIdentity }: AccountStackScreenProps) => {
  const translate = useTranslate();
  return (
    <AccountStack.Navigator initialRouteName="Account">
      <AccountStack.Screen
        name="Account"
        component={enhanceScreen(AccountScreen, {
          SecondaryRoutes,
          i18nKey: `Screens.Account`,
        })}
        options={{ title: userIdentity?.fullName }}
      />
      {SecondaryRoutes.filter((e) => !isEmpty(e.route) && (e.component || !isEmpty(e.routes)))
        .flatMap((route) => (isEmpty(route.routes) ? [route] : route.routes))
        .map((e) => (
          <AccountStack.Screen
            key={e?.route}
            name={e?.route || ''}
            component={e?.component}
            options={{
              title: translate(`Screens.${e?.route}.name`, {
                defaultValue: e?.route,
              }),
            }}
          />
        ))}
    </AccountStack.Navigator>
  );
});

const AppNavigationContainer = () => {
  const translate = useTranslate();
  const nbTheme = useTheme();
  const locale = useStoreLocale();
  const { colorMode } = useColorMode();
  const { authenticating, accessToken, role = '', userIdentity } = useAuthProvider();

  const onReady = async () => {
    await SplashScreen.hideAsync();
  };

  const RNTheme = createRNTheme(colorMode || '', nbTheme);

  const PrimaryRoutes = RouteMap[role]?.Primary || [];
  const SecondaryRoutes = React.useMemo(() => RouteMap[role]?.Secondary || [], [role]);

  if (authenticating === undefined) {
    return null;
  }

  return (
    <>
      <NotificationModal />
      <NavigationContainer key={locale} theme={RNTheme} onReady={onReady}>
        {isEmpty(accessToken) ? (
          <AuthNavigator />
        ) : isEmpty(role) ? (
          <RoleStack.Navigator>
            <RoleStack.Screen
              name="RoleSelector"
              component={enhanceScreen(RoleSelectorScreen)}
              options={{
                title: translate(`Screens.RoleSelector.name`, {
                  defaultValue: 'Select Role',
                }),
              }}
            />
          </RoleStack.Navigator>
        ) : (
          <BottomTab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: (props) => <TabBarIcon {...props} route={route} />,
              tabBarLabel: translate(`Screens.${route.name}.name`, {
                defaultValue: route.name,
              }),
            })}
          >
            {PrimaryRoutes.filter((e) => !isEmpty(e.route) && (!isEmpty(e.routes) || e.component)).map(
              ({ route, component, initialRouteName, routes = [] }) => {
                if (component) {
                  return (
                    <BottomTab.Screen
                      key={route}
                      name={route}
                      component={component}
                      options={{
                        title: translate(`Screens.${route}.name`, {
                          defaultValue: route,
                        }),
                      }}
                    />
                  );
                } else {
                  const Stack = createNativeStackNavigator();
                  const StackScreen = () => (
                    <Stack.Navigator initialRouteName={initialRouteName}>
                      {
                        /* eslint-disable-next-line @typescript-eslint/no-shadow */
                        routes.map(({ route: childRoute, component }) => (
                          <Stack.Screen
                            key={childRoute}
                            name={childRoute}
                            component={component}
                            options={{
                              title: translate(`Screens.${childRoute}.name`, {
                                defaultValue: childRoute,
                              }),
                            }}
                          />
                        ))
                      }
                    </Stack.Navigator>
                  );
                  return (
                    <BottomTab.Screen
                      key={route}
                      name={route}
                      component={StackScreen}
                      options={{
                        title: translate(`Screens.${route}.name`, {
                          defaultValue: route,
                        }),
                        headerShown: false,
                      }}
                    />
                  );
                }
              }
            )}

            <BottomTab.Screen name="AccountTab" options={{ headerShown: false }}>
              {() => <AccountStackScreen SecondaryRoutes={SecondaryRoutes} userIdentity={userIdentity} />}
            </BottomTab.Screen>
          </BottomTab.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default AppNavigationContainer;
