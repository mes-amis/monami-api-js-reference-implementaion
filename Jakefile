require('dotenv').config()

let { namespace, task, desc } = require('jake');
const axios = require('axios');

task('default', jake.showAllTaskDescriptions);

const baseURL = 'http://app.monami.test/api';

namespace('api', () => {
  namespace('clients', () => {
    desc('List a existing clients');
    task('list', async () => {
      await axios.get(`${baseURL}/clients`, {
        auth: {
          username: process.env.MONAMI_UID,
          password: process.env.MONAMI_SECRET
        }
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch((error) => {
        console.error('Error:', error);
      });
    });

    desc('Find an existing client');
    task('find', async (id) => {
      await axios.get(`${baseURL}/clients/${id}`, {
        auth: {
          username: process.env.MONAMI_UID,
          password: process.env.MONAMI_SECRET
        }
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch((error) => {
        console.error('Error:', error);
      });
    });

    desc('Create a new client');
    task('create', async () => {
      console.log('Running api:clients:create task');
    });
  })

  namespace('screenings', () => {
    desc('List completed screening requests');
    task('list', async () => {
      console.log('Running api:screenings:list task');
    });

    desc('Create a new screening request');
    task('create', async () => {
      console.log('Running api:screenings:create task');
    });

    desc('Get a screening request by id');
    task('show', async () => {
      console.log('Running api:screenings:show task');
    });
  })

  namespace('webhooks', () => {
    desc('Create a new webhook');
    task('create', async () => {
      console.log('Running api:webhooks:create task');
    });
  })
})
