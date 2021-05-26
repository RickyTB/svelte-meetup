<script lang="ts">
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Header from "./UI/Header.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import meetups from "./Meetups/meetups-store";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import { firebaseEndpoint } from "./helpers/config";
  import type { Meetup } from "./types";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import ErrorModal from "./UI/ErrorModal.svelte";

  let editMode: "add" | "edit" | null = null;
  let editedId: string = null;
  let page: "overview" | "details" = "overview";
  let pageData: { id?: string } = {};
  let isLoading = true;
  let error: Error | undefined;

  fetch(`${firebaseEndpoint}/meetups.json`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fetching meetups failed, please try again");
      }
      return res.json();
    })
    .then((data) => {
      const loadedMeetups: Meetup[] = [];
      for (const key in data) {
        loadedMeetups.push({
          ...data[key],
          id: key,
        });
      }
      setTimeout(() => {
        isLoading = false;
        meetups.setMeetups(loadedMeetups.reverse());
      }, 1000);
    })
    .catch((err) => {
      error = err;
      isLoading = false;
      console.log(err);
    });

  function saveMeetup() {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event: CustomEvent<string>) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = {};
  }

  function startEdit(event: CustomEvent<string>) {
    editMode = "edit";
    editedId = event.detail;
  }

  function clearError() {
    error = null;
  }
</script>

{#if error}
  <ErrorModal message={error.message} on:cancel={clearError} />
{/if}

<Header />

<main>
  {#if page === "overview"}
    {#if editMode === "edit"}
      <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showDetails={showDetails}
        on:edit={startEdit}
        on:add={() => (editMode = "edit")}
      />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
