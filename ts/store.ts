export interface Activity {
  id: string;
  title: string;
}

export const ActivityStore = class extends EventTarget {
  localStorageKey: string;
  activities: Array<Activity>;

  constructor(localStorageKey: string) {
    super();
    this.localStorageKey = localStorageKey;
    this._readStorage();
    window.addEventListener(
      "storage", () => {
        this._save();
      },
      false
    );
  }
  _readStorage() {
    this.activities = JSON.parse(window.localStorage.getItem(this.localStorageKey) || "[]");
  }
  _save() {
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.activities));
    this.dispatchEvent(new CustomEvent("save"));
  }
  add(activity: Activity) {
    this.activities.push({ title: activity.title, id: "id_" + Date.now(), });
    this._save();
  }
}
