import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';
class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: 'cba5ba105bd02d0c5450',
            clientSecret: 'a45732c7aebf97aa4cac9245e968e2561b658c4a',
            count: 5,
            sort: 'created:asc',
            repos: []
        }
    }
    componentDidMount() {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;
        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}
       &client_secret=${clientSecret} `).then(res => res.json()).then(data => {
         if(this.refs.myRef){

             this.setState({ repos: data })
         }          
        }).catch(err => console.log(err))
    }
    render() {
        const { repos } = this.state;
        const repoItems = repos.map(repo => (
            <div className="card card-body mb-2" key={repo.id}>
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link href={repo.html_url} className="text-info" target="_blank">{repo.name}</Link>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-info mr-1">
                            Watcher: {repo.watchers_count}
                        </span>
                        <span className="badge badge-info mr-1">
                            Forks: {repo.forks_count}
                        </span>

                    </div>
                </div>
            </div>
        ))
        return (
            <div ref="myRef">
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        );
    }
}
ProfileGithub.propTypes={
    username:PropTypes.string.isRequired
}
export default ProfileGithub;