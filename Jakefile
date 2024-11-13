require('dotenv').config()

let { namespace, task, desc } = require('jake');
const axios = require('axios');

task('default', jake.showAllTaskDescriptions);

const baseURL = 'http://app.monami.test/api';

const auth = {
  username: process.env.MONAMI_UID,
  password: process.env.MONAMI_SECRET
}

namespace('api', () => {
  namespace('clients', () => {
    desc('List a existing clients');
    task('list', async () => {
      await axios.get(`${baseURL}/clients`, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch((error) => {
        console.error('Error:', error);
      });
    });

    desc('Find an existing client');
    task('find', async (id) => {
      await axios.get(`${baseURL}/clients/${id}`, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch((error) => {
        console.error('Error:', error.body);
      });
    });

    desc('Create a new client');
    task('create', async () => {
      await axios.post(`${baseURL}/clients`, {
        person: {
          first_name: 'Robert',
          last_name: 'Smith',
        },
        address: {
          county: 'Essex',
        }
      }, {
        auth: auth
      }).then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
      }).catch((error) => {
        console.error('Error:', error);
      });
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
