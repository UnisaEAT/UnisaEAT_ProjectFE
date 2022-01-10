import "../../styles/VisualizzazioneMenu.css"
import React from 'react'

export class Categorie extends React.Component {

    render() {
        return (
            <div className="btn-container">
                {this.props.categorie.map((categoria, i) => {
                    return (
                        <button
                            type="button"
                            className="categories-btn"
                            key={i}
                            onClick={() => this.props.filterItems(categoria)}
                        >
                            {categoria}
                        </button>
                    );
                })}

            </div>
        );
    }
}
export default Categorie