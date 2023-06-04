/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { truncate } from 'lodash';
import { Box, Text, Pressable, Icon, Popover, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const DepartmentPopover = ({ locationList, theme }) => {
  const departmentMap = locationList?.reduce((acc, loc) => ({ ...acc, [loc.department?.id]: loc.department }), {}) || {};
  const departmentList = Object.values(departmentMap);
  const department = departmentList
    .sort((a, b) => a.serialNo - b.serialNo)
    .map((e) => e.name)
    .join(', ');
  const shortDepartment = truncate(department, { length: 30 });
  if (departmentList?.length <= 1 || shortDepartment === department) {
    return (
      <>
        <Text>{department || '-'}</Text>
        <Icon as={MaterialIcons} name="navigate-next" size="md" ml="1" color={theme.colors.card} />
      </>
    );
  } else {
    return (
      <>
        <Popover
          trigger={(triggerProps) => (
            <Pressable {...triggerProps} variant="unstyled">
              <Text>{shortDepartment}</Text>
            </Pressable>
          )}
        >
          <Popover.Content w="56">
            <Popover.Body>
              <VStack>
                {departmentList.map((dept) => (
                  <Box py="2" key={dept.id}>
                    {dept.name}
                  </Box>
                ))}
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover>
        <Icon as={MaterialIcons} name="navigate-next" size="md" ml="1" />
      </>
    );
  }
};

export default DepartmentPopover;
