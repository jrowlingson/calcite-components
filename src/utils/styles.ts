import cn from "classnames"
import { ComponentInterface } from '@stencil/core'
import { css } from "./tailwind"

declare type StylesDecorator = (target: ComponentInterface, propertyName: string) => void

export function Styles(): StylesDecorator {

  return (target: ComponentInterface, propertyName: string) => {
    const { componentWillLoad } = target
    target.componentWillLoad = function() {
      let val = this[propertyName]
      const cx = css.bind(this)
      this[propertyName] = () => cx(cn(val()))
      return componentWillLoad && componentWillLoad.call(this)
    }
  }

}
