import {
  Component,
  Element,
  h,
  Host,
  Method,
  Prop,
  Build,
  State,
} from "@stencil/core";

@Component({
  tag: "calcite-button",
  styleUrl: "calcite-button.scss",
  shadow: true,
})

/** @slot default text slot for button text */

/** Any attributes placed on <calcite-button> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this. */
/** Using appearance=inline will also render as an anchor link. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any button attributes for form submission */
export class CalciteButton {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** specify the color of the button, defaults to blue */
  @Prop({ mutable: true, reflect: true }) color:
    | "blue"
    | "dark"
    | "light"
    | "red" = "blue";

  /** specify the appearance style of the button, defaults to solid. Specifying "inline" will render the component as an anchor */
  @Prop({ mutable: true, reflect: true }) appearance:
    | "solid"
    | "outline"
    | "clear"
    | "inline"
    | "transparent" = "solid";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** specify the scale of the button, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" =
    "m";

  /** specify the width of the button, defaults to auto */
  @Prop({ mutable: true, reflect: true }) width: "auto" | "half" | "full" =
    "auto";

  /** optionally add a calcite-loader component to the button, disabling interaction.  */
  @Prop({ reflect: true }) loading?: boolean = false;

  /** optionally add a round style to the button  */
  @Prop({ reflect: true }) round?: boolean = false;

  /** optionally add a floating style to the button - this should be positioned fixed or sticky */
  @Prop({ reflect: true }) floating?: boolean = false;

  /** optionally pass a href - used to determine if the component should render as a button or an anchor */
  @Prop({ reflect: true }) href?: string;

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  /** optionally used with icon, select where to position the icon */
  @Prop({ reflect: true, mutable: true }) iconPosition?: "start" | "end" =
    "start";

