import Component from "../component"
import declareComponent from "./../../lib/declareComponent"
import * as domain from "../../lib/domain"
import { ElementList } from "extended-dom"
import Link from "../_themeAble/link/link"

type ContentArray = { content: string, link: string, absolute?: boolean }[]
const content: { left: ContentArray, right: ContentArray } = {
    left: [
        {
            content: "Datenschutz",
            link: "datenschutz"
        },
        {
            content: "Impressum",
            link: "impressum"
        },
        {
            content: "Intern",
            link: "todo"
        },
    ],
    right: [
        {
            content: "You@TGM",
            link: "you-at-tgm"
        },
        {
            content: "Partner",
            link: "partner"
        },
        {
            content: "Gremien",
            link: "gremien"
        },
    ]
}

for (let side in content) {
    for (let c of content[side as keyof typeof content]) {
        if (c.link.startsWith("./")) c.link = c.link.slice(2)
        c.absolute = !domain.linkMeta(c.link, 0).isOnOrigin
    }
}




export default class FooterLeiste extends Component {

    constructor(subdir: string) {
        super()

        const query = (query: ".left" | ".right") => {
            let mob = this.q(query) as HTMLElement
            return new ElementList(mob, mob.childs("my-qfix") as HTMLElement)
        }

        const elementSides = {
            left: query(".left"),
            right: query(".right")
        }

        for (let side in content) {
            const elem = elementSides[side as keyof typeof content]
            for (let cont of content[side as keyof typeof content]) {
                const newLinkParams = [cont.content, cont.absolute ? cont.link : subdir + cont.link] as [string, string]
                for (let e of elem) {
                  e.apd(new Link(...newLinkParams))
                }
            }
        }
    }

    stl() {
        return require("./footleiste.css").toString()
      }

    pug() {
        return require("./footleiste.pug").default
    }

}

declareComponent("footleiste", FooterLeiste)