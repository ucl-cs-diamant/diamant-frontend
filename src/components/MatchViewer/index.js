import React from "react";
import './style.sass'

class GameBoard extends React.Component {
    render() {
        return (
            <h3>I'm a game board</h3>
        );
    }
}

export class MatchViewer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            gameStep: 0,
            totalGameSteps: 0,
            gameEvents: [],
        }
    }

    handleChange = (event) => {
        // console.log(event.target.value)
        this.setState({gameStep: event.target.value})
    }

    setGameStep = (gameStep) => {
        this.setState({gameStep: gameStep})
    }

    componentDidMount() {
        fetch("http://localhost:8727/match_history/2608/")
            .then(res => res.json())
            .then(
                (result_json) => {
                    console.log(result_json);
                    let match_events = result_json["match_events"];
                    this.setState({totalGameSteps: match_events.length, gameEvents: match_events})
                }
            );
    }

    render() {
        return (
            <div>
                <h1>testing hello this is a match viewer</h1>
                <div>
                    <input type="range" min={1} max={this.state.totalGameSteps} value={this.state.gameStep}
                           className={"gameStepSlider"}
                           onChange={this.handleChange}/>
                    <span>{this.state.gameStep}</span>/<span>{this.state.totalGameSteps}</span>
                </div>

                <div className={"events_container"}>
                    <ul>
                        {this.state.gameEvents.map((e, index) =>
                            <li key={index}>
                                <button onClick={() => this.setGameStep(index)} className={`${e["event_type"]}`} >
                                    <div>`${e["event_type"]}</div>
                                    <div>{`${JSON.stringify(e["content"])}`}</div>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>


                <br/>
                <GameBoard/>
            </div>
        );
    }
}
