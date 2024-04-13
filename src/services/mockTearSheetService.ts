 // mockTearSheetService.js

export const fetchTearSheets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          TearSheets: [
            { Id: 'TS1', Name: 'Engineering Team', CandidateCount: '5' },
            { Id: 'TS2', Name: 'Marketing Team', CandidateCount: '3' }
          ],
          ExeedLimit: false,
          ISRecruitingManager: false,
          MaxAllowedCountTearSheetDetails: 10,
          MaxTearSheetLimit: 2
        })
      };
      resolve(mockResponse);
    }, 1000); // Simulate a network delay
  });
};
