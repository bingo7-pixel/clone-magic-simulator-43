export type UserRole = 'staff' | 'manager' | 'admin';

export interface Permission {
  viewOrders: boolean;
  updateStatus: boolean;
  addComments: boolean;
  printOrders: boolean;
  manageUsers: boolean;
  viewReports: boolean;
  deleteOrders: boolean;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export const rolePermissions: Record<UserRole, Permission> = {
  staff: {
    viewOrders: true,
    updateStatus: true,
    addComments: true,
    printOrders: true,
    manageUsers: false,
    viewReports: false,
    deleteOrders: false,
  },
  manager: {
    viewOrders: true,
    updateStatus: true,
    addComments: true,
    printOrders: true,
    manageUsers: false,
    viewReports: true,
    deleteOrders: true,
  },
  admin: {
    viewOrders: true,
    updateStatus: true,
    addComments: true,
    printOrders: true,
    manageUsers: true,
    viewReports: true,
    deleteOrders: true,
  },
};