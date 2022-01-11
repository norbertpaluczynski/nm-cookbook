export interface DictionaryRow {
  id: string
  value: string
}

export interface MenuItem {
  label: string
  path: string
  accessType: AccesType
  icon: string
}

export enum AccesType {
  public = 'public',
  user = 'user',
  admin = 'admin'
}
