/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { truncate } from 'lodash';
import { Dimensions } from 'react-native';
import { Box, Text, Pressable, Icon, Popover, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { isEmpty } from '@jazasoft/react-native-admin';

import DataTable from '../../../components/DataTable';

const screenWidth = Dimensions.get('window').width;

const columns = [
  { dataKey: 'department', title: 'Department', charWidth: 8 },
  { dataKey: 'line', title: 'Line', charWidth: 8 },
];

const LinePopover = ({ locationList, theme, i18nKey }) => {
  const departmentMap = locationList?.reduce((acc, loc) => ({ ...acc, [loc.department?.id]: loc.department }), {}) || {};
  const departmentList = Object.values(departmentMap);

  const lineList = departmentList
    .sort((a, b) => a.serialNo - b.serialNo)
    .map((department) => {
      const lineMap = locationList
        ?.filter((loc) => loc.department?.id === department.id && !isEmpty(loc.line))
        .reduce((acc, loc) => ({ ...acc, [loc.line.id]: loc.line }), {});
      return {
        department,
        name: isEmpty(lineMap)
          ? 'All'
          : Object.values(lineMap)
              .sort((a, b) => a.serialNo - b.serialNo)
              .map((e) => e.name)
              .join(', '),
      };
    })
    .map((e) => ({ department: e.department?.name, line: e.name }));
  const line = lineList.map((e) => (departmentList?.length > 1 ? `${e.department} - ${e.line}` : e.line)).join('; ');
  const shortLine = truncate(line, { length: 30 });

  if (shortLine === line) {
    return (
      <>
        <Text>{line || '-'}</Text>
        <Icon as={MaterialIcons} name="navigate-next" size="md" ml="1" color={theme.colors.card} />
      </>
    );
  } else {
    return (
      <>
        <Popover
          trigger={(triggerProps) => (
            <Pressable {...triggerProps} variant="unstyled">
              <Text>{shortLine}</Text>
            </Pressable>
          )}
        >
          {departmentList?.length > 1 && (
            <Popover.Content w={`${0.9 * screenWidth}px`}>
              <Popover.Body p="0" m="0">
                <DataTable
                  columns={columns}
                  rows={lineList}
                  bgColor="coolGrey.100"
                  _dark={{ bgColor: 'warmGray.800' }}
                  i18nKeyPrefix={`${i18nKey}.profile`}
                />
              </Popover.Body>
            </Popover.Content>
          )}
          {departmentList?.length === 1 && (
            <Popover.Content w="56">
              <Popover.Body>
                <VStack>
                  {locationList
                    .sort((a, b) => a.line?.serialNo - b.line?.serialNo)
                    .map((loc) => (
                      <Box py="2" key={loc.id}>
                        {loc.line?.name || 'All'}
                      </Box>
                    ))}
                </VStack>
              </Popover.Body>
            </Popover.Content>
          )}
        </Popover>
        <Icon as={MaterialIcons} name="navigate-next" size="md" ml="1" />
      </>
    );
  }
};

export default LinePopover;
