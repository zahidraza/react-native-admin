import * as React from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Center,
  Icon,
  Pressable,
  HStack,
  useToast,
  useDisclose,
  ScrollView,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

import { useAuthProvider, useSafeState, useTranslate, isEmpty } from '@jazasoft/react-native-admin';

import UrlInfoActionSheet from './components/UrlInfoActionSheet';

const validate = (formData) => {
  let errors = {};
  if (isEmpty(formData.username)) {
    errors.username = 'Username is required';
  }
  if (isEmpty(formData.password)) {
    errors.password = 'Password is required';
  }
  return errors;
};

function LoginScreen({ navigation, route, i18nKey, landscape }) {
  const translate = useTranslate();
  const theme = useTheme();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const { authenticating, login } = useAuthProvider();

  const [show, setShow] = useSafeState(false);
  const [formData, setFormData] = useSafeState({ username: '', password: '' });
  const [errors, setErrors] = useSafeState({ username: undefined, password: undefined });
  const [tenantName, setTenantName] = useSafeState(null);

  const version = Constants.manifest?.extra?.version || Constants.manifest.version;
  const tenantId = Constants.manifest?.extra?.tenantId;
  // const updateUrl = Constants.manifest?.updates?.url;
  // const enabled = Constants.manifest?.updates?.enabled;

  React.useEffect(() => {
    const initAsync = async () => {
      const tenantInfoStr = await AsyncStorage.getItem('tenantInfo');
      if (!isEmpty(tenantInfoStr)) {
        const tenantInfo = JSON.parse(tenantInfoStr);
        setTenantName(tenantInfo.tenantName);
      } else {
        setTenantName(Constants.manifest?.extra?.tenantName);
      }
    };
    initAsync();
  }, [setTenantName]);
  React.useEffect(() => {
    if (!isEmpty(route.params?.tenantName)) {
      setTenantName(route.params?.tenantName);
    }
  }, [route.params?.tenantName, setTenantName]);

  const handleLogin = () => {
    const errs = validate(formData);
    if (!isEmpty(errs)) {
      setErrors(errs);
      return;
    }
    login(formData);
  };

  const onForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };

  const onCopyrightPress = () => {
    if (['dev', 'mkt', 'jazasoft'].includes(tenantId)) {
      navigation.navigate('TenantSelection');
    }
  };

  const onFetchUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      toast.show({ description: `Update Available = ${update.isAvailable}` });
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      /* eslint-disable-next-line no-alert */
      alert(`Error fetching latest Expo update: ${error}`);
    }
  };

  const loginContent = (
    <VStack w="full" h="full">
      {/** Top Content */}
      <Center>
        <Pressable m={['3', '4']} mt={landscape ? ['4', '6'] : ['8', '12']} onPress={onOpen}>
          <Heading size="md" fontWeight="normal">
            {tenantName}
          </Heading>
        </Pressable>
      </Center>

      {/** Login Content */}
      <Center flex={1}>
        <Box safeArea p="2" py="8" w="80%">
          <Heading size="lg" fontWeight="600" alignSelf="center">
            {translate('app.name')} - {translate('app.description')}
          </Heading>

          <VStack space={3} mt="12">
            <FormControl isInvalid={!isEmpty(errors.username)}>
              <Input
                _dark={{ borderColor: 'coolGray.400', placeholderTextColor: 'coolGray.400' }}
                bgColor={theme.colors.card}
                placeholder={translate('auth.label.username')}
                value={formData.username}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, username: text }))}
                InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" _dark={{ color: 'coolGray.50' }} />}
              />
              <FormControl.ErrorMessage>{errors.username}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(errors.password)}>
              <Input
                _dark={{ borderColor: 'coolGray.400', placeholderTextColor: 'coolGray.400' }}
                bgColor={theme.colors.card}
                type={show ? 'text' : 'password'}
                placeholder={translate('auth.label.password')}
                value={formData.password}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
                InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" _dark={{ color: 'coolGray.50' }} />}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                      size={5}
                      mr="2"
                      color="muted.400"
                      _dark={{ color: 'coolGray.50' }}
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf="flex-end"
                mt="1"
                onPress={onForgotPasswordPress}
              >
                {translate('auth.button.forgot_password')}
              </Link>
            </FormControl>
            <Button mt="2" onPress={handleLogin} isLoading={authenticating} isLoadingText={translate('auth.button.login')}>
              {translate('auth.button.login')}
            </Button>
          </VStack>
        </Box>
      </Center>

      {/** Bottom Content */}
      <Box>
        <HStack m={['3', '4']} justifyContent="space-between">
          <Pressable onPress={onCopyrightPress}>
            <Text>
              &#169; {new Date().getFullYear()} {translate('app.copyright')}
            </Text>
          </Pressable>
          <Pressable onPress={onFetchUpdate}>
            <Text>v{version}</Text>
          </Pressable>
        </HStack>
      </Box>
    </VStack>
  );

  return (
    <>
      <UrlInfoActionSheet isOpen={isOpen} onClose={onClose} i18nKey={i18nKey} />

      {landscape ? <ScrollView>{loginContent}</ScrollView> : loginContent}
    </>
  );
}

export default LoginScreen;
