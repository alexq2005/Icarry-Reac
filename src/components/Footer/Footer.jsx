// pie de pagina con mi nombre y las redes.
// por ahora Whatsapp e Instagram son solo texto, sin links reales.
// se muestra en todas las paginas (esta fuera del Routes en App.jsx)

import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      {/* credito del autor */}
      <p>Sitio realizado por Alex Quiñones</p>

      {/* redes sociales (todavia sin links funcionales) */}
      <nav>
        <ul className="footer-list">
          <li>Whatsapp</li>
          <li>Instagram</li>
        </ul>
      </nav>
    </footer>
  );
};
