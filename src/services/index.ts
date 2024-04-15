// src/services/index.js
import { fetchTearSheets as fetchReal } from './tearSheetService';
import { fetchTearSheets as fetchMock } from './mockTearSheetService';

const useMockAPI = process.env.REACT_APP_USE_MOCK_API === 'true';

export const fetchTearSheets = useMockAPI ? fetchMock : fetchReal;