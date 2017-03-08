
const ghc = require('./githubClient');
const http = require('http');
const _ = require('lodash');

require('dotenv').load({ path: '../local.env' });

const githubCliEnterprise = new ghc.GitHubClient({
  baseUri: 'https://api.github.com',
  token: process.env.GITHUB_TOKEN
});

const handle = process.env.GITHUB_HANDLE;
const PORT = 7203;

function handleRequest(request, response) {
  githubCliEnterprise.getData({ path: `/users/${handle}/repos` })
    .then(res => {
      const repos = _.map(res.data, repo => repo.name);
      console.log(repos);
      return response.end(JSON.stringify(repos));
    })
    .catch(e => {
      console.log('error', e);
    });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT);
});

githubCliEnterprise.getData({ path: `/users/${handle}/repos` })
  .then(res => {
    res.data.forEach((repo) => {
      console.log(repo.name);
    });
    return null;
  })
  .catch(e => {
    console.log('error', e);
  });