  /** is the button disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    let appearance = ["solid", "outline", "clear", "inline", "transparent"];
    if (!appearance.includes(this.appearance)) this.appearance = "solid";

    let color = ["blue", "red", "dark", "light"];
    if (!color.includes(this.color)) this.color = "blue";

    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let width = ["auto", "half", "full"];
    if (!width.includes(this.width)) this.width = "auto";
    let iconPosition = ["start", "end"];
    if (this.icon !== null && !iconPosition.includes(this.iconPosition))
      this.iconPosition = "start";

    this.childElType = this.href
      ? "a"
      : this.appearance === "inline"
      ? "span"
      : "button";
    this.setupTextContentObserver();
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  componentWillLoad() {
    if (Build.isBrowser) {
      this.updateHasText();
      const elType = this.el.getAttribute("type");
      this.type = this.childElType === "button" && elType ? elType : "submit";
    }
  }

  //blue-solid
  // background: --calcite-ui-blue-1   ~ blue
  // hover/focus: --calcite-ui-blue-2  ~ blue-light
  // active: --calcite-ui-blue-1       ~ blue
  //red-solid
  // background: --calcite-ui-red-1   ~ red
  // hover/focus: --calcite-ui-red-2  ~ red-light
  // active: --calcite-ui-red-1       ~ red

  //light-solid
  // background: $blk-020
  // hover/focus: $blk-010
  // active: $blk-020

  //dark-solid
  // background: $blk-180
  // hover/focus: $blk-170
  // active: $blk-180
  //----------------------------------------
  //DARK blue-solid
  // background: --calcite-ui-blue-1-dark
  // hover/focus: --calcite-ui-blue-2-dark
  // active: --calcite-ui-blue-1-dark
  //DARK red-solid
  // background: --calcite-ui-red-1-dark
  // hover/focus: --calcite-ui-red-2-dark
  // active: --calcite-ui-red-1-dark

  //DARK light-solid
  // background: $blk-020
  // hover/focus: $blk-030
  // active: $blk-020

  //DARK dark-solid
  // background: $blk-180
  // hover/focus: $blk-190
  // active: $blk-180

  //---------------------------------------
  //background appearance = outline: white
  //blue-outline
  // border + text: calcite-ui-blue-3-light, on hover 2px border, on active 3px
  //red-outline
  //border + text: calcite-ui-blue-3-light, on hover 2px border, on active 3px
  //light-outline
  //border: $blk-020, on hover 2px border, on active 3px
  //text: $blk-230
  //dark-outline
  //border: $blk-180, on hover 2px border, on active 3px
  //text: $blk-230
  //---------------------------------------
  //background appearance = outline: $blk-200
  //DARK blue-outline
  // border + text: calcite-ui-blue-1-dark, on hover 2px border, on active 3px
  // focus: calcite-ui-blue-3-dark
  //DARK red-outline
  //border + text: calcite-ui-red-1-dark, on hover 2px border, on active 3px
  // focus: calcite-ui-red-3-dark
  //DARK light-outline
  //border: $blk-020, on hover 2px border, on active 3px
  //focus: $blk-030
  //text: $white
  //DARK dark-outline
  //border: $$blk-180, on hover 2px border, on active 3px
  //focus: $blk-170
  //text: white
  //---------------------------------------------------------
  // blue-transparent
  //normal: calcite-ui-blue-3-light
  //hover: calcite-ui-blue-2-light
  // red-transparent
  //normal: calcite-ui-red-3-light
  //hover: calcite-ui-red-2-light
  // light-transparent
  //normal: calcite-ui-blue-3-light
  //hover: calcite-ui-blue-2-light
  // dark-transparent
  //normal: calcite-ui-blue-3-light
  //hover: calcite-ui-blue-2-light
  //----------------------------------------------
  // DARK blue-transparent
  //normal: calcite-ui-blue-1-dark
  //hover: calcite-ui-blue-2-DARK
  //focus: calcite-ui-blue-3-dark
  // DARK red-transparent
  //normal: calcite-ui-red-1-dark
  //hover: calcite-ui-red-2-DARK
  //focus: calcite-ui-red-3-dark
  // DARK light-transparent
  //normal: $blk-010
  //hover: white
  //focus:$blk-020
  // DARK dark-transparent
  //normal: $blk-200
  //hover: $blk-180
  //focus: $blk-220
  //----------------------------------------------
  // blue-inline
  //normal: calcite-ui-blue-3-light
  //hover: calcite-ui-blue-2-light
  //focus: calcite-ui-blue-2-light
  // red-inline
  //normal: $h-rr-070
  //hover: calcite-ui-red-2-light
  //focus: calcite-ui-red-2-light
  // light-inline
  //normal: $blk-010
  //hover: white
  //focus: white
  // dark-inline
  //normal:$blk-200
  //hover:$blk-180
  //focus:$blk-180

  //----------------------------------------------
  // DARK blue-inline
  //normal:calcite-ui-blue-1-dark
  //hover: calcite-ui-blue-2-dark
  //focus: calcite-ui-blue-2-dark
  // DARK red-inline
  //normal:calcite-ui-red-1-dark
  //hover: calcite-ui-red-2-dark
  //focus: calcite-ui-red-2-dark
  // DARK light-inline
  //normal:$blk-010
  //hover: white
  //focus: white
  // DARK dark-inline
  //normal:$blk-200
  //hover:$blk-180
  //focus:$blk-180

  getColorClasses() {
    // color, appearance, theme
    const { color, appearance, theme } = this;
    let standardColor;
    let secondaryColor;
    let textColor;

    if (color === "light") {
      standardColor = "gray-lighter";
      secondaryColor = theme === "light" ? "gray-lightest" : "gray-light";
      textColor =
        appearance === "solid" ||
        (appearance === "outline" && theme === "light")
          ? "gray-dark"
          : "gray-lighter";
    }
    if (color === "dark") {
      standardColor = "gray-dark";
      secondaryColor = theme === "light" ? "gray" : "gray-darker";
      textColor =
        appearance === "solid" || (appearance === "outline" && theme === "dark")
          ? "white"
          : "gray-dark";
    }

    if (color !== "light" && color !== "dark") {
      standardColor = theme === "light" ? color : `${color}-light`;
      secondaryColor = theme === "light" ? `${color}-light` : color;
    }
    let finalTextColor;
    let backgroundColor;
    switch (appearance) {
      case "solid":
        finalTextColor =
          textColor || (theme === "light" ? "white" : "gray-dark");
        return `border border-${standardColor} bg-${standardColor} text-${finalTextColor} hover:bg-${secondaryColor} focus:bg-${secondaryColor}`;
      case "outline":
        finalTextColor = textColor || standardColor;
        backgroundColor = theme === "light" ? "white" : "gray-darkest";
        return `border border-${standardColor} bg-${backgroundColor} text-${finalTextColor}`;
      case "clear":
        return `border border-${standardColor} bg-transparent text-${finalTextColor}`;
      case "inline":
        return `text-${finalTextColor} hover:text-${secondaryColor} focus:text-${secondaryColor}`;
      case "transparent":
        return `text-${finalTextColor} hover:text-${secondaryColor} focus:text-${secondaryColor}`;
    }
  }

  private get horizontalPaddingFactor() {
    if (this.appearance === "inline") {
      return 0;
    }
    switch (this.scale) {
      case "xs":
        return 2;
      case "s":
        return 4;
      case "m":
        return 6;
      case "l":
        return 8;
      case "xl":
        return 10;
    }
  }

  getPaddingClasses() {
    if (this.appearance === "inline") {
      return "";
    }
    switch (this.scale) {
      case "xs":
        return `px-2 py-1`;
      case "s":
        return `px-4 py-2`;
      case "m":
        return `px-6 py-3`;
      case "l":
        return `px-8 py-4`;
      case "xl":
        return `px-10 py-5`;
    }
  }

  getIconPaddingClass() {
    if (this.appearance === "inline") {
      return "";
    }
    switch (this.scale) {
      case "xs":
        return `px-2 py-1`;
      case "s":
        return `px-4 py-2`;
      case "m":
        return `px-6 py-3`;
      case "l":
        return `px-8 py-4`;
      case "xl":
        return `px-10 py-5`;
    }
  }

  render() {
    const horizontalPaddingFactor = this.horizontalPaddingFactor;
    const verticalPaddingFactor = horizontalPaddingFactor / 2;
    const iconMargin = verticalPaddingFactor;

    const attributes = this.getAttributes();
    const Tag = this.childElType;
    const role = this.childElType === "span" ? "button" : null;
    const tabIndex = this.childElType === "span" ? 0 : null;

    const loader = (
      <div class="calcite-button--loader">
        <calcite-loader is-active inline></calcite-loader>
      </div>
    );

    const iconScale =
      this.appearance === "inline" ||
      this.scale === "xs" ||
      this.scale === "s" ||
      this.scale === "m"
        ? "s"
        : this.scale === "l"
        ? "m"
        : "l";

    const iconEl = (
      <calcite-icon
        class="calcite-button--icon"
        icon={this.icon}
        scale={iconScale}
      />
    );
    const x = "bg-red";
    const y = `bg-red`;
    return (
      <Host hasText={this.hasText} class={`${x}`}>
        <Tag
          {...attributes}
          role={role}
          tabindex={tabIndex}
          onClick={(e) => this.handleClick(e)}
          disabled={this.disabled}
          ref={(el) => (this.childEl = el)}
          class="bg-red"
        >
          {this.loading ? loader : null}
          {this.icon && this.iconPosition === "start" ? iconEl : null}
          <slot />
          {this.icon && this.iconPosition === "end" ? iconEl : null}
        </Tag>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus() {
    this.childEl.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** watches for changing text content **/
  private observer: MutationObserver;

