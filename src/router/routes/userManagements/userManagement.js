import { lazy } from 'react'

const UserManagement = [
  {
    path: '/user-management',
    exact: true,
    component: lazy(() => import('../../../views/userManagements/index'))
  },
  {
    path: '/user-management/create',
    component: lazy(() => import('../../../views/userManagements/create'))
  }
]

export default UserManagement
