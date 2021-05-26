<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import type { Meetup } from "../types";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation";
  import meetups from "./meetups-store";
  import { firebaseEndpoint } from "../helpers/config";

  export let id: string = null;

  let title: string = "";
  let subtitle: string = "";
  let address: string = "";
  let imageUrl: string = "";
  let email: string = "";
  let description: string = "";

  if (id) {
    const unsubscribe = meetups.subscribe((items) => {
      const selectedMeetup = items.find((i) => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      imageUrl = selectedMeetup.imageUrl;
      email = selectedMeetup.contactEmail;
      description = selectedMeetup.description;
    });
    unsubscribe();
  }

  type EventMap = {
    save: null;
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
    const meetupData: Omit<Meetup, "id" | "isFavorite"> = {
      title,
      subtitle,
      address,
      imageUrl,
      contactEmail: email,
      description,
    };
    if (id) {
      fetch(`${firebaseEndpoint}/meetups/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(meetupData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("An error ocurred, plase try again!");
          }
          meetups.updateMeetup(id, meetupData);
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`${firebaseEndpoint}/meetups.json`, {
        method: "POST",
        body: JSON.stringify({ ...meetupData, isFavorite: false }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("An error ocurred, plase try again!");
          }
          return res.json();
        })
        .then((data) => {
          meetups.addMeetup({
            ...meetupData,
            isFavorite: false,
            id: data.name,
          });
        })
        .catch((err) => console.log(err));
    }
    dispatch("save");
  }

  function cancel() {
    dispatch("cancel");
  }

  function deleteMeetup() {
    fetch(`${firebaseEndpoint}/meetups/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error ocurred, plase try again!");
        }
        meetups.removeMeetup(id);
      })
      .catch((err) => console.log(err));
    dispatch("save");
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
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
