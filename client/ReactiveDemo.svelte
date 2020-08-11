<script>
  import {Tracker} from 'meteor/tracker';
  import {counterVar} from './reactive.js';

  let count;
  Tracker.autorun(() => {
    count = counterVar.get();
  });
</script>

<div>
  <div>ReactiveDemo: count = {count}</div>
  <button on:click={() => counterVar.set(count + 1)}>+</button>
</div>
