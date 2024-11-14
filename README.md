# Mon Ami API Reference Implementation

## Getting Started

- Install [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
- Install [Ngrok](https://ngrok.com/docs/getting-started/)

```
$ git clone git@github.com:mes-amis/monami-api-js-reference-implementaion.git
$ cd monami-api-js-reference-implementaion
$ cp .env.example .env      # then add your API Credentials to `.env`.
$ npm install               # installs dependencies.
```

## Basic Usage

```
$ npx jake                               # Print example operations.
$ jake api:clients:list                  # List a existing clients
$ jake api:clients:find[id]              # Find an existing client
$ jake api:clients:create                # Create a new client
$ jake api:screenings:list               # List completed screening requests
$ jake api:screenings:create[client_id]  # Create a new screening request
$ jake api:screenings:show[request_id]   # Get a screening request by id
$ jake api:webhooks:create[webhook_host] # Create a new webhook subscription
```

## To receive Webhooks

```
$ ngrok http http://localhost:3000                           # Start an ngrok tunnel
$ npx jake "api:webhooks:create[ADDRESS_ASSIGNED_BY_NGROK]"  # Register a webhook subscription
$ node index.js                                              # Start the webhook server
```
