import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export function I18nHtmlSync() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language.slice(0, 2)
  }, [i18n.language])

  return null
}
