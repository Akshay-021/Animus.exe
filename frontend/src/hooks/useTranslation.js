import { useAppContext } from "../context/AppContext";
import { getTranslation } from "../utils/translations";

export default function useTranslation() {
  const { language } = useAppContext();

  const t = (key) => getTranslation(key, language);

  return { t, language };
}
