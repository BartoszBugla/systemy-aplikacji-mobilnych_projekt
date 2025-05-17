import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const languages = [
  { code: "en", translationKey: "language.english" },
  { code: "pl", translationKey: "language.polish" },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onValueChange={(value) => i18n.changeLanguage(value)}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={t("language.select")} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {t(lang.translationKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
