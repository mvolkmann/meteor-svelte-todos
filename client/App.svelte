<script>
  import {Meteor} from 'meteor/meteor';
  import {useTracker} from 'meteor/rdb:svelte-meteor-data';
  import {BlazeTemplate} from 'meteor/svelte:blaze-integration';
  import {onMount} from 'svelte';
  import {Tasks} from '../imports/tasks.js';
  import Task from './Task.svelte';
  import {call, handleError} from './util';

  let hideCompleted = false;
  let text = '';
  let user;

  onMount(() => Meteor.subscribe('tasks'));

  // user is a store
  $: user = useTracker(() => Meteor.user());

  const query = {};
  const projection = {sort: {createdAt: -1}};
  // tasks is a store
  $: tasks = useTracker(() => Tasks.find(query, projection).fetch());

  $: remaining = $tasks.filter(t => !t.done).length;

  async function addTask() {
    //Meteor.call('addTask', text, handleError);
    try {
      const id = await call('addTask', text);
      console.log('App.svelte addTask: id of new task is', id);
      text = '';
    } catch (e) {
      handleError(e);
    }
  }
</script>

<div class="container">
  <BlazeTemplate template="loginButtons" />

  <header>
    <h1>Todo App</h1>
  </header>

  {#if $user}
    <p>{remaining} of {$tasks.length} remaining</p>

    <form on:submit|preventDefault={addTask}>
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
  {/if}
</div>

<style>
  form {
    margin-top: 0;
    padding: 1rem;
  }

  :global(#login-buttons) {
    padding: 0.5rem;
    text-align: right;
  }

  :global(#login-buttons a) {
    text-decoration: none;
  }

  :global(#login-dropdown-list) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
