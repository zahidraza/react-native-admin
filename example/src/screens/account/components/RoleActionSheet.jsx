import * as React from 'react';
import { Box, Text, Actionsheet } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { useTranslate, useAuthProvider, isEmpty } from '@jazasoft/react-native-admin';

import Roles from '../../../constants/Roles';

const RoleMap = Object.values(Roles).reduce((acc, e) => ({ ...acc, [e.id]: e.name }), {});

const RoleActionSheet = ({ isOpen, onClose, i18nKey }) => {
  const translate = useTranslate();
  const theme = useTheme();
  const { role, userIdentity, changeRole } = useAuthProvider();

  const onRoleChange = (r) => {
    changeRole(r);
    onClose && onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bgColor={theme.colors.card}>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text fontSize="16" color="gray.500" _dark={{ color: 'gray.300' }}>
            {translate(`${i18nKey}.role.title`)}
          </Text>
        </Box>
        {!isEmpty(userIdentity?.roleList) &&
          userIdentity.roleList.map((roleId) => (
            <Actionsheet.Item bgColor={theme.colors.card} key={roleId} isDisabled={roleId === role} onPress={() => onRoleChange(roleId)}>
              {RoleMap[roleId]}
            </Actionsheet.Item>
          ))}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default RoleActionSheet;
