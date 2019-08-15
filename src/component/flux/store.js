import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";

let _store = {
  menuVisible: false,
  navItems: [
    {
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="fa fa-pencil" aria-hidden="true"></i>',
      htmlAfter: ""
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="fa fa-pencil" aria-hidden="true"></i>',
      to: "/blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="fa fa-pencil" aria-hidden="true"></i>',
      to: "/add-new-post",
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="fa fa-pencil" aria-hidden="true"></i>',
      to: "/components-overview",
    },
    {
      title: "Tables",
      htmlBefore: '<i class="fa fa-pencil" aria-hidden="true"></i>',
      to: "/tables",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="fa fa-pencil" aria-hidden="true"></i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="fa fa-pencil" aria-hidden="true"></i>',
      to: "/errors",
    }
  ]
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
