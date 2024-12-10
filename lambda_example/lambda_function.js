import * as https from 'node:https'
import * as querystring from 'querystring'

// Variables
const UID = "YOUR_API_UID_HERE"
const SECRET = "YOUR_API_SECRET_HERE"
const API_BASE_URL = "https://app.demo.monami.io/api/"  // switch to app.monami.io to move to production
const DOCUMENT_TEMPLATE = "Screen for Consumer Services v1"

export const handler = async (event, context, callback) => {
  try {
    // Standardizes the event payload
    const sanitizedClientData = {
      first_name: event.firstName,
      last_name: event.lastName,
      date_of_birth: event.dateOfBirth,
      primary_phone_number: event.phoneNumber,
      social_security_number: event.ssn,
      county: event.county,
    }

    const client = await findOrCreateClient(sanitizedClientData)
    const assessmentRequest = await createAssessmentRequest(client, DOCUMENT_TEMPLATE)

    callback(null, { statusCode: 200, body: assessmentRequest })
  } catch (error) {
    callback(
      JSON.stringify({
        statusCode: 500,
        body: {
          message: error.message,
          ...error.body
        }
      })
    )
  }
}

function MultipleClientsFoundError(clients) {
  this.message = 'Multiple clients found when only one is expected';
  this.body = { client_ids: clients.map(client => client.label) };
}
MultipleClientsFoundError.prototype = Error.prototype;

function FailedToCreateClientError(response, client_attributes) {
  this.message = 'There was an error creating the client';
  this.body = { response, client_attributes }
}
FailedToCreateClientError.prototype = Error.prototype;

async function findOrCreateClient(data) {
  return await findClient(data) || await createClient(data)
}

async function createClient(data) {
  const payload = {
    person: {
      first_name: data.first_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      primary_phone_number: data.primary_phone_number,
      social_security_number: data.social_security_number
    },
    address: {
      county: data.county
    }
  }
  const response = await post('clients', payload);

  if (response.statusCode > 299) {
    throw new FailedToCreateClientError(response, payload)
  }

  return JSON.parse(response.body);
}

async function findClient(data) {
  const ssn_last_4 = data.social_security_number.slice(-4);
  const payload = {
    'q[first_name]': data.first_name,
    'q[last_name]': data.last_name,
    'q[date_of_birth]': data.date_of_birth,
    'q[primary_phone_number]': data.primary_phone_number,
    'q[social_security_number_last_4]': ssn_last_4
  }

  const response = await get('clients', payload)
  const foundClients = JSON.parse(response.body).clients

  if (foundClients.length > 1) throw new MultipleClientsFoundError(foundClients)

  return foundClients[0]
}

async function createAssessmentRequest(client, name) {
  const params = {
    client_id: client.label,
    document_name: name
  }

  const response = await post('assessments/requests', params)

  return JSON.parse(response.body)
}

// The next few methods are just for setting up requests using node's http library, but can be replaced with others libs, like Axios.

const auth = Buffer.from(`${UID}:${SECRET}`).toString('base64')

const get = (url, params = {}) => request('GET', `${API_BASE_URL}${url}`, params)

const post = (url, params = {}) => request('POST', `${API_BASE_URL}${url}`, params)

const request = (method, url, params = {}) => {
  return new Promise((resolve, reject) => {
    let options = {
      method,
      headers: {
        'Authorization': `Basic ${auth}`,
        'User-Agent': 'AWSLambda(NJSave)'
      }
    }

    let requestData = null

    if (method === 'GET' && Object.keys(params).length > 0) {
      const query = querystring.stringify(params)
      url += `?${query}`
    } else if (method === 'POST') {
      requestData = JSON.stringify(params)
      options.headers['Content-Type'] = 'application/json'
      options.headers['Content-Length'] = Buffer.byteLength(requestData)
    }

    const req = https.request(url, options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data
        })
      })
    })

    req.on('error', (e) => {
      reject({
        statusCode: 500,
        body: `Request failed: ${e.message}`
      })
    })

    if (requestData) {
      req.write(requestData)
    }
    req.end()
  })
}