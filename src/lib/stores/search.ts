import { writable } from 'svelte/store';
const searchIsOpen = writable(false);
const searchText = writable(null);
export { searchIsOpen };
