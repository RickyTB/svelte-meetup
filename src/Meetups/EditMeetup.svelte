<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import type { Meetup } from "../types";
  import Modal from "../UI/Modal.svelte";

  let title: string = "";
  let subtitle: string = "";
  let address: string = "";
  let imageUrl: string = "";
  let email: string = "";
  let description: string = "";

  type EventMap = {
    save: Omit<Meetup, "id" | "isFavorite">;
    cancel: null;
  };

  const dispatch = createEventDispatcher<EventMap>();

  function submitForm() {
    dispatch("save", {
      title,
      subtitle,
      address,
      imageUrl,
      contactEmail: email,
      description,
    });
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput id="title" label="Title" bind:value={title} />
    <TextInput id="subtitle" label="Subtitle" bind:value={subtitle} />
    <TextInput id="address" label="Address" bind:value={address} />
    <TextInput id="imageUrl" label="Image URL" bind:value={imageUrl} />
    <TextInput id="email" label="E-Mail" bind:value={email} />
    <TextInput
      id="description"
      label="Description"
      bind:value={description}
      rows={3}
      controlType="textarea"
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm}>Save</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
