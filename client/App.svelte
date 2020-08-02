<script>
  import {useTracker} from 'meteor/rdb:svelte-meteor-data';
  import {Tasks} from '../imports/tasks.js';
  import Task from './Task.svelte';

  let text;

  const query = {};
  const projection = {sort: {createdAt: -1}};
  $: tasks = useTracker(() => Tasks.find(query, projection).fetch());

  function addTodo() {
    Tasks.insert({text, createdAt: new Date()});
    text = '';
  }
</script>

<div class="container">
  <header>
    <h1>Todo List</h1>
  </header>

  <form on:submit|preventDefault={addTodo}>
    <input placeholder="todo text" bind:value={text} />
    <button>Add</button>
  </form>

  <ul>
    {#each $tasks as task}
      <Task {task} />
    {/each}
  </ul>
</div>

<style>
  form {
    margin-top: 0;
    padding: 1rem;
  }
</style>
