import * as React from 'react';
import { Text, Actionsheet, HStack } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { useTranslate, useSafeState } from '@jazasoft/react-native-admin';

const UrlInfoActionSheet = ({ isOpen, onClose, i18nKey }) => {
  const translate = useTranslate();
  const theme = useTheme();

  const [config, setConfig] = useSafeState({ localIP: null, publicIP: null });

  React.useEffect(() => {
    const initAsync = async () => {
      const tenantInfoStr = await AsyncStorage.getItem('tenantInfo');
      let localhost, publicHost;
      if (tenantInfoStr) {
        const tenantInfo = JSON.parse(tenantInfoStr);
        localhost = tenantInfo?.local?.app?.host;
        publicHost = tenantInfo?.remote?.app?.host;
      }
      setConfig({ localIP: localhost, publicIP: publicHost });
    };

    initAsync();
  }, [isOpen, setConfig]);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bgColor={theme.colors.card}>
        <HStack justifyContent="space-between" w="full" px={['3', '4']} py="2">
          <Text>{translate(`${i18nKey}.server_local_ip`, { defaultValue: 'Server Local IP' })}</Text>
          <Text>{config.localIP || '-'}</Text>
        </HStack>
        <HStack justifyContent="space-between" w="full" px={['3', '4']} py="2">
          <Text>{translate(`${i18nKey}.domain_name`, { defaultValue: 'Domain Name' })}</Text>
          <Text>{config.publicIP || '-'}</Text>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default UrlInfoActionSheet;
