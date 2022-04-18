export type LinkItem = {
  to: string
  text: string
}


export type ItemGroup = {
  title: string
  items: LinkItem[]
}


export interface UseBackOfficeLayout {
  links: ItemGroup[]
  to(path: string) : ()=> void
  root: string
}

export type ComponentProps = {
  mode: "admin" | 'reseller'
}
