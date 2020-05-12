import {
  Component,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS, TEXT } from "./resources";

@Component({
  tag: "calcite-chip",
  styleUrl: "calcite-chip.scss",
  shadow: true,
})
export class CalciteChip {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  @Prop() value!: string;

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** specify the scale of the chip, defaults to m */
  @Prop({ reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" = "m";

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  @Event() calciteChipDismiss: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  closeClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    this.calciteChipDismiss.emit(this.el);
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  render() {
    const dir = getElementDir(this.el);
    const iconScale =
      this.scale === "xs" || this.scale === "s" || this.scale === "m"
        ? "s"
        : this.scale === "l"
        ? "m"
        : "l";

    const iconEl = (
      <calcite-icon class={this.iconClass} icon={this.icon} scale={iconScale} />
    );
    return (
      <Host dir={dir}>
        {this.icon ? iconEl : null}
        <slot name="chip-image"></slot>
        <span class={this.spanClass}>
          <slot />
        </span>
        <button
          onClick={this.closeClickHandler}
          class={this.buttonClass}
          title={TEXT.close}
        >
          <calcite-icon scale={iconScale} icon="x" />
        </button>
      </Host>
    );
  }

  private get iconClass() {
    const baseClass =
      "inline-flex cursor-pointer rounded-r-full rtl:rounded-r-none rtl:rounded-l-full";
    const colorClasses = "text-black dark:text-white";
    const commonMarginClasses = "mt-0 mr-0 mb-0";
    const transitionClasses = "transition ease-in-out duration-150";
    const scaleMarginClasses = [
      "scaleXs:ml-2 rtl-scaleXs:mr-2 rtl-scaleXs:ml-0",
      "scaleS:ml-3 rtl-scaleS:mr-3 rtl-scaleS:ml-0",
      "scaleM:ml-4 rtl-scaleM:mr-4 rtl-scaleM:ml-0",
      "scaleL:ml-5 rtl-scaleL:mr-5 rtl-scaleL:ml-0",
      "scaleXl:ml-6 rtl-scaleXl:mr-6 rtl-scaleXl:ml-0",
    ].join(" ");
    return [
      baseClass,
      colorClasses,
      commonMarginClasses,
      transitionClasses,
      scaleMarginClasses,
    ].join(" ");
  }

  private get spanClass() {
    const baseClass = "rtl:text-right";
    const textClasses =
      "scaleXs:text-2xs scaleS:text-xs scaleM:text-sm scaleL:text-base scaleXl:text-lg";
    const paddingClasses = `scaleXs:py-1 scaleXs:pl-2 scaleXs:pr-1 rtl-scaleXs:pl-1 rtl-scaleXs:pr-2
      scaleS:py-2 scaleS:pl-3 scaleS:pr-2 rtl-scaleS:pl-2 rtl-scaleS:pr-3
      scaleM:py-3 scaleM:pl-4 scaleM:pr-3 rtl-scaleM:pl-3 rtl-scaleM:pr-4
      scaleL:py-4 scaleL:pl-5 scaleL:pr-4 rtl-scaleL:pl-4 rtl-scaleL:pr-5
      scaleXl:py-5 scaleXl:pl-6 scaleXl:pr-5 rtl-scaleXl:pl-5 rtl-scaleXl:pr-6`;
    return [baseClass, textClasses, paddingClasses].join(" ");
  }

  private get buttonClass() {
    const baseClass =
      "focus:outline-none focus:shadow-outline m-0 inline-flex self-stretch bg-transparent border-none cursor-pointer rounded-r-full rtl:rounded-r-none rtl:rounded-l-full";
    const colorClasses =
      "dark:text-white hover:bg-gray-lighter focus:bg-gray-lighter active:bg-gray-light hover-dark:bg-gray-darkest focus-dark:bg-gray-darkest active-dark:bg-gray-darker";
    const transitionClasses = "transition ease-in-out duration-150";
    const paddingClasses =
      "scaleXs:p-1 scaleS:p-2 scaleM:p-3 scaleL:p-4 scaleXl:p-5";
    return [baseClass, colorClasses, transitionClasses, paddingClasses].join(
      " "
    );
  }
}
