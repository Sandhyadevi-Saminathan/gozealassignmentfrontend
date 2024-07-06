import { loginUser } from '../actions/authActions';

// Declare global to avoid TypeScript error
declare var global: any;

describe('Auth Actions', () => {
  describe('loginUser', () => {
    it('should login user successfully', async () => {
      const mockCredentials = { email: 'user123@example.com', password: 'password' };
      const mockResponse = { token: 'abc123' };

      // Mocking fetch function
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const response = await loginUser(mockCredentials);

      expect(response).toEqual(mockResponse);
    });

    it('should handle login user failure', async () => {
      const mockCredentials = { email: 'user123@example.com', password: 'password' };
      const errorMessage = 'Invalid credentials';

      // Mocking fetch function to reject with an error
      global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

      try {
        await loginUser(mockCredentials);
        fail('Expected loginUser to throw an error');
      } catch (error) {
        expect((error as Error).message).toEqual(errorMessage);
      }
    });
  });
});
