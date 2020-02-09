import React from 'react';

type ClockState = { start: Date, date: Date, timerID: number }
type ClockProps = {}
class Clock extends React.Component {
    state: ClockState = { start: new Date(), date: new Date(), timerID: 0 }
    constructor(props: ClockProps) {
        super(props);

        this.state.start = new Date();
        this.state.date = new Date();

    }

    componentDidMount() {
        this.setState({
            timerID: setInterval(
                () => this.tick(),
                1000
            )
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>State Example</h1>
                <h2>Alivetime: {(new Date(this.state.date.valueOf() - this.state.start.valueOf()).valueOf() / 1000).toFixed()} seconds.</h2>
            </div>
        );
    }
}

export default Clock;