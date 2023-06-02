import * as React from 'react';

import { Button, Radio, Box, HStack } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSafeState, useTranslate, isEmpty } from '@jazasoft/react-native-admin';

// import useTranslate from "../../i18n/useTranslate";
// import useSafeState from "../../hooks/useSafeState";

import tenantList from '../../../clients.json';
// import { isEmpty } from "../../util/helpers";

function TenantSelectionScreen({ navigation }) {
  const translate = useTranslate();

  const [tenantId, setTenantId] = useSafeState(null);

  React.useEffect(() => {
    const initAsync = async () => {
      const tenantInfoStr = await AsyncStorage.getItem('tenantInfo');
      if (!isEmpty(tenantInfoStr)) {
        const tenantInfo = JSON.parse(tenantInfoStr);
        setTenantId(tenantInfo.tenantId);
      }
    };
    initAsync();
  }, [setTenantId]);

  const onNext = async () => {
    const tenant = tenantList.find((e) => e.tenantId === tenantId);
    if (tenant) {
      // For Support, Replace local with remote value //
      const finalClient = { ...tenant, local: tenant.remote };
      await AsyncStorage.setItem('tenantInfo', JSON.stringify(finalClient));
      navigation.navigate('Login', { tenantName: tenant.tenantName });
    }
  };

  return (
    <Box p="4">
      <Radio.Group
        name="roleGroup"
        value={tenantId}
        onChange={(nextValue) => {
          setTenantId(nextValue);
        }}
      >
        {tenantList.map((tenant) => (
          <Radio key={tenant.tenantId} value={tenant.tenantId} my={3}>
            {tenant.tenantName}
          </Radio>
        ))}
      </Radio.Group>
      <HStack mt="4">
        <Button flex={1} ml="2" onPress={onNext}>
          {translate('action.next')}
        </Button>
      </HStack>
    </Box>
  );
}

export default TenantSelectionScreen;
