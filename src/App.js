import React, { Component } from 'react';
import Country from './components/Country';
import './App.css';

class App extends Component {
    state = {
        countries: [
            { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
            { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
            { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
        ],
        medals: [
            { id: 1, name: 'gold' },
            { id: 2, name: 'silver' },
            { id: 3, name: 'bronze' },
        ]
    }
    handleIncrement = (countryId, medalName) => {
        const countries = [...this.state.countries];
        const idx = countries.findIndex(c => c.id === countryId);
        countries[idx][medalName] += 1;
        this.setState({ countries: countries });
    }
    handleDecrement = (countryId, medalName) => {
        const countries = [...this.state.countries];
        const idx = countries.findIndex(c => c.id === countryId);
        countries[idx][medalName] -= 1;
        this.setState({ countries: countries });
    }
    getAllMedalsTotal() {
        let sum = 0;
        this.state.medals.forEach(medal => { sum += this.state.countries.reduce((a, b) => a + b[medal.name], 0); });
        return sum;
    }
    render() {
        return (
            <React.Fragment>
                <div className='appHeading'>
                    Olympic Medals
                    <span className='badge'>
                        {this.getAllMedalsTotal()}
                    </span>
                </div>
                <div className='countries'>
                    {this.state.countries.map(country =>
                        <Country
                            key={country.id}
                            country={country}
                            medals={this.state.medals}
                            onIncrement={this.handleIncrement}
                            onDecrement={this.handleDecrement} />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default App;
