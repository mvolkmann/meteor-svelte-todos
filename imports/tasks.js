import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  addTask(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task.
    if (!this.userId) throw new Meteor.Error('not-authorized');

    const {username} = Meteor.users.findOne(this.userId);
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username
    });
  },

  deleteTask(taskId) {
    check(taskId, String);
    Tasks.remove(taskId);
  },

  setDone(taskId, done) {
    check(taskId, String);
    check(done, Boolean);
    Tasks.update(taskId, {$set: {done}});
  }
});
