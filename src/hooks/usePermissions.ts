import { rolePermissions, type Permission, type UserRole } from '../types/auth';

// Mock current user - in a real app, this would come from your auth system
const mockCurrentUser = {
  id: '1',
  name: 'John Doe',
  role: 'manager' as UserRole,
};

export const usePermissions = () => {
  const userPermissions = rolePermissions[mockCurrentUser.role];

  const can = (permission: keyof Permission): boolean => {
    return userPermissions[permission];
  };

  return {
    can,
    role: mockCurrentUser.role,
    user: mockCurrentUser,
  };
};