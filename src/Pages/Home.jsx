import Greetings from "../components/Greetings";
import UserCard from "../components/UserCard";

const visitorName = window.prompt('Qual o seu nome?') || "Visitante";

const team = [
    {
        id: 1,
        name: 'Mauricinho',
        age: 25,
        profession: 'Desenvolvedora Front-end',
        avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
        isMentor: true,
        focus: 'Componentes e acessibilidade',
    },
    {
        id: 2,
        name: 'Mirian da Mary Kay',
        age: 23,
        profession: 'Desenvolvedor Back-end',
        avatarUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
        focus: 'Integração entre serviços',
    },
    {
        id: 3,
        name: 'Gilvan da Silva Feitoza',
        age: 42,
        profession: 'Analista de qualidade',
        avatarUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
        focus: 'Testes e experiência do usuário',
    },
];

function Home() {
    return(
        <>
            <Greetings nome={visitorName}/>

            <section id="equipe">
                <div className="section-heading">
                    <div>
                        <span className="section-label">Capital Humano</span>
                        <h2>Conheça nossa equipe</h2>
                    </div>
                    <span className="counter"></span>
                </div>
                <div className="team-grid">
                    {team.map((person) => (
                        <UserCard key={person.id} {...person}>
                            <p className="card-note">Foco: {person.focus}</p>
                        </UserCard>
                    ))}
                </div>
            </section>
        </>
    );
}
export default Home;