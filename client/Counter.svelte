<script>
  import {Session} from 'meteor/session';
  import {Tracker} from 'meteor/tracker';

  let counter;
  Tracker.autorun(() => {
    counter = Session.get('counter');
  });
  Session.setDefault('counter', 0);

  function increment() {
    Session.set('counter', counter + 1);
  }
</script>

<div class="container">
  {counter}
  <button on:click={increment}>Increment</button>
  <button on:click={() => Session.clear()}>Clear</button>
</div>
