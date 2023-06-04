/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, HStack, Spacer, Text, useDisclose, Button, Pressable, Heading, Flex, Icon } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome, Octicons, SimpleLineIcons } from '@expo/vector-icons';

import FocusAndThemeAwareStatusBar from '../../components/StatusBar';

import { useTranslate, useLocale, useLocales, useColorMode, useAuthProvider, useSafeState, useUser } from '@jazasoft/react-native-admin';

import Roles from '../../constants/Roles';

import LanguageActionSheet from './components/LanguageActionSheet';
import ThemeActionSheet from './components/ThemeActionSheet';
import RoleActionSheet from './components/RoleActionSheet';
import PasswordChangeModal from './components/PasswordChangeModal';
import DepartmentPopover from './components/DepartmentPopover';
import LinePopover from './components/LinePopover';

const RoleMap = Object.values(Roles).reduce((acc, e) => ({ ...acc, [e.id]: e.name }), {});

function AccountScreen({ SecondaryRoutes, navigation, i18nKey }) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { role, userIdentity, logout } = useAuthProvider();

  const translate = useTranslate();
  const locale = useLocale();
  const localeList = useLocales();
  const colorMode = useColorMode();
  const theme = useTheme();

  const user = useUser();

  const [setting, setSetting] = React.useState();
  const [modalOpen, setModalOpen] = useSafeState(false);

  const handleLogout = React.useCallback(async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys.filter((key) => key.startsWith('Store.')));
    logout();
  }, [logout]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant="ghost"
          pl="6"
          _text={{ fontWeight: 'bold' }}
          rightIcon={<Icon as={MaterialCommunityIcons} name="logout-variant" size="md" />}
          onPress={handleLogout}
        >
          {translate('auth.button.logout')}
        </Button>
      ),
      headerShadowVisible: false,
    });
  }, [navigation, theme, handleLogout, translate]);

  const themeValue =
    colorMode === 'light'
      ? `${i18nKey}.theme.value_light`
      : colorMode === 'dark'
      ? `${i18nKey}.theme.value_dark`
      : `${i18nKey}.theme.value_automatic`;

  const language = localeList?.find((e) => e.locale === locale)?.name;

  const onActionSheetOpen = (s) => {
    setSetting(s);
    onOpen();
  };

  const onActionSheetClose = () => {
    setSetting(null);
    onClose();
  };

  return (
    <>
      <FocusAndThemeAwareStatusBar />
      <LanguageActionSheet
        isOpen={isOpen && setting === 'language'}
        localeList={localeList}
        locale={locale}
        onClose={onActionSheetClose}
        i18nKey={i18nKey}
      />
      <ThemeActionSheet isOpen={isOpen && setting === 'theme'} onClose={onActionSheetClose} i18nKey={i18nKey} />
      <RoleActionSheet isOpen={isOpen && setting === 'role'} onClose={onActionSheetClose} i18nKey={i18nKey} />
      <PasswordChangeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} i18nKey={i18nKey} />

      <Box>
        {/** Secondary Routes */}
        {SecondaryRoutes?.length > 0 && (
          <Box bgColor={theme.colors.card}>
            <HStack m="2" flexWrap="wrap">
              {SecondaryRoutes.map(({ route, initialRouteName }, idx) => (
                <Box
                  key={route}
                  w="1/2"
                  // w={SecondaryRoutes?.length % 2 === 1 && idx === 0 ? "full" : "1/2"}
                  px="2"
                  py="1.5"
                >
                  <Button
                    variant="outline"
                    // bgColor={theme.colors.background}
                    _text={{ fontWeight: 'semibold' }}
                    onPress={() => navigation.navigate(initialRouteName || route)}
                    borderColor="coolGray.200"
                    _dark={{
                      borderColor: 'coolGray.400',
                    }}
                  >
                    {translate(`Screens.${route}.name`)}
                  </Button>
                </Box>
              ))}
            </HStack>
          </Box>
        )}

        {/** Profile */}
        <Flex mx="0" mt="3" p="4" bgColor={theme.colors.card}>
          <Heading size="sm" mb="2" fontWeight="semibold">
            {translate(`${i18nKey}.title.profile`)}
          </Heading>

          <Box py="3" w="full">
            <HStack alignItems="center">
              <Icon as={Ionicons} name="person" size="md" mr="2" />
              <Text>{translate(`${i18nKey}.profile.full_name`)}</Text>
              <Spacer />
              <Text>{userIdentity.fullName}</Text>
              <Icon as={MaterialIcons} name="navigate-next" size="md" ml="1" color={theme.colors.card} />
            </HStack>
          </Box>
          <Box py="3" w="full">
            <HStack alignItems="center">
              <Icon as={SimpleLineIcons} name="organization" size="md" mr="2" />
              <Text>{translate(`${i18nKey}.profile.department`)}</Text>
              <Spacer />
              <DepartmentPopover locationList={user?.locationList || []} theme={theme} />
            </HStack>
          </Box>
          <Box py="3" w="full">
            <HStack alignItems="center">
              <Icon as={Octicons} name="organization" size="md" mr="2" />
              <Text>{translate(`${i18nKey}.profile.line`)}</Text>
              <Spacer />
              <LinePopover locationList={user?.locationList || []} theme={theme} i18nKey={i18nKey} />
            </HStack>
          </Box>

          <Box py="3" w="full">
            <Pressable onPress={() => userIdentity?.roleList?.length > 1 && onActionSheetOpen('role')}>
              <HStack alignItems="center">
                <Icon as={Ionicons} name="people" size="md" mr="2" />
                <Text>{translate(`${i18nKey}.role.label`)}</Text>
                <Spacer />
                <Text>{RoleMap[role]}</Text>
                <Icon
                  as={MaterialIcons}
                  name="navigate-next"
                  size="md"
                  ml="1"
                  color={userIdentity?.roleList?.length > 1 ? undefined : theme.colors.card}
                />
              </HStack>
            </Pressable>
          </Box>
        </Flex>

        {/** Settings */}
        <Flex mx="0" mt="3" p="4" bgColor={theme.colors.card}>
          <Heading size="sm" mb="2" fontWeight="semibold">
            {translate(`${i18nKey}.title.settings`)}
          </Heading>
          <Box py="3" w="full">
            <Pressable onPress={() => onActionSheetOpen('language')}>
              <HStack alignItems="center">
                <Icon as={FontAwesome} name="language" size="md" mr="2" />
                <Text>{translate(`${i18nKey}.lang.label`)}</Text>
                <Spacer />
                <Text>{language}</Text>
                <Icon as={MaterialIcons} name="navigate-next" size="md" ml="1" />
              </HStack>
            </Pressable>
          </Box>

          <Box py="3" w="full">
            <Pressable onPress={() => onActionSheetOpen('theme')}>
              <HStack alignItems="center">
                <Icon as={MaterialCommunityIcons} name="theme-light-dark" size="md" mr="2" />
                <Text>{translate(`${i18nKey}.theme.label`)}</Text>
                <Spacer />
                <Text>{translate(themeValue)}</Text>
                <Icon as={MaterialIcons} name="navigate-next" size="md" ml="1" />
              </HStack>
            </Pressable>
          </Box>
        </Flex>

        <Box mt="6" mx="4">
          <Button
            w="full"
            variant="ghost"
            borderRadius="lg"
            bgColor={theme.colors.card}
            _text={{ fontWeight: 'bold' }}
            onPress={() => setModalOpen(true)}
          >
            {translate('auth.button.change_password')}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AccountScreen;
