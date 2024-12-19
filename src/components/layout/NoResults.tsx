import { TRANSLATIONS } from '../../constants/translations';

export default function NoResults() {
  return (
    <div className="text-center py-5">
      <p className="text-muted fs-5">{TRANSLATIONS.NO_RESULTS}</p>
    </div>
  );
}