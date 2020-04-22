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
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

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

  get colors() {
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
    let finalTextColor = standardColor;
    switch (appearance) {
      case "solid":
        finalTextColor =
          textColor || (theme === "light" ? "white" : "gray-dark");
        break;
      case "outline":
        finalTextColor = textColor || standardColor;
        break;
    }

    return { standardColor, secondaryColor, textColor: finalTextColor };
  }

  get colorClasses() {
    const { appearance, theme } = this;
    const { standardColor, secondaryColor, textColor } = this.colors;

    switch (appearance) {
      case "solid":
        return `border border-${standardColor} bg-${standardColor} text-${textColor} hover:bg-${secondaryColor} focus:bg-${secondaryColor} hover:border-${secondaryColor} focus:border-${secondaryColor}`;
      case "outline":
        const backgroundColor = theme === "light" ? "white" : "gray-darkest";
        return `border border-${standardColor} bg-${backgroundColor} text-${textColor}`;
      case "clear":
        return `border border-${standardColor} bg-transparent text-${textColor}`;
      case "inline":
        return `text-${textColor} hover:text-${secondaryColor} focus:text-${secondaryColor}`;
      case "transparent":
        return `text-${textColor} bg-transparent border-transparent hover:text-${secondaryColor} focus:text-${secondaryColor}`;
    }
  }

  private get horizontalPaddingFactor(): number {
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

  private get paddingClasses() {
    let { horizontalPaddingFactor } = this;
    const verticalPaddingFactor = horizontalPaddingFactor / 2;
    horizontalPaddingFactor = this.hasText
      ? horizontalPaddingFactor
      : verticalPaddingFactor;
    return this.appearance === "inline"
      ? "p-0"
      : `px-${horizontalPaddingFactor} py-${verticalPaddingFactor}`;
  }

  private get textClass() {
    const { appearance, scale } = this;
    if (appearance === "inline") {
      return "font-medium";
    }
    switch (scale) {
      case "xs":
        return "text-xs";
      case "s":
        return "text-sm";
      case "m":
        return "text-base";
      case "l":
        return "text-lg";
      case "xl":
        return "text-xl";
    }
  }

  private get disabledClass() {
    return this.disabled ? "pointer-events-none opacity-50" : "";
  }

  private get roundedClass() {
    return this.round ? "rounded-full" : "";
  }

  private get layoutClasses() {
    return this.appearance === "inline"
      ? "no-underline hover:underline"
      : "w-full h-full flex items-center justify-center box-border no-underline leading-none active:border-solid";
  }

  private get shadowClass() {
    return this.floating ? "shadow-md" : "";
  }

  private get buttonClass() {
    const commonClasses =
      "font-sans relative cursor-pointer transition duration-150 focus:outline-none focus:shadow-outline";
    return [
      commonClasses,
      this.roundedClass,
      this.layoutClasses,
      this.shadowClass,
      this.textClass,
      this.colorClasses,
      this.paddingClasses,
      this.disabledClass,
    ].join(" ");
  }

  private get iconMarginClasses() {
    const marginDirection = this.iconPosition === "start" ? "r" : "l";
    const marginRTLDirection = this.iconPosition === "start" ? "l" : "r";
    let marginFactor = this.horizontalPaddingFactor / 2;
    marginFactor = marginFactor === 0 ? 2 : marginFactor;
    return this.hasText
      ? `m${marginDirection}-${marginFactor} rtl:m${marginRTLDirection}-${marginFactor}`
      : "";
  }

  get whitelistedClasses() {
    // whitelist all possible classes used in the component
    return (
      <calcite-icon
        class={`font-sans w-full h-full flex items-center justify-center absolute relative inset-0 box-border no-underline leading-none fill-current opacity-0 opacity-50 pointer-events-none cursor-pointer m-0 rounded-full transition duration-150 focus:outline-none focus:shadow-outline bg-transparent border-transparent hover:underline border
    border-red hover:border-red focus:border-red bg-red hover:bg-red focus:bg-red text-red hover:text-red focus:text-red
    border-red-light hover:border-red-light focus:border-red-light bg-red-light hover:bg-red-light focus:bg-red-light text-red-light hover:text-red-light focus:text-red-light
    border-blue hover:border-blue focus:border-blue bg-blue hover:bg-blue focus:bg-blue text-blue hover:text-blue focus:text-blue
    border-blue-light hover:border-blue-light focus:border-blue-light bg-blue-light hover:bg-blue-light focus:bg-blue-light text-blue-light hover:text-blue-light focus:text-blue-light
    border-gray-light hover:border-gray-light focus:border-gray-light bg-gray-light hover:bg-gray-light focus:bg-gray-light text-gray-light hover:text-gray-light focus:text-gray-light
    border-gray-lighter hover:border-gray-lighter focus:border-gray-lighter bg-gray-lighter hover:bg-gray-lighter focus:bg-gray-lighter text-gray-lighter hover:text-gray-lighter focus:text-gray-lighter
    border-gray-lightest hover:border-gray-lightest focus:border-gray-lightest bg-gray-lightest hover:bg-gray-lightest focus:bg-gray-lightest text-gray-lightest hover:text-gray-lightest focus:text-gray-lightest
    border-gray hover:border-gray focus:border-gray bg-gray hover:bg-gray focus:bg-gray text-gray hover:text-gray focus:text-gray
    border-gray-dark hover:border-gray-dark focus:border-gray-dark bg-gray-dark hover:bg-gray-dark focus:bg-gray-dark text-gray-dark hover:text-gray-dark focus:text-gray-dark
    border-gray-darker hover:border-gray-darker focus:border-gray-darker bg-gray-darker hover:bg-gray-darker focus:bg-gray-darker text-gray-darker hover:text-gray-darker focus:text-gray-darker
    bg-gray-darkest active:border-solid
    font-medium text-xs text-sm text-base text-lg text-xl text-white
    p-0 px-1 px-2 px-3 px-4 px-5 px-6 px-8 px-10 py-0 py-1 py-2 py-3 py-4 py-5 mr-1 mr-2 mr-3 mr-4 mr-5 ml-1 ml-2 ml-3 ml-4 ml-5 rtl:mr-1 rtl:mr-2 rtl:mr-3 rtl:mr-4 rtl:mr-5 rtl:ml-1 rtl:ml-2 rtl:ml-3 rtl:ml-4 rtl:ml-5

    `}
      />
    );
  }

  render() {
    const attributes = this.getAttributes();
    const Tag = this.childElType;
    const role = this.childElType === "span" ? "button" : null;
    const tabIndex = this.childElType === "span" ? 0 : null;
    const { textColor } = this.colors;
    const loader = (
      <div
        class={`flex items-center justify-center absolute inset-0 text-${textColor}`}
      >
        <calcite-loader is-active inline class="m-0"></calcite-loader>
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
        class={`fill-current ${this.iconMarginClasses} ${
          this.loading ? "opacity-0" : ""
        }`}
        icon={this.icon}
        scale={iconScale}
      />
    );

    return (
      <Host hasText={this.hasText}>
        <Tag
          {...attributes}
          role={role}
          tabindex={tabIndex}
          onClick={(e) => this.handleClick(e)}
          disabled={this.disabled}
          ref={(el) => (this.childEl = el)}
          class={this.buttonClass}
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
