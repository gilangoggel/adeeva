export enum ExpeditionName {
  JNE = 'JNE',
  POS = 'POS',
  SICEPAT = 'SI_CEPAT',
}

export const expeditionUrl: Record<ExpeditionName, string> = {
  JNE: '/assets/expedition/jne.png',
  POS: '/assets/expedition/pos.png',
  [ExpeditionName.SICEPAT]: '/assets/expedition/sicepat.png',
}
