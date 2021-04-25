<script lang="ts">
  import type { Meetup } from "./types";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Header from "./UI/Header.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";

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
      isFavorite: false,
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
      isFavorite: false,
    },
  ];

  let editMode: "add" | "edit" | null = null;

  function addMeetup(event: CustomEvent<Omit<Meetup, "id" | "isFavorite">>) {
    const newMeetup: Meetup = {
      id: Math.random().toString(),
      isFavorite: false,
      ...event.detail,
    };

    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function toggleFavorite(event: CustomEvent<string>) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find((m) => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex((m) => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }

  function cancelEdit() {
    editMode = null;
  }
</script>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = "add")}>New Meetup</Button>
  </div>
  {#if editMode === "add"}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid {meetups} on:toggleFavorite={toggleFavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>
