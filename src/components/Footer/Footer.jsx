/* En el pie de página muestro el crédito del sitio y las redes sociales. */

import "./Footer.css";
import whatsappLogo from "../../assets/whatsapp.png";
import instagramLogo from "../../assets/instagram.png";

export const Footer = () => {
  /* Guardo los nombres que voy a mostrar en el pie. */
  const socialLinks = [
    { name: "Whatsapp", logo: whatsappLogo },
    { name: "Instagram", logo: instagramLogo },
  ];

  return (
    <footer>
      {/* Muestro quién realizó el sitio. */}
      <p>Sitio realizado por Alex Quiñones</p>

      {/* Muestro el logo y el nombre de cada red social. */}
      <nav aria-label="Redes sociales">
        <ul className="nav-list">
          {socialLinks.map((social) => (
            <li key={social.name}>
              <img className="social-logo" src={social.logo} alt="" />
              <span className="social-name">{social.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
