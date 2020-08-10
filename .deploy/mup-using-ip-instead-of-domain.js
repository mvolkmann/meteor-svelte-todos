module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '104.131.8.107',
      username: 'root',
      password: 'sykEvVj6!7f!k2Q'
    }
  },

  app: {
    // TODO: change app name and path
    name: 'meteor-svelte-todos',
    path: '../',

    servers: {
      one: {}
    },

    buildOptions: {
      serverOnly: true
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://104.131.8.107:4000',
      MONGO_URL:
        'mongodb+srv://mvolkmann:mongoatlas19@cluster0.tqq7g.mongodb.net/meteor?retryWrites=true&w=majority',
      //MONGO_OPLOG_URL: 'mongodb://mongodb/local'
      PORT: 4000
    },

    docker: {
      // abernix/meteord:node-12-base works with Meteor 1.9 - 1.10
      // If you are using a different version of Meteor,
      // refer to the docs for the correct image to use.
      image: 'abernix/meteord:node-12-base'
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  proxy: {
    domains: 'https://mvolkmann.site:80', // nginx proxy

    ssl: {
      // Enable Let's Encrypt
      letsEncryptEmail: 'email@domain.com'
    }
  }
};
