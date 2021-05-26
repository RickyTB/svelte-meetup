import { writable } from "svelte/store";
import type { Meetup } from "../types";

const meetups = writable<Meetup[]>([]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  setMeetups: (meetupList: Meetup[]) => {
    meetups.set(meetupList);
  },
  addMeetup: (newMeetup: Meetup) => {
    meetups.update((items) => [newMeetup, ...items]);
  },
  updateMeetup: (id: string, meetupData: Omit<Meetup, "id" | "isFavorite">) => {
    meetups.update((items) =>
      items.map((meetup) => {
        if (meetup.id === id) {
          return { ...meetup, ...meetupData };
        }
        return meetup;
      })
    );
  },
  removeMeetup: (id: string) => {
    meetups.update((items) => items.filter((item) => item.id !== id));
  },
  toggleFavorite: (id: string) => {
    meetups.update((items) => {
      const updatedMeetup = { ...items.find((m) => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex((m) => m.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
};

export default customMeetupsStore;
