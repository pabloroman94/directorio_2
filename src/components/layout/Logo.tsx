import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants/translations';

export default function Logo() {
  return (
    <Link to="/" className="text-decoration-none text-dark">
      <div className="d-flex align-items-center gap-2">
        <Code2 size={28} className="text-primary" />
        <span className="h4 mb-0">{TRANSLATIONS.DIRECTORY_TITLE}</span>
      </div>
    </Link>
  );
}