/* -------------------------------------------------------------------------- */
/*                       PIE CON EL CREDITO Y LAS REDES                       */
/* -------------------------------------------------------------------------- */

import "./Footer.css";
import whatsappLogo from "../../assets/whatsapp.png";
import instagramLogo from "../../assets/instagram.png";

export const Footer = () => {
  /* -------------------------------------------------------------------------- */
  /*                             REDES CON SU LOGO                              */
  /* -------------------------------------------------------------------------- */
  const socialLinks = [
    { name: "Whatsapp", logo: whatsappLogo },
    { name: "Instagram", logo: instagramLogo },
  ];

  return (
    <footer>
      {/* -------------------------------------------------------------------------- */}
      {/*                             CREDITO DEL SITIO                              */}
      {/* -------------------------------------------------------------------------- */}
      <p>Sitio realizado por Alex Quiñones</p>

      {/* -------------------------------------------------------------------------- */}
      {/*                            UN LINK POR CADA RED                            */}
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
