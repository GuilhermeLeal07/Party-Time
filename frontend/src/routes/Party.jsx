import partyFetch from '../axios/config';

import { useState, useEffect } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';

import notify from '../utils/notify';

import './Party.css';

const Party = () => {
  const { id } = useParams();

  const [party, setParty] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const navigate = useNavigate();

  // Carrega os dados da festa
  useEffect(() => {
    const loadParty = async () => {
      try {
        setParty(null);
        setErrorType(null);

        const res = await partyFetch.get(`/parties/${id}`);

        setParty(res.data);
      } catch (error) {
        console.error('Erro ao carregar festa:', error);

        const status = error.response?.status;

        // 404 (não existe) e 400 (ID inválido): a festa não pode ser carregada
        if (status === 404 || status === 400) {
          setErrorType('not-found');
        } else {
          setErrorType('failure');
        }
      }
    };

    loadParty();
  }, [id, reloadKey]);

  // Tenta carregar a festa novamente
  const handleRetry = () => {
    setReloadKey((previous) => previous + 1);
  };

  // Exclui a festa
  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Tem certeza de que deseja excluir esta festa? Essa ação não poderá ser desfeita.'
    );

    if (!confirmed) return;

    try {
      const res = await partyFetch.delete(`/parties/${id}`);

      if (res.status === 200) {
        notify(res.data.msg);
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao excluir festa:', error);

      const message =
        error.response?.data?.msg ||
        'Não foi possível excluir a festa.';

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
    <div className="party-page">

      {/* Cabeçalho */}
      <header className="party-header">
        <div>
          <span className="party-subtitle">DETALHES DO EVENTO</span>

          <h1>{party.title}</h1>

          <p>Confira todas as informações da sua festa.</p>
        </div>

        <div className="actions-container">
          <Link
            to={`/party/edit/${party._id}`}
            className="btn"
          >
            Editar festa
          </Link>

          <button
            onClick={handleDelete}
            className="btn-danger"
            type="button"
          >
            Excluir festa
          </button>
        </div>
      </header>

      {/* Imagem principal */}
      <section className="party-hero">
        <img
          src={party.image}
          alt={`Imagem de ${party.title}`}
          className="party-main-image"
        />
      </section>

      {/* Informações da festa */}
      <section className="party-information">

        <div className="party-description">
          <span className="party-section-label">
            SOBRE O EVENTO
          </span>

          <h2>{party.title}</h2>

          <p className="party-author">
            Organizado por <strong>{party.author}</strong>
          </p>

          <p className="party-description-text">
            {party.description}
          </p>
        </div>

        <div className="party-budget-card">
          <span>ORÇAMENTO DISPONÍVEL</span>

          <strong>
            {Number(party.budget).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>

          <p>Valor definido para a organização do evento.</p>
        </div>

      </section>

      {/* Serviços contratados */}
      <section className="party-services-section">

        <div className="party-section-heading">
          <div>
            <span className="party-section-label">
              PLANEJAMENTO
            </span>

            <h2>Serviços contratados</h2>

            <p>Confira os serviços escolhidos para sua festa.</p>
          </div>

          <span className="party-services-count">
            {party.services.length}{' '}
            {party.services.length === 1 ? 'serviço' : 'serviços'}
          </span>
        </div>

        {party.services.length === 0 ? (
          <div className="party-empty-services">
            <h3>Nenhum serviço contratado</h3>

            <p>
              Você ainda não selecionou serviços para esta festa.
            </p>
          </div>
        ) : (
          <div className="party-services-grid">

            {party.services.map((service) => (
              <article
                className="party-service-card"
                key={service._id}
              >
                <img
                  src={service.image}
                  alt={service.name}
                />

                <div className="party-service-content">
                  <h3>{service.name}</h3>

                  <span>
                    {Number(service.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
              </article>
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default Party;