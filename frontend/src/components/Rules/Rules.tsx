import './Rules.scss';

const Rules = () => {
    return (
        <div className="rules-container">
            <div className="rules-box">
                <h1 className="rules-title">Rule Finder</h1>
                <p className="rules-text">Search for specific rules from Gloomhaven.</p>
                <input type="text" placeholder="Search rules..." className="rules-input" />
                <div className="rules-results">
                    <p>No results yet...</p>
                </div>
            </div>
        </div>
    );
};

export default Rules;
