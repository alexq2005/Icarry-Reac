/* -------------------------------------------------------------------------- */
/*   EN EL PIE DE PÁGINA MUESTRO EL CRÉDITO DEL SITIO Y LAS REDES SOCIALES    */
/* -------------------------------------------------------------------------- */

import "./Footer.css";
import whatsappLogo from "../../assets/whatsapp.png";
import instagramLogo from "../../assets/instagram.png";

export const Footer = () => {
  /* -------------------------------------------------------------------------- */
  /*               GUARDO LOS NOMBRES QUE VOY A MOSTRAR EN EL PIE               */
  /* -------------------------------------------------------------------------- */
  const socialLinks = [
    { name: "Whatsapp", logo: whatsappLogo },
    { name: "Instagram", logo: instagramLogo },
  ];

  return (
    <footer>
      {/* -------------------------------------------------------------------------- */}
      {/*                       MUESTRO QUIÉN REALIZÓ EL SITIO                       */}
      {/* -------------------------------------------------------------------------- */}
      <p>Sitio realizado por Alex Quiñones</p>

      {/* -------------------------------------------------------------------------- */}
      {/*               MUESTRO EL LOGO Y EL NOMBRE DE CADA RED SOCIAL               */}
      {/* -------------------------------------------------------------------------- */}
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
