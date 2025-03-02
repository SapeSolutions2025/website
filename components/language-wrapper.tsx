"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/lib/language-context"

interface LanguageWrapperProps {
  children: (props: { t: (key: string) => string }) => ReactNode
}

export function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { t } = useLanguage()

  return <>{children({ t })}</>
}

