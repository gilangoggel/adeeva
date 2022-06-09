export const expeditionsMap : Record<string, string> = {
  tiki: "tiki.png",
  jne: "jne.jpg",
  pos: "pos.png"
}
export const expeditionsUrlMap : Record<string, string> = {
  tiki: "https://www.tiki.id/id/tracking",
  jne: "https://www.jne.co.id/id/tracking/trace",
  pos: "https://www.posindonesia.co.id/id/tracking"
}

export function getExpeditionImage( expedition: string ){
  return expeditionsMap[expedition] ?? ""
}
export function getTrackingUrl(expedition: string){
  return expeditionsUrlMap[expedition] ?? ""
}

export function getExpeditionAttributes(name : string = "expedition"){
  return (self : any)=>({
    get expeditionImage(){
      return getExpeditionImage(self[name])
    },
    get trackingUrl(){
      return getTrackingUrl(self[name])
    },
    onTrackingClick(){
      const url = self.trackingUrl;
      if (! url) return;
      const a = document.createElement('a');
      a.setAttribute("target", "_blank");
      a.setAttribute("href", url)
      a.click();
      a.remove();
    }
  })
}
