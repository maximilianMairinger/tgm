import LazySectionedPage from "../lazySectionedPage"


export default abstract class TeamPage extends LazySectionedPage {
  stl() {
    return super.stl() + require("./teamPage.css").toString()
  }
}