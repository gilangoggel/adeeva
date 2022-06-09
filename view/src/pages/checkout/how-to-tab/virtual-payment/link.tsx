import {createElement} from "react";

type P = {
  bankSite: string
  link: string
}

export function link({bankSite, link}: P){
  return (
    <span>
      Pergi ke halaman situs {bankSite} <a target='_blank' href={link}>{link}</a>
    </span>
  )
}

export function makeLinkNode(p: P){
  return createElement(link, {...p, key: p.link})
}
