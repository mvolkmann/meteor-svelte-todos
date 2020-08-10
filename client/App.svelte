<script>
  import {Meteor} from 'meteor/meteor';
  import {ReactiveVar} from 'meteor/reactive-var';
  import {Session} from 'meteor/session';
  import {Tracker} from 'meteor/tracker';
  import {useTracker} from 'meteor/rdb:svelte-meteor-data';
  import {BlazeTemplate} from 'meteor/svelte:blaze-integration';
  import {onMount} from 'svelte';
  import Counter from './Counter.svelte';
  import {Tasks} from '../imports/tasks.js';
  import Task from './Task.svelte';
  import {call, handleError} from './util.js';

  let hideCompleted = false;
  let text = '';
  let user;

  onMount(() => Meteor.subscribe('tasks', true, 99, 'Gretzky'));

  let counter;
  Tracker.autorun(() => {
    counter = Session.get('counter');
    console.log('App.svelte autorun: Session.all() =', Session.all());
  });
  Session.setDefault('counter', 0);

  const myRV = new ReactiveVar(0);
  let counter2;
  Tracker.autorun(() => {
    counter2 = myRV.get();
  });

  // user is a store
  $: user = useTracker(() => Meteor.user());
  $: emailVerified = $user && $user.emails[0].verified;

  const query = {};
  const projection = {sort: {createdAt: -1}};
  // This is a MongoDB cursor which is also a Svelte store.
  $: tasks = Tasks.find(query, projection);

  $: remaining = $tasks.filter(t => !t.done).length;

  async function addTask() {
    //Meteor.call('addTask', text, handleError);
    try {
      const id = await call('addTask', text);
      console.log('App.svelte addTask: id of new task is', id);
      text = '';

      const sum = await call('sum', 2, 3);
      console.log('App.svelte addTask: sum =', sum);
    } catch (e) {
      handleError(e);
    }
  }

  function increment() {
    Session.set('counter', counter + 1);
  }
</script>

<div class="container">
  <BlazeTemplate template="loginButtons" />

  <header>
    <h1>Todo App</h1>
    {counter}
    <button on:click={increment}>Increment</button>
    <Counter />
    counter2 = {counter2}
    <button on:click={() => myRV.set(counter2 + 1)}>bump</button>
  </header>

  <section>
    {#if $user && emailVerified}
      <p class="stats">{remaining} of {$tasks.length} remaining</p>

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
    {:else if $user && !emailVerified}
      <p>
        You have been sent an email containing a link to verify your account.
        Please click that link in order to start adding tasks.
      </p>
    {:else}
      <p>Please sign in.</p>
    {/if}
  </section>
</div>

<style>
  form {
    margin-top: 0;
    padding-bottom: 1rem;
  }

  section {
    padding: 1rem;
  }

  .stats {
    margin-top: 0;
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
