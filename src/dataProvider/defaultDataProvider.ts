import type { DataProvider } from '../types';

const defaultDataProvider: DataProvider = {
  list: async (options) => {
    console.log('list', { options });
  },
  query: async (options) => {
    console.log('query', { options });
  },
  mutation: async (options) => {
    console.log('mutation', { options });
  },
};

export default defaultDataProvider;
