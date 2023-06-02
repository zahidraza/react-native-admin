import * as React from 'react';

import { Box, Center, Text, Button, Radio, HStack, useToast } from 'native-base';

import { useAuthProvider, useSafeState, useTranslate, isEmpty } from '@jazasoft/react-native-admin';
// import useAuthProvider from "../../auth/useAuthProvider";

// import useTranslate from "../../i18n/useTranslate";
import Roles from '../../constants/Roles';
// import useSafeState from "../../hooks/useSafeState";
// import { isEmpty } from "../../util/helpers";

const RoleMap = Object.values(Roles).reduce((acc, e) => ({ ...acc, [e.id]: e.name }), {});

function RoleSelectorScreen({ i18nKey }) {
  const translate = useTranslate();
  const { logout, changeRole, userIdentity } = useAuthProvider();
  const toast = useToast();

  const [role, setRole] = useSafeState('');

  const onNext = () => {
    if (isEmpty(role)) {
      toast.show({
        description: translate(`${i18nKey}.message.select_role`),
      });
    } else {
      changeRole(role);
    }
  };
  const roleList = userIdentity?.roleList || [];

  return (
    <Box p="4">
      {!isEmpty(roleList) && (
        <Radio.Group
          name="roleGroup"
          value={role}
          onChange={(nextValue) => {
            setRole(nextValue);
          }}
        >
          {roleList.map((roleId) => (
            <Radio key={roleId} value={roleId} my={3}>
              {RoleMap[roleId]}
            </Radio>
          ))}
        </Radio.Group>
      )}
      {isEmpty(roleList) && (
        <Center>
          <Text>
            {translate('auth.message.unsupported_role', {
              roleIds: userIdentity?.roles,
              roles: Object.values(Roles)
                .map((e) => e.name)
                .join(', '),
            })}
          </Text>
        </Center>
      )}
      <HStack mt="4">
        <Button flex={1} mr="2" variant="outline" borderColor="primary.500" onPress={() => logout()}>
          {translate('auth.button.logout')}
        </Button>
        <Button flex={1} ml="2" isDisabled={isEmpty(role)} onPress={onNext}>
          {translate('action.next')}
        </Button>
      </HStack>
    </Box>
  );
}

export default RoleSelectorScreen;
