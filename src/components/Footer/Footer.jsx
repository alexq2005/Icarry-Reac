/* En el pie de página muestro el crédito del sitio y las redes sociales. */

import "./Footer.css"

export const Footer = () => {
    /* Guardo los nombres que voy a mostrar en el pie. */
    const socialLinks = ["Whatsapp", "Instagram"]

    return (
        <footer>
            {/* Muestro quién realizó el sitio. */}
            <p>Sitio realizado por Alex Quiñones</p>

            {/* Muestro los nombres de las redes sociales. */}
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