import partyFetch from '../axios/config';

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import notify from '../utils/notify';

import './Form.css';

const CreateParty = () => {
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState('');

  const [partyServices, setPartyServices] = useState([]);

  const navigate = useNavigate();

  // Carrega os serviços disponíveis
  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await partyFetch.get('/services');

        setServices(res.data);
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
        notify('Não foi possível carregar os serviços.', 'error');
      }
    };

    loadServices();
  }, []);

  // Adiciona ou remove serviços da festa
  const handleServices = (e, service) => {
    const checked = e.target.checked;

    if (checked) {
      setPartyServices((prevServices) => {
        const alreadySelected = prevServices.some(
          (item) => item._id === service._id
        );

        if (alreadySelected) {
          return prevServices;
        }

        return [...prevServices, service];
      });
    } else {
      setPartyServices((prevServices) =>
        prevServices.filter((item) => item._id !== service._id)
      );
    }
  };

  // Cria uma nova festa
  const createParty = async (e) => {
    e.preventDefault();

    try {
      const party = {
        title,
        author,
        description,
        budget,
        image,
        services: partyServices,
      };

      const res = await partyFetch.post('/parties', party);

      if (res.status === 201) {
        notify(res.data.msg);
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao criar evento:', error);

      const message =
        error.response?.data?.msg ||
        'Não foi possível criar o evento.';

      notify(message, 'error');
    }
  };

  return (
    <div className="form-page form-page-create">

      {/* Cabeçalho */}
      <header className="form-header">
        <span className="form-subtitle">ORGANIZE SEU EVENTO</span>

        <h1>Criar nova festa</h1>

        <p>
          Preencha as informações do seu evento e escolha os
          serviços que farão parte dessa experiência.
        </p>
      </header>

      {/* Formulário */}
      <form className="party-form" onSubmit={createParty}>

        {/* Informações principais */}
        <section className="form-section">
          <div className="form-section-heading">
            <span className="form-section-number">01</span>

            <div>
              <h2>Informações da festa</h2>
              <p>Conte um pouco sobre o evento que está organizando.</p>
            </div>
          </div>

          <div className="form-fields">

            <label>
              <span>Nome da festa</span>

              <input
                type="text"
                placeholder="Ex.: Aniversário de 30 anos"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>

            <label>
              <span>Anfitrião</span>

              <input
                type="text"
                placeholder="Nome do responsável pela festa"
                required
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
            </label>

            <label className="form-field-full">
              <span>Descrição</span>

              <textarea
                placeholder="Conte mais sobre a festa, o tema e os detalhes do evento..."
                required
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </label>

            <label>
              <span>Orçamento (R$)</span>

              <input
                type="number"
                min="0"
                placeholder="Quanto pretende investir?"
                required
                onChange={(e) => setBudget(e.target.value)}
                value={budget}
              />
            </label>

            <label>
              <span>Imagem do evento</span>

              <input
                type="text"
                placeholder="Insira a URL de uma imagem"
                required
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>

          </div>
        </section>

        {/* Seleção de serviços */}
        <section className="form-section services-section">

          <div className="form-section-heading">
            <span className="form-section-number">02</span>

            <div>
              <h2>Escolha os serviços</h2>
              <p>
                Selecione os serviços que deseja contratar para sua festa.
              </p>
            </div>
          </div>

          <div className="services-container">

            {services.length === 0 && (
              <p className="services-empty">
                Nenhum serviço disponível no momento.
              </p>
            )}

            {services.map((service) => (
              <label
                className={`service ${
                  partyServices.some(
                    (item) => item._id === service._id
                  )
                    ? 'service-selected'
                    : ''
                }`}
                key={service._id}
              >
                <img
                  src={service.image}
                  alt={service.name}
                />

                <div className="service-content">
                  <span className="service-name">
                    {service.name}
                  </span>

                  <span className="service-price">
                    R$ {service.price}
                  </span>

                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      checked={partyServices.some(
                        (item) => item._id === service._id
                      )}
                      onChange={(e) => handleServices(e, service)}
                    />

                    <span>
                      {partyServices.some(
                        (item) => item._id === service._id
                      )
                        ? 'Selecionado'
                        : 'Selecionar serviço'}
                    </span>
                  </div>
                </div>
              </label>
            ))}

          </div>
        </section>

        {/* Ação de criação */}
        <div className="form-actions">
          <button type="submit" className="btn form-submit-button">
            Criar minha festa
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateParty;