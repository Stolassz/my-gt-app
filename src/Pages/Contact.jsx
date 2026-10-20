import { useEffect, useState } from 'react';
import './Contact.css'

const initialForm = {
    cep: '',
    street: '',
    neighborhood: '',
    state: '',
    city: '',
    number: '',
    message: ''
};

export default function Contact() {
    const [form, setForm] = useState(initialForm);

    const [status, setStatus] = useState({ type: '', message: '' });

    const [loadingCep, setLoadingCep] = useState(false);

    const [states, setStates] = useState([]);

    const [cities, setCities] = useState([]);

    async function searchCep() {
        const cleanCep = form.cep.replace(/\D/g, '');
        
        if (cleanCep.length !== 8) {
            setStatus({ type: 'error', message: 'Digite um CEP válido!' })
        };

        setLoadingCep(true);

        try {   
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            if (!response.ok) throw new Error('Falha na busca do CEP!');

            const address = await response.json();
            if (address.erro) throw new Error('CEP não encontrado!')

            setForm((current) => ({...current,
                cep: cleanCep,
                street: address.logradouro || '',
                neighborhood: address.bairro || '',
                state: address.estado || '',
                city: address.localidade || ''
            }));

            setStatus({ type: 'success', message: 'Endereço encontrado!' });

        } catch (erro) {
            setStatus({ type: 'error', message: erro.message });
        } finally {
            setLoadingCep(false);
        };

    };

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then((response) => {
            if (!response.ok) throw new Error();
            
            return response.json();
        })

        .then(setStates)
        .catch(() => setStatus({ type: 'error', message: 'Não foi possível carregar os estados'}))
    }, []);
   
    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome').then((response) => {
            if (!response.ok) throw new Error();
            
            return response.json();
        })

        .then(setCities)
        .catch(() => setStatus({ type: 'error', message: 'Não foi possível carregar as cidades'}))
    }, []);

    function handleChange (event) {
        const {name, value} = event.target;

        setForm((current) => ({...current, [name]: value}));
    };

    return (
        <section className="contact-page">
            <span className="section-label">Fale com a gente</span>

            <h1>Entre em contato</h1>

            <p className="page-intro">Consulte o CEP para completar seu endereço e escolha uma cidade carregada pela API do IBGE.</p>

            <form className="contact-form">
                <div className="form-section">
                    <h2>Endereço</h2>

                    <div className="form-grid">
                        <label>CEP
                            <div className="cep-field">
                                <input 
                                    name="cep"
                                    value={form.cep}
                                    onChange={handleChange}
                                    // onChange={(e) => (setForm((current) => ({current, cep: e.target.value})))}
                                    inputMode="numeric"
                                    placeholder="00000-000" 
                                />
                                
                                <button type="button" onClick={searchCep} disabled={loadingCep}>
                                    {loadingCep ? 'Buscando...' : 'Buscar CEP'} 
                                </button>

                            </div>

                        </label>
                        <label>Estado
                            <select 
                                name="state" 
                                value={form.state}
                                onChange={handleChange}
                            >
                                <option>Selecione um Estado</option>
                                {states.map((state) => <option key={state.id} value={state.nome}> {state.nome}</option>)}
                            </select>

                        </label>

                        <label>Cidade
                            <select 
                                name="city" 
                                value={form.city}
                                onChange={handleChange}
                            >
                                <option>Selecione uma Cidade</option>
                                {cities.map((city) => <option key={city.id} value={city.nome}> {city.nome}</option>)}
                            </select>

                        </label>

                        <label>Rua
                            <input 
                                name="street" 
                                placeholder="Nome da rua" 
                                value={form.street}
                                onChange={handleChange}
                            />

                        </label>

                        <label>Número
                            <input 
                                name="number" 
                                placeholder="123" 
                            />

                        </label>

                        <label>Bairro
                            <input 
                                name="neighborhood" 
                                placeholder="Seu bairro" 
                                value={form.neighborhood}
                                onChange={handleChange}

                            />

                        </label>

                    </div>

                </div>

                <label>Mensagem
                    <textarea 
                        name="message" 
                        rows="5" 
                        placeholder="Como podemos ajudar?" 
                    />

                </label>

                <button className="submit-button" type="submit">Enviar mensagem</button>

            </form>

        </section>
    );
};