// src/services/index.js
import { fetchData as fetchReal } from './service';
import { fetchData as fetchMock } from './mockService';

const useMockAPI = process.env.REACT_APP_USE_MOCK_API === 'true';

export const fetchData = useMockAPI ? fetchMock : fetchReal;
