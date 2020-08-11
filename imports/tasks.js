import {check} from 'meteor/check';
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Tasks = new Mongo.Collection('tasks');
Tasks.schema = new SimpleSchema({
  createdAt: {type: Date, defaultValue: new Date()},
  done: {type: Boolean, defaultValue: false, optional: true},
  owner: {type: String},
  text: {type: String},
  username: {type: String, optional: true}
});
Tasks.attachSchema(Tasks.schema);

if (Meteor.isServer) {
  // This is only run on the server.
  // An arrow function cannot be used here
  // because we need to use the "this" keyword.
  Meteor.publish('tasks', function (isGreat, number, name) {
    check(isGreat, Boolean);
    check(number, Number);
    check(name, String);
    console.log('tasks.js: isGreat =', isGreat);
    console.log('tasks.js: number =', number);
    console.log('tasks.js: name =', name);
    return Tasks.find({owner: this.userId});
  });
}

Meteor.methods({
  addTask(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task.
    if (!this.userId) throw new Meteor.Error('addTask', 'not-authorized');

    const {username} = Meteor.users.findOne(this.userId);
    const newTask = {
      text,
      createdAt: new Date(),
      owner: this.userId,
      username
    };
    // This is not needed when attachSchema is used.
    //Tasks.schema.validate(newTask);
    const id = Tasks.insert(newTask);
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
