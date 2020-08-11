<script>
  export let counterVar;

  console.log('Receiver.svelte x: counterVar =', counterVar);
</script>

<div>Receiver: counter = {counterVar.get()}</div>
