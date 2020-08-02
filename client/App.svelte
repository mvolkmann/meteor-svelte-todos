<script>
  import {useTracker} from 'meteor/rdb:svelte-meteor-data';
  import {Tasks} from '../imports/tasks.js';
  import Task from './Task.svelte';

  let hideCompleted = false;
  let text = '';

  const query = {};
  const projection = {sort: {createdAt: -1}};
  $: tasks = useTracker(() => Tasks.find(query, projection).fetch());
  $: remaining = $tasks.filter(t => !t.done).length;

  function addTodo() {
    Tasks.insert({text, createdAt: new Date()});
    text = '';
  }
</script>

<div class="container">
  <header>
    <h1>Todo List ({remaining} of {$tasks.length} remaining)</h1>
  </header>

  <form on:submit|preventDefault={addTodo}>
    <input placeholder="todo text" bind:value={text} />
    <button>Add</button>

    <label className="hide-completed">
      <input type="checkbox" bind:checked={hideCompleted} />
      Hide Completed Tasks
    </label>
  </form>

  <ul>
    {#each $tasks as task}
      {#if !hideCompleted || !task.done}
        <Task {task} />
      {/if}
    {/each}
  </ul>
</div>

<style>
  form {
    margin-top: 0;
    padding: 1rem;
  }
</style>
