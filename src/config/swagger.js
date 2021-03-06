module.exports = {
    info: {
      title: 'REST API template',
      version: '1.0.0',
      description: 'Full functional scalable REST API Template'
    },
    tags: {
      name: 'auth',
      description: 'Authorization endpoints'
    },
    basePath: '/api/v1',
    apis: ['src/api/v1/auth/routes.js','src/api/v1/users/routes.js']
  }