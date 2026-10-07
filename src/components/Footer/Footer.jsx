/*------------------------------------------------------------*/
/*                     pie de pagina                           */
/*------------------------------------------------------------*/
/* Pie de pagina con el credito del autor y las redes.
   Se muestra en todas las paginas (fuera de Routes en App.jsx). */

import "./Footer.css"

export const Footer = () => {
    /*----- datos -----*/
    const socialLinks = ["Whatsapp", "Instagram"]

    /*----- UI -----*/
    return (
        <footer>
            <p>Sitio realizado por Alex Quiñones</p>

            <nav aria-label="Redes sociales">
                <ul className="nav-list">
                    {socialLinks.map((socialName) => (
                        <li key={socialName}>
                        <span className="social-name">{socialName}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    )
}
