import { User } from '@/types';
import { STORAGE_KEYS } from '@/utils/constants';

export const userStorage = {
  setUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },

  getUser: (): User | null => {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data from storage:', error);
      return null;
    }
  },

  removeUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  updateUser: (updates: Partial<User>): void => {
    const currentUser = userStorage.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      userStorage.setUser(updatedUser);
    }
  },
};
