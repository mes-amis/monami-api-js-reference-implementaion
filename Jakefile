require('dotenv').config()

let { namespace, task, desc } = require('jake');
const axios = require('axios');

let baseURL = 'https://app.demo.monami.io/api'

task('default', jake.showAllTaskDescriptions);

let auth = {
  username: process.env.DEMO_MONAMI_UID,
  password: process.env.DEMO_MONAMI_SECRET
}

const printErrorStatusAndBody = (error) => {
  console.error('Error status:', error.response.status);
  console.error(JSON.stringify(error.response.data, null, 2));
}

task('dev', () => {
  baseURL = 'http://app.monami.test/api'

  auth = {
    username: process.env.MONAMI_UID,
    password: process.env.MONAMI_SECRET
  }
})


namespace('api', () => {
  namespace('clients', () => {
    desc('List existing clients');
    task('list', async () => {
      await axios.get(`${baseURL}/clients`, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch(printErrorStatusAndBody);
    });

    desc('Find an existing client');
    task('find', async (id) => {
      await axios.get(`${baseURL}/clients/${id}`, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch(printErrorStatusAndBody);
    });

    desc('Create a new client: try Morris or Burlington as county names');
    task('create', async () => {
      await axios.post(`${baseURL}/clients`, {
        person: {
          first_name: 'Robert',
          last_name: 'Smith',
        },
        address: {
          county: 'Burlington',
        }
      }, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch(printErrorStatusAndBody);
    });
  })

  namespace('screenings', () => {
    desc('List completed screening requests');
    task('list', async () => {
      await axios.get(`${baseURL}/assessments/requests`, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch(printErrorStatusAndBody);
    });

    desc('Create a new screening request');
    task('create', async (client_id) => {
      await axios.post(`${baseURL}/assessments/requests`, {
        client_id: client_id,
        document_name: 'Screen for Consumer Services v1',
        demo_mode: true
      }, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch(printErrorStatusAndBody);
    });

    desc('Get a screening request by id');
    task('show', async (request_id) => {
      await axios.get(`${baseURL}/assessments/requests/${request_id}`, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch(printErrorStatusAndBody);
    });
  })

  namespace('webhooks', () => {
    desc('Create a new webhook subscription');
    task('create', async (webhook_host) => {
      await axios.post(`${baseURL}/webhooks`, {
        topic: 'assessments.request.completed',
        webhook_url: `${webhook_host}/webhooks`
      }, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch(printErrorStatusAndBody);
    });
  })
})
