import { remote } from 'electron'

export default {
  show(items) {
    const { Menu, MenuItem } = remote
    const menu = new Menu()
    for (let item of items) {
      menu.append(new MenuItem(item))
    }

    menu.popup({ window: remote.getCurrentWindow() })
  }
}
