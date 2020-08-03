import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {Tasks} from '../imports/tasks';

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
