import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache, ApolloProvider, ApolloLink, concat, HttpLink } from '@apollo/client';
import { ApolloClient } from 'apollo-boost';
import './index.css';


import { AuthProvider } from './AuthProvider';

require('dotenv').config('./.env');

const apolloLink = new ApolloLink((operation, forward) => {

  operation.setContext({
    headers: {
      authorization: localStorage.getItem('ab_auth') ? `Bearer ${localStorage.getItem('ab_auth')}` : "",
      refresh_token: localStorage.getItem('ab_auth_refresh') ? `Bearer ${localStorage.getItem('ab_auth_refresh')}` : ""
    }
  });

  return forward(operation);

});

const httpLink = new HttpLink({ uri: 'https://airbooking-backend.herokuapp.com/graphql' });

const client = new ApolloClient({

  link: concat(apolloLink, httpLink),
  cache: new InMemoryCache(),
 

});

ReactDOM.render(

  <ApolloProvider client={client}>

    <AuthProvider />

  </ApolloProvider>

  , document.getElementById('root')
);

