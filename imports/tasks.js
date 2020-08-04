import {check} from 'meteor/check';
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

Meteor.methods({
  addTask(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task.
    if (!this.userId) throw new Meteor.Error('addTask', 'not-authorized');

    const {username} = Meteor.users.findOne(this.userId);
    const id = Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username
    });
    return id;
  },

  deleteTask(taskId) {
    check(taskId, String);
    Tasks.remove(taskId);
  },

  setDone(taskId, done) {
    check(taskId, String);
    check(done, Boolean);
    Tasks.update(taskId, {$set: {done}});
  },

  sum(n1, n2) {
    check(n1, Number);
    check(n2, Number);
    return n1 + n2;
  }
});
