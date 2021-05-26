<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import meetups from "./meetups-store";
  import { firebaseEndpoint } from "../helpers/config";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";

  export let id: string;
  export let title: string;
  export let subtitle: string;
  export let imageUrl: string;
  export let description: string;
  export let address: string;
  //export let email: string;
  export let isFav: boolean;

  let isLoading = false;

  function toggleFavorite() {
    isLoading = true;
    fetch(`${firebaseEndpoint}/meetups/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: !isFav }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error ocurred, plase try again!");
        }
        meetups.toggleFavorite(id);
        isLoading = false;
      })
      .catch((err) => {
        isLoading = false;
        console.log(err);
      });
  }

  type EventMap = {
    showDetails: string;
    edit: string;
  };

  const dispatch = createEventDispatcher<EventMap>();
</script>

<article>
  <header>
    <h1>
      {title}
      {#if isFav}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button mode="outline" type="button" on:click={() => dispatch("edit", id)}
      >Edit</Button
    >
    {#if isLoading}
      <span>Changing...</span>
    {:else}
      <Button
        type="button"
        mode="outline"
        color={isFav ? null : "success"}
        on:click={toggleFavorite}
      >
        {isFav ? "Unfavorite" : "Favorite"}
      </Button>
    {/if}
    <Button type="button" on:click={() => dispatch("showDetails", id)}
      >Show Details</Button
    >
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }
</style>
