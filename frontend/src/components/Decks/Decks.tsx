import './Decks.scss';

const Decks = () => {
    return (
        <div className="decks-container">
            <div className="decks-box">
                <h1 className="decks-title">Deck Builder</h1>
                <p className="decks-text">Create and manage your favorite decks.</p>
                <div className="decks-actions">
                    <button className="decks-button">New Deck</button>
                    <button className="decks-button">Saved Decks</button>
                    <button className="decks-button">Import Deck</button>
                </div>
            </div>
        </div>
    );
};

export default Decks;
