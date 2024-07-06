import { fetchProject } from '../actions/projectActions';

// Declare global to avoid TypeScript error
declare var global: any;

describe('Project Actions', () => {
  describe('fetchProject', () => {
    it('should fetch a project successfully', async () => {
      const projectId = '123'; // Mock project ID
      const mockProject = {
        _id: projectId,
        projectName: 'Test Project',
        description: 'Test Description',
        startDate: '2024-07-10',
        dueDate: '2024-07-15',
        status: 'open',
        userId: 'user123',
      };

      // Mocking fetch function
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockProject),
      });

      const project = await fetchProject(projectId);

      expect(project).toEqual(mockProject);
    });

    it('should handle fetch failure for a project', async () => {
      const projectId = '123'; // Mock project ID
      const errorMessage = 'Failed to fetch project';

      // Mocking fetch function to reject with an error
      global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

      try {
        await fetchProject(projectId);
        fail('Expected fetchProject to throw an error');
      } catch (error: any) {
        expect(error.message).toEqual(errorMessage);
      }
    });
  });
});
