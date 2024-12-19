import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5>Directorio Profesional</h5>
            <p className="text-muted">
              Conectamos profesionales y empresas para crear oportunidades de crecimiento y colaboración.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-light">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-light">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-light">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          <div className="col-lg-4">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Inicio</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Buscar Profesionales</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Registrarse</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Contacto</a></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center gap-2 mb-2">
                <MapPin size={18} />
                <span className="text-muted">123 Calle Principal, Ciudad</span>
              </li>
              <li className="d-flex align-items-center gap-2 mb-2">
                <Phone size={18} />
                <span className="text-muted">+1 234 567 890</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Mail size={18} />
                <span className="text-muted">contacto@directorio.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-center text-muted">
          <small>&copy; 2024 Directorio Profesional. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}