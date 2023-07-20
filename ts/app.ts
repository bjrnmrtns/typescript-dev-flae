import { ActivityStore, Activity } from "./store.js"

const Activities = new ActivityStore("activities-vanillats");

interface DOMElements {
  [index: string]: HTMLElement | HTMLInputElement;
}

class ActivityApp {
  parent: HTMLElement;
  $: DOMElements;
  filter: string;

  constructor(el: HTMLElement) {
    this.parent = el;
    this.$ = {
      input: el.querySelector('[data-todo="new"]') as HTMLElement,
      list: el.querySelector('[data-todo="list"]') as HTMLElement,
    };
    this.$.input.addEventListener("keyup", (e: KeyboardEvent) => {
      if(e.key === "Enter" && (e.target as HTMLInputElement).value.length) {
        const activity : Activity = { id: "id_" + Date.now(), title: (e.target as HTMLInputElement).value };
        Activities.add(activity);
        (this.$.input as HTMLInputElement).value = "";
        this.$.list.appendChild(this.createActivityItem(activity));
      }
    });
    Activities.activities.map((activity) => this.$.list.appendChild(this.createActivityItem(activity)));
  }
  createActivityItem(activity: Activity) {
    const li = document.createElement("li");
    li.textContent = activity.title;
    return li;
  }
}
new ActivityApp(document.body);
