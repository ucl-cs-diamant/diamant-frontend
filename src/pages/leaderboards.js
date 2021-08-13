import React from "react"
import ReactPaginate from 'react-paginate';

class Leaderboards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount: 0,
        };

        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    load_user_elos() {
        fetch(`http://192.168.135.128:8000/user_performances/?format=json&limit=${this.state.perPage}&offset=${this.state.offset}`)
            .then(response => response.json())
            .then(data => {
                    const main_leaderboard = data.results.map(user => <li key={user.pk}><a href={user.user}>{user.user_name}:</a><p>{user.mmr}</p></li>)
                console.log(data)
                    this.setState({
                        pageCount: Math.ceil(data.count / this.state.perPage),

                        main_leaderboard
                    })
                }
            );
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.load_user_elos()
        });

    };

    componentDidMount() {
        this.load_user_elos()
    }

    render() {
        return (<div>
            <div>
                <ul>{this.state.main_leaderboard}</ul>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
    </div>)
    }
}

export default Leaderboards