  /** if button type is present, assign as prop */
  private type?: string;

  /** the rendered child element */
  private childEl?: HTMLElement;

  /** the node type of the rendered child element */
  private childElType?: "a" | "span" | "button" = "button";

  /** determine if there is slotted text for styling purposes */
  @State() private hasText?: boolean = false;

  private updateHasText() {
    this.hasText = this.el.textContent.length > 0;
  }

  private setupTextContentObserver() {
    if (Build.isBrowser) {
      this.observer = new MutationObserver(() => {
        this.updateHasText();
      });
      this.observer.observe(this.el, { childList: true, subtree: true });
    }
  }

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = [
      "appearance",
      "color",
      "dir",
      "hasText",
      "icon",
      "iconPosition",
      "id",
      "loading",
      "scale",
      "width",
      "theme",
    ];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // act on a requested or nearby form based on type
  private handleClick = (e: Event) => {
    // this.type refers to type attribute, not child element type
    if (this.childElType === "button" && this.type !== "button") {
      const requestedForm = this.el.getAttribute("form");
      const targetForm = requestedForm
        ? (document.getElementsByName(`${requestedForm}`)[0] as HTMLFormElement)
        : (this.el.closest("form") as HTMLFormElement);

      if (targetForm) {
        const targetFormSubmitFunction = targetForm.onsubmit as Function;
        switch (this.type) {
          case "submit":
            if (targetFormSubmitFunction) targetFormSubmitFunction();
            else if (targetForm.checkValidity()) targetForm.submit();
            else targetForm.reportValidity();
            break;
          case "reset":
            targetForm.reset();
            break;
        }
      }
      e.preventDefault();
    }
  };
}
