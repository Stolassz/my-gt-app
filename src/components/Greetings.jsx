import './Greetings.css'

function Greetings({nome, mensagem = "Seja bem vindo(a)!"}) {
    return(
        <div className="greeting">
            <span className="greeting__eyebrow">React - Primeiros Passos</span>
            <h1>{nome}, {mensagem}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, mollitia? Tempore facere culpa neque, eaque ducimus corrupti? Ipsa voluptatum aliquid temporibus itaque. Alias quia obcaecati, quas sed quod ad voluptates!</p>
        </div>
    );
}
export default Greetings;