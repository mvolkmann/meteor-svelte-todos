<script>
  import {call, handleError} from './util.js';

  export let task;

  async function deleteTask() {
    //Meteor.call('deleteTask', task._id, handleError);
    try {
      await call('deleteTask', task._id);
    } catch (e) {
      handleError(e);
    }
  }

  const formatDate = date =>
    date.toLocaleDateString('en-us', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

  async function toggleDone() {
    //Meteor.call('setDone', task._id, !task.done, handleError);
    try {
      await call('setDone', task._id, !task.done);
    } catch (e) {
      handleError(e);
    }
  }
</script>

<li>
  <input type="checkbox" checked={task.done} on:click={toggleDone} />
  <span class:done={task.done}>
    {task.text} - added {formatDate(task.createdAt)}
  </span>
  <!-- Using Unicode trash can -->
  <button on:click={deleteTask}>&#x1f5d1;</button>
</li>

<style>
  button {
    background-color: transparent;
    border: none;
  }

  .done {
    opacity: 0.3;
    text-decoration: line-through;
  }
</style>
