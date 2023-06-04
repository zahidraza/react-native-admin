import * as React from 'react';

import { Box, HStack, ScrollView } from 'native-base';

import { Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';

const getColWidthMap = (columns, rows) => {
  const colWidthList = columns.map((column) => {
    const values = rows.map((row) => row[column.dataKey]);
    const charLength = [column.title, ...values].sort((a, b) => b.length - a.length)[0]?.length;
    return {
      dataKey: column.dataKey,
      width: Math.max(Math.round(charLength * 10), 50),
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

function SimpleTable({ columns, rows }) {
  const theme = useTheme();
  const colWidthMap = getColWidthMap(columns, rows);

  return (
    <ScrollView horizontal>
      <Box mt="2" width="full" bgColor={theme.colors.card}>
        <HStack>
          {columns.map((c, colIdx) => (
            <Box
              width={`${colWidthMap[c.dataKey]}px`}
              key={colIdx}
              py="1"
              px="2"
              borderTopWidth="1"
              borderBottomWidth="1"
              borderLeftWidth={colIdx === 0 ? '1' : '0'}
              borderRightWidth="1"
              borderColor={theme.colors.border}
            >
              {c.title}
            </Box>
          ))}
        </HStack>
        {rows.map((row, rowIdx) => (
          <HStack key={rowIdx}>
            {columns.map((c, colIdx) => (
              <Box
                width={`${colWidthMap[c.dataKey]}px`}
                key={`${rowIdx}-${colIdx}`}
                py="1"
                px="2"
                borderBottomWidth="1"
                borderLeftWidth={colIdx === 0 ? '1' : '0'}
                borderRightWidth="1"
                borderColor={theme.colors.border}
              >
                {row[c.dataKey]}
              </Box>
            ))}
          </HStack>
        ))}
      </Box>
    </ScrollView>
  );
}

export default SimpleTable;
