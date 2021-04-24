<script lang="ts">
  import type { Meetup } from "./types";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Header from "./UI/Header.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

  let title: string = "";
  let subtitle: string = "";
  let address: string = "";
  let imageUrl: string = "";
  let email: string = "";
  let description: string = "";

  let meetups: Meetup[] = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description: "In this meetup ...",
      imageUrl:
        "https://uorepicdn-ir.azureedge.net/globalassets/depts/school-of-continuing-studies/certificate-programs/coding-boot-camp/coding-bootcamp-fall-2018-photos/u-of-r-coding-academy-19-min.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: "Let's go for some swimming",
      description: "We will simply swim some rounds.",
      imageUrl:
        "https://joewilcox.com/wp-content/uploads/2008/06/swim-pool.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
    },
  ];

  function addMeetup() {
    const newMeetup: Meetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      address,
      description,
      imageUrl,
      contactEmail: email,
    };

    meetups = [newMeetup, ...meetups];
  }
</script>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
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
    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
