import React from 'react';
import ReactPaginate from "react-paginate";

class PlayerHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      email_address: '',
      github_username: '',
      student_id: '',

      mmr: '',
      games_played: '',

      commit_time: '',
      has_failed: '',

      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  load_match_history() {
    fetch(
      `http://192.168.135.128:8000/users/2/user_match_list/?format=json&limit=${this.state.perPage}&offset=${this.state.offset}`
    )
      .then((response) => response.json())
      .then((data) => {
        const match_history = data.results.map((match) => (
          <li key={match.match_id}>
            <a href={match.url}>{match.url}</a>
          </li>
        ));

        this.setState({
          pageCount: Math.ceil(data.count / this.state.perPage),

          match_history,
        });
      });
  }

  handlePageClick(e) {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.load_match_history();
      }
    );
  }

  componentDidMount() {
    fetch('http://192.168.135.128:8000/users/2/?format=json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ email_address: data.email_address });
        this.setState({ github_username: data.github_username });
        this.setState({ student_id: data.student_id });
      });
    fetch('http://192.168.135.128:8000/users/2/performance_list/?format=json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ user_name: data[0].user_name });
        this.setState({ mmr: data[0].mmr });
        this.setState({ games_played: data[0].games_played });
      });
    fetch('http://192.168.135.128:8000/users/2/user_code_list/?format=json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          commit_time: Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(new Date(data[0].commit_time)),
        });
        this.setState({ has_failed: data[0].has_failed });
      });
    this.load_match_history();
  }

  render() {
    return (
      <div>
        <h1>
          Hello, {this.state.user_name}
          <br />
          Email: {this.state.email_address}
          <br />
          Github: {this.state.github_username}
          <br />
          Student ID: {this.state.student_id}
          <br />
        </h1>
        <h2>Last committed at {this.state.commit_time.toString()}</h2>
        <p>Current Elo : {this.state.mmr}</p>
        <p>Games Played : {this.state.games_played}</p>
        <p>Match History:</p>
        <div>
          <ul>{this.state.match_history}</ul>
          <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
        <p>Code Failing: {this.state.has_failed.toString()}</p>
      </div>
    );
  }
}

export default PlayerHome;
