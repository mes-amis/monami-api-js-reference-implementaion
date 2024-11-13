let { namespace, task, desc } = require('jake');

task('default', jake.showAllTaskDescriptions);

namespace('api', () => {
  namespace('clients', () => {
    desc('Find an existing client');
    task('find', function () {
      console.log('Running api:clients:find task');
    });

    desc('Create a new client');
    task('create', function () {
      console.log('Running api:clients:create task');
    });
  })

  namespace('screenings', () => {
    desc('List completed screening requests');
    task('list', function () {
      console.log('Running api:screenings:list task');
    });

    desc('Create a new screening request');
    task('create', function () {
      console.log('Running api:screenings:create task');
    });

    desc('Get a screening request by id');
    task('show', function () {
      console.log('Running api:screenings:show task');
    });
  })

  namespace('webhooks', () => {
    desc('Create a new webhook');
    task('create', function () {
      console.log('Running api:webhooks:create task');
    });
  })
})
