import { fetchUserProjects } from '../src/actions/projectActions';

// Declare global to avoid TypeScript error
declare var global: any;

describe('Project Actions', () => {
  describe('fetchUserProjects', () => {
    it('should fetch user projects successfully', async () => {
      const mockUserId = 'user123';
      const mockProjects = [
        { _id: '1', projectName: 'Project A', description: 'Description A', startDate: '2024-07-10', dueDate: '2024-07-15', status: 'open', userId: mockUserId },
        { _id: '2', projectName: 'Project B', description: 'Description B', startDate: '2024-07-12', dueDate: '2024-07-20', status: 'in progress', userId: mockUserId },
      ];

      // Mocking fetch function
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockProjects),
      });

      const projects = await fetchUserProjects(mockUserId);

      expect(projects).toEqual(mockProjects);
    });

    it('should handle fetch user projects failure', async () => {
      const mockUserId = 'user123';
      const errorMessage = 'Failed to fetch user projects';

      // Mocking fetch function to reject with an error
      global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

      try {
        await fetchUserProjects(mockUserId);
        fail('Expected fetchUserProjects to throw an error');
      } catch (error: any) {
        expect(error.message).toEqual(errorMessage);
      }
    });
  });
});