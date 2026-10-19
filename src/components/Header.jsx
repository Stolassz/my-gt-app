import style from './Header.module.css'

export function Header({ brand, description, children }) {
    return(
        <header className={style.header}>
            <div className={style.brand}>
                <span className={style.logo}>GT</span>
                <div>
                    <strong>{brand}</strong>
                    <span>{description}</span>
                </div>
            </div>
            <nav className={style.navigation} aria-label='Navegação principal'>
                {children}
            </nav>
        </header>
    );
}
