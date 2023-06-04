import * as React from 'react';

import { Box, HStack, ScrollView, VStack, Text, useBreakpointValue } from 'native-base';
import { Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslate, isEmpty } from '@jazasoft/react-native-admin';

import { findMaxValue } from '../util/mathUtils';

const charWidth = 10;

const cellAlignMap = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

const findMaxCellHeight = (row, columns) => {
  const heightList = columns.flatMap((c) => {
    const value = row[c.dataKey];
    return Array.isArray(value) ? value.map((v) => (Array.isArray(v) && v.length === 2 ? v[1] || 1 : 1)) : [1];
  });
  return findMaxValue(heightList) || 1;
};

/*
// Simple Table //
const rows = [
  {
    "operator": "Operator 1",
    "wip": 10,
    "operation": "Operation 1",
  },
  {
    "operator": "Operator 2",
    "wip": 20,
    "operation": "Operation 2",
  }
]

// Grouped Table //
const rows = [
  {
    "operator": [["Operator 1", 3]],
    "wip": [[10, 1], [11, 1], [12, 1]],
    "operation": [["Operation 1", 2], ["Operation 2", 1]]
  },
  {
    "operator": [["Operator 2", 1]],
    "wip": [[13, 1]],
    "operation": [["Operation 3", 1]]
  }
]
*/
const getColWidthMap = (columns, rows, widthMultiplier = 1) => {
  const colWidthList = columns.map((column) => {
    const values = rows.flatMap((row) => {
      const cellValue = row[column.dataKey] || [];
      const vals = Array.isArray(cellValue) ? cellValue : [[cellValue, 1]];
      return vals.map((value) => `${value}`);
    });
    const charLength = [column.title, ...values].sort((a, b) => b.length - a.length)[0]?.length;
    return {
      dataKey: column.dataKey,
      width: Math.max(Math.round(charLength * widthMultiplier * (column.charWidth || charWidth)), 50),
    };
  }, {});
  const totalWidth = colWidthList.reduce((acc, c) => acc + c.width, 0);
  const screenWidth = Dimensions.get('window').width - 32;

  if (totalWidth < screenWidth) {
    return colWidthList.reduce(
      (acc, col) => ({
        ...acc,
        [col.dataKey]: (col.width * screenWidth) / totalWidth,
      }),
      {}
    );
  } else {
    return colWidthList.reduce((acc, col) => ({ ...acc, [col.dataKey]: col.width }), {});
  }
};

function DataTable({ columns, rows, maxHeight, i18nKeyPrefix, headerProps, bodyProps, ...restProps }) {
  const theme = useTheme();
  const translate = useTranslate();
  const cellHeight = useBreakpointValue({ base: 30, sm: 40 });
  const widthMultiplier = useBreakpointValue({ base: 1, sm: 1.3 });

  const finalColumns = columns.map((c) => ({
    ...c,
    title: isEmpty(i18nKeyPrefix) ? c.title : translate(`${i18nKeyPrefix}.${c.dataKey}`, { defaultValue: c.title }),
  }));

  const colWidthMap = getColWidthMap(finalColumns, rows, widthMultiplier);

  const bodyContent = rows.map((row, rowIdx) => (
    <HStack key={rowIdx}>
      {columns.map((column, colIdx) => {
        const maxCellHeight = findMaxCellHeight(row, columns);
        const cellValue = row[column.dataKey] || [['', maxCellHeight]];
        const values = Array.isArray(cellValue) ? cellValue : [[cellValue, 1]];
        return (
          <VStack key={`${rowIdx}-${colIdx}`}>
            {values.map((value, idx) => (
              <Box
                key={`${rowIdx}-${colIdx}-${idx}`}
                width={`${colWidthMap[column.dataKey]}px`}
                height={`${(value[1] || 1) * cellHeight}px`}
                py="1"
                px="2"
                borderBottomWidth="1"
                borderLeftWidth={colIdx === 0 ? '1' : '0'}
                borderRightWidth="1"
                borderColor={theme.colors.border}
                justifyContent="center"
                alignItems={cellAlignMap[column.align] || 'flex-start'}
              >
                <Text>
                  {value[0]}
                  {column.suffix}
                </Text>
              </Box>
            ))}
          </VStack>
        );
      })}
    </HStack>
  ));

  return (
    <ScrollView horizontal>
      <Box width="full" bgColor={theme.colors.card} maxHeight={maxHeight} {...restProps}>
        <HStack {...headerProps}>
          {finalColumns.map((column, colIdx) => (
            <Box
              key={colIdx}
              width={`${colWidthMap[column.dataKey]}px`}
              height={`${cellHeight + 10}px`}
              py="2"
              px="2"
              borderTopWidth="1"
              borderBottomWidth="1"
              borderLeftWidth={colIdx === 0 ? '1' : '0'}
              borderRightWidth="1"
              borderColor={theme.colors.border}
              alignItems={cellAlignMap[column.align] || 'flex-start'}
            >
              <Text fontWeight="semibold">{column.title}</Text>
            </Box>
          ))}
        </HStack>
        <Box {...bodyProps}>
          {isEmpty(maxHeight) && bodyContent}
          {!isEmpty(maxHeight) && <ScrollView>{bodyContent}</ScrollView>}
        </Box>
      </Box>
    </ScrollView>
  );
}

DataTable.whyDidYouRender = {
  customName: 'DataTable',
};

export default React.memo(DataTable);
