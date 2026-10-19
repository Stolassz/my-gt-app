import style from './UserCard.module.css';

const UserCard = ({
    name,
    age,
    profession,
    avatarUrl,
    isMentor = false,
    children
}) => {
    return (
        <article className={style.card}>
            <img 
                src={avatarUrl} 
                alt={`Foto de ${name}`}
                className={style.avatar}/>
            <div className={style.content}>
                <div className={style.heading}>
                    <h2>{name}</h2>
                    {isMentor && <span className={style.badge}>Mentor</span>}
                </div>
                <p className={style.profession}>{profession}</p>
                <p className={style.age}>{age} anos</p>
                {children}
            </div>
        </article>
    );
}
export default UserCard;