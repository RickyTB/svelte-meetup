import { writable } from "svelte/store";
import type { Meetup } from "../types";

const meetups = writable<Meetup[]>([
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
    imageUrl: "https://joewilcox.com/wp-content/uploads/2008/06/swim-pool.jpg",
    address: "27th Nerd Road, 32523 New York",
    contactEmail: "code@test.com",
    isFavorite: false,
  },
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData: Omit<Meetup, "id" | "isFavorite">) => {
    const newMeetup: Meetup = {
      id: Math.random().toString(),
      isFavorite: false,
      ...meetupData,
    };
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
