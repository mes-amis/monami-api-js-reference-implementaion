require('dotenv').config()

let { namespace, task, desc } = require('jake');
const axios = require('axios');

let baseURL = 'https://app.demo.monami.io/api'

task('default', jake.showAllTaskDescriptions);

let auth = {
  username: process.env.DEMO_MONAMI_UID,
  password: process.env.DEMO_MONAMI_SECRET
}

const printStatusAndBody = (response) => {
  console.log("Status: ", response.status)
  console.log(JSON.stringify(response.data, null, 2));
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
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });

    desc('Search for existing clients');
    task('search', async () => {
      // Search parameters are nested under the 'q' key. Ex: (q[first_name], q[last_name])
      const queryString = new URLSearchParams({
        "q[first_name]": 'Werner',
        "q[last_name]": 'Schaefer',
        "q[status]": 'pending',
        "q[phone_number]": '(541) 516 - 4741',
        "q[date_of_birth]": 'November 13, 1959',
        "q[address_county]": 'San Mateo',
        "q[social_security_number_last_4]": '6893'
      }).toString();

      await axios.get(`${baseURL}/clients?${queryString}`, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });

    desc('Create a new client but find a duplicate');
    task('create_with_duplicate', async () => {
      await axios.post(`${baseURL}/clients`, {
        person: {
          first_name: 'Werner',
          last_name: 'Schaefer',
          date_of_birth: '1959-11-13',
          phone_numbers: [
              {
                  number: '+15415164741',
                  primary: true
              }
          ],
        },
        address: {
          county: 'San Mateo',
        },
      }, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });

    desc('Find an existing client');
    task('find', async (id) => {
      await axios.get(`${baseURL}/clients/${id}`, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
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
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });
  })

  namespace('screenings', () => {
    desc('List completed screening requests');
    task('list', async () => {
      await axios.get(`${baseURL}/assessments/requests`, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });

    desc('Create a new screening request');
    task('create', async (client_id) => {
      await axios.post(`${baseURL}/assessments/requests`, {
        client_id: client_id,
        document_label: 'screen-for-community-services',
        demo_mode: true
      }, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });

    desc('Get a screening request by id');
    task('show', async (request_id) => {
      await axios.get(`${baseURL}/assessments/requests/${request_id}`, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });

    desc('Get available templates for screening requests');
    task('templates', async () => {
      const queryString = new URLSearchParams({
        "q[label_eq]": 'screen-for-community-services',
      })
      await axios.get(`${baseURL}/assessments/templates?${queryString}`, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });
  })

  namespace('documents', () => {
    desc('List completed documents with template label of screen-for-community-services completed since 2022-10-01');
    task('list', async (id) => {
      const queryString = new URLSearchParams({
        "q[label]": 'screen-for-community-services',
        "q[completed_at_gt]": '2022-10-01',
      }).toString();

      await axios.get(`${baseURL}/clients/${id}/documents?${queryString}`, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });

    desc('Show a completed document with completed values');
    task('show', async (client_id, document_id) => {
      await axios.get(`${baseURL}/clients/${client_id}/documents/${document_id}`, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
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
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });

    desc('Destroy a new webhook subscription');
    task('destroy', async (id) => {
      await axios.delete(`${baseURL}/webhooks/${id}`, {
        auth: auth
      }).then(printStatusAndBody).catch(printErrorStatusAndBody);
    });
  })
})
