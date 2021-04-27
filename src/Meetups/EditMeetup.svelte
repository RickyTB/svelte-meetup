<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import type { Meetup } from "../types";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation";

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

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = isValidEmail(email);
  $: descriptionValid = !isEmpty(description);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    imageUrlValid &&
    emailValid &&
    descriptionValid;

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
    <TextInput
      id="title"
      label="Title"
      bind:value={title}
      valid={titleValid}
      validityMessage="Please enter a valid title."
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      bind:value={subtitle}
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
    />
    <TextInput
      id="address"
      label="Address"
      bind:value={address}
      valid={addressValid}
      validityMessage="Please enter a valid address."
    />
    <TextInput
      id="imageUrl"
      label="Image URL"
      bind:value={imageUrl}
      valid={imageUrlValid}
      validityMessage="Please enter a valid image URL."
    />
    <TextInput
      id="email"
      label="E-Mail"
      bind:value={email}
      valid={emailValid}
      validityMessage="Please enter a valid e-mail."
    />
    <TextInput
      id="description"
      label="Description"
      bind:value={description}
      rows={3}
      controlType="textarea"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}
      >Save</Button
    >
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
