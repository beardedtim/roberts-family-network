import findRoleByAttribute from '@app/use-cases/find-role-by-attribute'

export const findByName = (name: string) => findRoleByAttribute('name', name)
export const findById = (id: string) => findRoleByAttribute('id', id)
