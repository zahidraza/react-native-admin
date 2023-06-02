export const findMinValue = (data) => {
  if (!data || !Array.isArray(data)) return;
  let minValue = null;
  for (let i = 0; i < data.length; i++) {
    if (minValue == null || parseFloat(data[i]) < minValue) {
      minValue = data[i];
    }
  }
  return minValue;
};

export const findMaxValue = (data) => {
  if (!data || !Array.isArray(data)) return;
  let maxValue = null;
  for (let i = 0; i < data.length; i++) {
    if (maxValue == null || parseFloat(data[i]) > maxValue) {
      maxValue = data[i];
    }
  }
  return maxValue;
};
