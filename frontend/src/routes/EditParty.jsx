import partyFetch from '../axios/config';

import { useState, useEffect } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import notify from '../utils/notify';

import './Form.css';

const EditParty = () => {
  const { id } = useParams();

  const [party, setParty] = useState(null);
  const [services, setServices] = useState([]);
  const [errorType, setErrorType] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const navigate = useNavigate();

  // Carrega os dados da festa e os serviços disponíveis
  useEffect(() => {
    const loadData = async () => {
      try {
        setParty(null);
        setErrorType(null);

        const [partyResponse, servicesResponse] = await Promise.all([
          partyFetch.get(`/parties/${id}`),
          partyFetch.get('/services'),
        ]);

        setParty(partyResponse.data);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);

        const status = error.response?.status;

        // 404 (não existe) e 400 (ID inválido): a festa não pode ser carregada
        if (status === 404 || status === 400) {
          setErrorType('not-found');
        } else {
          setErrorType('failure');
        }

        notify('Não foi possível carregar os dados da festa.', 'error');
      }
    };

    loadData();
  }, [id, reloadKey]);

  // Tenta carregar os dados novamente
  const handleRetry = () => {
    setReloadKey((previous) => previous + 1);
  };

  // Atualiza os campos da festa
  const handleChange = (e) => {
    const { name, value } = e.target;

    setParty((previousParty) => ({
      ...previousParty,
      [name]: value,
    }));
  };

  // Adiciona ou remove serviços
  const handleServices = (e, service) => {
    const checked = e.target.checked;

    setParty((previousParty) => {
      let updatedServices;

      if (checked) {
        const alreadySelected = previousParty.services.some(
          (item) => item._id === service._id
        );

        if (alreadySelected) {
          return previousParty;
        }

        updatedServices = [...previousParty.services, service];
      } else {
        updatedServices = previousParty.services.filter(
          (item) => item._id !== service._id
        );
      }

      return {
        ...previousParty,
        services: updatedServices,
      };
    });
  };

  // Salva as alterações
  const updateParty = async (e) => {
    e.preventDefault();

    try {
      const res = await partyFetch.put(
        `/parties/${party._id}`,
        party
      );

      if (res.status === 200) {
        notify('Festa atualizada com sucesso!');
        navigate(`/party/${id}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar festa:', error);

      const message =
        error.response?.data?.msg ||
        'Não foi possível atualizar a festa.';

      notify(message, 'error');
    }
  };

  // Festa inexistente ou ID inválido
  if (errorType === 'not-found') {
    return (
      <div className="party-error">
        <h2>Esta festa não existe ou foi excluída.</h2>

        <p>Confira o endereço ou volte para a lista de festas.</p>

        <Link to="/" className="btn">
          Voltar para minhas festas
        </Link>
      </div>
    );
  }

  // Falha de conexão ou erro do servidor
  if (errorType === 'failure') {
    return (
      <div className="party-error">
        <h2>Não foi possível carregar esta festa.</h2>

        <p>Verifique sua conexão e tente novamente.</p>

        <button
          type="button"
          className="btn"
          onClick={handleRetry}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  // Carregamento
  if (!party) {
    return (
      <div className="home-loading">
        <p>Carregando informações da festa...</p>
      </div>
    );
  }

  return (
    <div className="form-page form-page-edit">

      {/* Cabeçalho */}
      <header className="form-header">
        <span className="form-subtitle">GERENCIE SEU EVENTO</span>

        <h1>Editando: {party.title}</h1>

        <p>
          Ajuste as informações e os serviços contratados para sua festa.
        </p>
      </header>

      <form className="party-form" onSubmit={updateParty}>

        {/* Informações principais */}
        <section className="form-section">

          <div className="form-section-heading">
            <span className="form-section-number">01</span>

            <div>
              <h2>Informações da festa</h2>
              <p>Atualize os dados principais do seu evento.</p>
            </div>
          </div>

          <div className="form-fields">

            <label>
              <span>Nome da festa</span>

              <input
                type="text"
                name="title"
                placeholder="Nome da festa"
                required
                value={party.title}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Anfitrião</span>

              <input
                type="text"
                name="author"
                placeholder="Nome do responsável"
                required
                value={party.author}
                onChange={handleChange}
              />
            </label>

            <label className="form-field-full">
              <span>Descrição</span>

              <textarea
                name="description"
                placeholder="Conte mais sobre sua festa..."
                required
                rows="4"
                value={party.description}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Orçamento (R$)</span>

              <input
                type="number"
                name="budget"
                min="0"
                required
                value={party.budget}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Imagem do evento</span>

              <input
                type="text"
                name="image"
                placeholder="URL da imagem"
                required
                value={party.image}
                onChange={handleChange}
              />
            </label>

          </div>
        </section>

        {/* Serviços */}
        <section className="form-section services-section">

          <div className="form-section-heading">
            <span className="form-section-number">02</span>

            <div>
              <h2>Serviços contratados</h2>
              <p>
                Selecione ou remova os serviços da sua festa.
              </p>
            </div>
          </div>

          <div className="services-container">

            {services.length === 0 && (
              <p className="services-empty">
                Nenhum serviço disponível no momento.
              </p>
            )}

            {services.map((service) => {
              const isSelected = party.services.some(
                (item) => item._id === service._id
              );

              return (
                <label
                  className={`service ${
                    isSelected ? 'service-selected' : ''
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
                        checked={isSelected}
                        onChange={(e) => handleServices(e, service)}
                      />

                      <span>
                        {isSelected
                          ? 'Selecionado'
                          : 'Selecionar serviço'}
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}

          </div>
        </section>

        {/* Ações */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn form-submit-button"
          >
            Salvar alterações
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditParty;