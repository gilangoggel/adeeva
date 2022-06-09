import {ReactNode} from "react";

export type Step = {
  title: string
  texts: (string | ReactNode)[]
}

export type StepCallback = (data: Record<string, any>) => Step

export type VirtualAccountInfo = {
  title: string
  steps: (Step | StepCallback)[]
}
