import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import LoginService from '../../service/LoginService';

let adminMenu = {
  menuVisible: false,
  navItems: [
    {
      title: "Home",
      to: "/home",
      htmlBefore: '<i class="layout-icon fa fa-home" aria-hidden="true"></i>'
    },
    {
      title: "Manage Course",
      to: "/universityCourse",
      htmlBefore: '<i class="layout-icon fa fa-address-book" aria-hidden="true"></i>',
    },
    {
      title: "Manage Mentor",
      to: "/b",
      htmlBefore: '<i class="layout-icon fa fa-user-circle-o" aria-hidden="true"></i>'
    },
    {
      title: "Manage Member",
      to: "/c",
      htmlBefore: '<i class="layout-icon fa fa-users" aria-hidden="true"></i>'
    },
  ]
};

let memMenu = {
  menuVisible: false,
  navItems: [
    {
      title: "Home",
      to: "/",
      htmlBefore: '<i class="fa fa-home" aria-hidden="true"></i>'
    }
  ]
};

let mentorMenu = {
  menuVisible: false,
  navItems: [
    {
      title: "Home",
      to: "/",
      htmlBefore: '<i class="fa fa-home" aria-hidden="true"></i>'
    }
  ]
};

let _store = {};

class Store extends EventEmitter {
  constructor() {
    super();
    this.initMenu();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
    
  }

  initMenu() {
    let role = LoginService.getRole();
    
    switch (role) {
      case 'admin' : {
        _store = adminMenu;
        break;
      }
      case 'menber' : {
        _store = memMenu;
        break;
      }
      case 'mentor' : {
        _store = mentorMenu;
        break;
      }
      default: {

      }
    }
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
