import partyFetch from "../axios/config";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [parties, setParties] = useState(null);

  useEffect(() => {
    const loadParties = async () => {
      try {
        const res = await partyFetch.get("/parties");
        setParties(res.data);
      } catch (error) {
        console.error("Erro ao carregar as festas:", error);
        setParties([]);
      }
    };

    loadParties();
  }, []);

  if (parties === null) {
    return (
      <div className="home-loading">
        <p>Carregando suas festas...</p>
      </div>
    );
  }

  return (
    <div className="home">

      {/* Cabeçalho da página */}
      <header className="home-header">
        <div className="home-heading">
          <span className="home-subtitle">SEU ESPAÇO DE EVENTOS</span>

          <h1>Minhas Festas</h1>

          <p>
            Organize seus eventos e transforme momentos especiais
            em experiências inesquecíveis.
          </p>
        </div>

        <Link to="/party/new" className="btn home-create-button">
          + Criar festa
        </Link>
      </header>

      {/* Resumo dos eventos */}
      <section className="home-summary">
        <div className="summary-card">
          <span className="summary-label">EVENTOS CADASTRADOS</span>

          <strong className="summary-value">
            {parties.length.toString().padStart(2, "0")}
          </strong>

          <span className="summary-description">
            {parties.length === 1
              ? "Festa organizada"
              : "Festas organizadas"}
          </span>
        </div>
      </section>

      {/* Lista de festas */}
      <section className="home-parties">
        <div className="section-heading">
          <div>
            <h2>Seus eventos</h2>

            <p>Acompanhe e gerencie suas festas.</p>
          </div>

          <span className="parties-count">
            {parties.length} {parties.length === 1 ? "evento" : "eventos"}
          </span>
        </div>

        {parties.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <span>+</span>
            </div>

            <h3>Nenhuma festa cadastrada</h3>

            <p>
              Que tal começar organizando seu primeiro evento?
            </p>

            <Link to="/party/new" className="btn">
              Criar minha primeira festa
            </Link>
          </div>
        ) : (
          <div className="parties-container">
            {parties.map((party) => (
              <article className="party-card" key={party._id}>
                <div className="party-image-container">
                  <img
                    src={party.image}
                    alt={`Imagem de ${party.title}`}
                    className="party-image"
                  />
                </div>

                <div className="party-card-content">
                  <h3>{party.title}</h3>

                  <Link
                    to={`/party/${party._id}`}
                    className="party-details-link"
                  >
                    Ver detalhes
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;