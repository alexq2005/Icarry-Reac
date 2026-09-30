/*------------------------------------------------------------*/
/*                     pie de pagina                           */
/*------------------------------------------------------------*/
// pie de pagina con mi nombre y las redes.
// se muestra en todas las paginas (esta fuera del Routes en App.jsx)

import "./Footer.css"

export const Footer = () => {
    const socialLinks = ["Whatsapp", "Instagram"]

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
