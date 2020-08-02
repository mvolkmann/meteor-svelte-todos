<script>
  import {Tasks} from '../imports/tasks.js';
  export let task;

  function deleteTask() {
    Tasks.remove(task._id);
  }

  const formatDate = date =>
    date.toLocaleDateString('en-us', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

  function toggleTask() {
    Tasks.update(task._id, {$set: {done: !task.done}});
  }
</script>

<li>
  <input type="checkbox" checked={task.done} on:click={toggleTask} />
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
