import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This is only run on the server.
  // An arrow function cannot be used here
  // because we need to use the "this" keyword.
  Meteor.publish('tasks', function () {
    return Tasks.find({owner: this.userId});
  });
}
