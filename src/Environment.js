import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

const network = Network.create((operation, variables) => {
  return fetch('/graphql/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
});

const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
});

export default environment;
