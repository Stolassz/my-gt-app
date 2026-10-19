import { Link } from 'react-router-dom';
import style from './Header.module.css'

export function Header({ brand, description, children }) {
    return(
        <header className={style.header}>
            <Link className={style.brand} to="/">

                <span className={style.logo}>GT</span>

                <div>
                    <strong>{brand}</strong>

                    <span>{description}</span>

                </div>
            </Link>

            <nav className={style.navigation} aria-label='Navegação principal'>
                {children}

            </nav>

        </header>
    );
}
