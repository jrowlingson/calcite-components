import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch
} from "@stencil/core";

import Color from "color";
import { ColorMode } from "../../interfaces/ColorPicker";
import { Scale, Theme } from "../../interfaces/common";
import { CSS, DEFAULT_HEX_COLOR, DEFAULT_STORAGE_KEY_PREFIX } from "./resources";

// TODO: extract into ColorMode object w/ more details: parts, limits, labels, render()? etc...
const RGB_LIMITS = {
  r: 255,
  g: 255,
  b: 255
};

const HSV_LIMITS = {
  h: 360,
  s: 100,
  v: 100
};

const DIMENSIONS = {
  s: {
    slider: {
      height: 15,
      width: 170
    },
    colorPalette: {
      height: 80,
      width: 170
    }
  },
  m: {
    slider: {
      height: 15,
      width: 240
    },
    colorPalette: {
      height: 130,
      width: 240
    }
  },
  l: {
    slider: {
      height: 15,
      width: 370
    },
    colorPalette: {
      height: 200,
      width: 370
    }
  }
};

const defaultColor = Color(DEFAULT_HEX_COLOR);

@Component({
  tag: "calcite-color-picker",
  styleUrl: "calcite-color-picker.scss",
  shadow: true
})
export class CalciteColorPicker {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element()
  el: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Public properties
  //
  //--------------------------------------------------------------------------

  // TODO: should this be state?
  /**
   * The color mode. Can be `rgb` or `hsv`.
   */
  @Prop() mode: ColorMode = "rgb";

  /**
   * The scale of the color picker.
   */
  @Prop({
    reflect: true
  })
  scale: Exclude<Scale, "xs" | "xl"> = "m";

  @Watch("scale")
  handleScaleChange(scale: Exclude<Scale, "xs" | "xl"> = "m"): void {
    this.updateDimensions(scale);
  }

  /**
   * Storage ID for colors.
   */
  @Prop() storageId: string;

  /** @todo doc */
  @Prop() textB = "B";

  /** @todo doc */
  @Prop() textBlue = "Blue";

  /** @todo doc */
  @Prop() textG = "G";

  /** @todo doc */
  @Prop() textGreen = "Green";

  /** @todo doc */
  @Prop() textH = "H";

  /** @todo doc */
  @Prop() textHsv = "HSV";

  /** @todo doc */
  @Prop() textHex = "Hex";

  /** @todo doc */
  @Prop() textHue = "Hue";

  /** @todo doc */
  @Prop() textR = "R";

  /** @todo doc */
  @Prop() textRed = "Red";

  /** @todo doc */
  @Prop() textRgb = "RGB";

  /** @todo doc */
  @Prop() textS = "S";

  /** @todo doc */
  @Prop() textSaturation = "Saturation";

  /** @todo doc */
  @Prop() textSavedColors = "Saved Colors";

  /** @todo doc */
  @Prop() textV = "V";

  /** @todo doc */
  @Prop() textValue = "Value";

  /**
   * The component's theme.
   */
  @Prop({
    reflect: true
  })
  theme: Theme = "light";

  /**
   * The color value in hex.
   */
  @Prop() value = defaultColor.hex();
  @Watch("value")
  handleColorChange(value): void {
    this.activeColor = Color(value);
  }

  colorPaletteCanvas: HTMLCanvasElement;
  hueSliderCanvas: HTMLCanvasElement;

  //--------------------------------------------------------------------------
  //
  //  Internal State/Props
  //
  //--------------------------------------------------------------------------

  @State() activeColor = defaultColor;
  @Watch("activeColor")
  handleActiveColorChange(): void {
    this.renderCanvasParts();
    this.calciteColorPickerColorChange.emit();
  }

  @State() dimensions = DIMENSIONS.m;

  @State() colorPart0: number;
  @State() colorPart1: number;
  @State() colorPart2: number;

  @State() savedColors: string[] = [];

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event()
  calciteColorPickerColorChange: EventEmitter;

  handleColorModeClick = (event: Event): void => {
    this.mode = (event.currentTarget as HTMLElement).getAttribute(
      "data-color-mode"
    ) as ColorMode;
  };

  handleHexInputChange = (event: Event): void => {
    event.stopPropagation();
    const { activeColor } = this;
    const input = event.target as HTMLCalciteHexInputElement;
    const hex = input.value;

    if (hex !== activeColor.hex()) {
      this.activeColor = Color(hex);
    }
  };

  handleSavedColorSelect = (event: Event): void => {
    const swatch = event.currentTarget as HTMLCalciteColorSwatchElement;
    this.activeColor = Color(swatch.color);
  };

  handleColorPartChange = (event: KeyboardEvent): void => {
    const input = event.target as HTMLInputElement;
    const partId = Number(input.getAttribute("data-color-part-id"));

    const limit =
      this.mode === "rgb"
        ? RGB_LIMITS[Object.keys(RGB_LIMITS)[partId]]
        : HSV_LIMITS[Object.keys(HSV_LIMITS)[partId]];

    const clamped = Math.max(0, Math.min(Number(input.value), limit));
    input.value = `${clamped}`;

    this[`colorPart${partId}`] = clamped;
    this.updateColorFromParts();
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;

    if (this.storageId && localStorage.getItem(storageKey)) {
      this.savedColors = JSON.parse(localStorage.getItem(storageKey));
    }

    this.updateDimensions(this.scale);
  }

  render() {
    const { mode, activeColor, savedColors, theme } = this;
    const parts = this.getColorComponents();
    const partLabels =
      this.mode === "rgb"
        ? [this.textR, this.textG, this.textB]
        : [this.textH, this.textS, this.textV];
    const selectedColorInHex = activeColor.hex();

    const { dimensions } = this;

    return (
      <Host>
        <canvas
          class={CSS.colorPalette}
          height={dimensions.colorPalette.height}
          width={dimensions.colorPalette.width}
          ref={this.initColorPalette}
        />
        <canvas
          class={CSS.hueSlider}
          height={dimensions.slider.height}
          width={dimensions.slider.width}
          ref={this.initHueSlider}
        />
        <div class={{ [CSS.controlSection]: true, [CSS.section]: true }}>
          <div class={CSS.colorHexOptions}>
            <span class={{ [CSS.header]: true, [CSS.underlinedHeader]: true }}>
              {this.textHex}
            </span>
            <calcite-hex-input
              class={CSS.control}
              onCalciteHexInputChange={this.handleHexInputChange}
              value={selectedColorInHex}
              theme={theme}
            />
          </div>
          <div
            class={{
              [CSS.colorModeContainer]: true,
              [CSS.splitSection]: true
            }}
          >
            <div
              class={{
                [CSS.colorModeSelection]: true,
                [CSS.header]: true,
                [CSS.underlinedHeader]: true
              }}
            >
              <div
                class={{
                  [CSS.colorMode]: true,
                  [CSS.colorModeSelected]: mode === "rgb"
                }}
                data-color-mode="rgb"
                onClick={this.handleColorModeClick}
                onKeyDown={event => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    event.stopPropagation();
                    this.handleColorModeClick(event);
                  }
                }}
                tabIndex={0}
              >
                {this.textRgb}
              </div>
              <div
                class={{
                  [CSS.colorMode]: true,
                  [CSS.colorModeSelected]: mode === "hsv"
                }}
                data-color-mode="hsv"
                onClick={this.handleColorModeClick}
                onKeyDown={event => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    event.stopPropagation();
                    this.handleColorModeClick(event);
                  }
                }}
                tabIndex={0}
              >
                {this.textHsv}
              </div>
            </div>
            <div class={{ [CSS.colorModeParts]: true, [CSS.control]: true }}>
              <div class={CSS.colorModePart}>
                <span class={CSS.colorModePartLabel}>{partLabels[0]}</span>
                <input
                  class={CSS.colorModePartInput}
                  type="number"
                  value={parts[0]}
                  data-color-part-id={0}
                  onChange={this.handleColorPartChange}
                />
              </div>
              <div class={CSS.colorModePart}>
                <span class={CSS.colorModePartLabel}>{partLabels[1]}</span>
                <input
                  class={CSS.colorModePartInput}
                  type="number"
                  value={parts[1]}
                  data-color-part-id={1}
                  onChange={this.handleColorPartChange}
                />
              </div>
              <div class={CSS.colorModePart}>
                <span class={CSS.colorModePartLabel}>{partLabels[2]}</span>
                <input
                  class={CSS.colorModePartInput}
                  type="number"
                  value={parts[2]}
                  data-color-part-id={2}
                  onChange={this.handleColorPartChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div class={{ [CSS.savedColorsSection]: true, [CSS.section]: true }}>
          <div class={CSS.header}>
            <label>{this.textSavedColors}</label>
          </div>
          <div class={CSS.savedColors}>
            {[
              ...savedColors.map(color => (
                <calcite-color-swatch
                  isActive={selectedColorInHex === color}
                  onClick={this.handleSavedColorSelect}
                  onKeyDown={event => {
                    if (event.key === " " || event.key === "Enter") {
                      event.preventDefault();
                      event.stopPropagation();
                      this.handleSavedColorSelect(event);
                    }
                  }}
                  color={color}
                  tabIndex={0}
                />
              )),
              <span
                class={CSS.saveColor}
                onClick={this.saveColor}
                onKeyDown={event => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    event.stopPropagation();
                    this.saveColor();
                  }
                }}
                tabIndex={0}
              >
                <calcite-icon icon="plus" scale="s" filled></calcite-icon>
              </span>
            ]}
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  updateDimensions(scale: Exclude<Scale, "xs" | "xl"> = "m"): void {
    this.dimensions = DIMENSIONS[scale];
  }

  saveColor = (): void => {
    const colorToSave = this.activeColor.hex();
    const alreadySaved = this.savedColors.indexOf(colorToSave) > -1;

    if (alreadySaved) {
      return;
    }

    const savedColors = [...this.savedColors, colorToSave];

    this.savedColors = savedColors;

    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;

    if (this.storageId) {
      localStorage.setItem(storageKey, JSON.stringify(savedColors));
    }
  };

  renderCanvasParts(): void {
    this.renderColorPalette();
    this.renderHueSlider();
  }

  private renderColorPalette(): void {
    const canvas = this.colorPaletteCanvas;
    const context = canvas.getContext("2d");
    const {
      dimensions: {
        colorPalette: { height, width }
      }
    } = this;

    context.fillStyle = this.activeColor
      .hsv()
      .saturationv(100)
      .value(100)
      .toString();

    context.fillRect(0, 0, width, height);

    const whiteGradient = context.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
    whiteGradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = whiteGradient;
    context.fillRect(0, 0, width, height);

    const blackGradient = context.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, "rgba(0,0,0,0)");
    blackGradient.addColorStop(1, "rgba(0,0,0,1)");
    context.fillStyle = blackGradient;
    context.fillRect(0, 0, width, height);

    this.renderActiveColorPaletteColor();
  }

  private initColorPalette = (node: HTMLCanvasElement): void => {
    this.colorPaletteCanvas = node;
    const canvas = this.colorPaletteCanvas;
    this.renderColorPalette();
    let trackingMouse = false;

    const captureColor = (x: number, y: number): void => {
      const {
        dimensions: {
          colorPalette: { height, width }
        }
      } = this;
      const saturation = (HSV_LIMITS.s / width) * x;
      const value = (HSV_LIMITS.v / height) * (height - y);

      this.activeColor = this.activeColor
        .hsv()
        .saturationv(saturation)
        .value(value);
    };

    canvas.addEventListener("mousedown", ({ offsetX, offsetY }) => {
      trackingMouse = true;
      captureColor(offsetX, offsetY);
    });

    canvas.addEventListener("mouseup", () => {
      trackingMouse = false;
    });

    canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
      if (!trackingMouse) {
        return;
      }

      captureColor(offsetX, offsetY);
    });
  };

  private renderActiveColorPaletteColor(): void {
    const startAngle = 0;
    const endAngle = 2 * Math.PI;

    const canvas = this.colorPaletteCanvas;
    const context = canvas.getContext("2d");

    const color = this.activeColor.hsv();

    const {
      dimensions: {
        colorPalette: { height, width }
      }
    } = this;
    const x = color.saturationv() / (HSV_LIMITS.s / width);
    const y = height - color.value() / (HSV_LIMITS.v / height);

    context.beginPath();
    context.arc(x, y, 10, startAngle, endAngle);
    context.fillStyle = color
      .desaturate(0.5)
      .rgb()
      .toString();
    context.fill();

    context.beginPath();
    context.arc(x, y, 7, startAngle, endAngle);
    context.fillStyle = this.theme === "light" ? "#fff" : "#000";
    context.fill();

    context.beginPath();
    context.arc(x, y, 5, startAngle, endAngle);
    context.fillStyle = color.rgb().toString();
    context.fill();
  }

  private renderActiveHueSliderColor(): void {
    const startAngle = 0;
    const endAngle = 2 * Math.PI;

    const canvas = this.hueSliderCanvas;
    const context = canvas.getContext("2d");

    const color = this.activeColor
      .hsv()
      .saturationv(100)
      .value(100);

    const {
      dimensions: {
        slider: { height, width }
      }
    } = this;
    const x = color.hue() / (360 / width);
    const y = height / 2;

    context.beginPath();
    context.arc(x, y, 10, startAngle, endAngle);
    context.fillStyle = color
      .desaturate(0.5)
      .rgb()
      .toString();
    context.fill();

    context.beginPath();
    context.arc(x, y, 7, startAngle, endAngle);
    context.fillStyle = this.theme === "light" ? "#fff" : "#000";
    context.fill();

    context.beginPath();
    context.arc(x, y, 5, startAngle, endAngle);
    context.fillStyle = color.rgb().toString();
    context.fill();
  }

  private initHueSlider = (node: HTMLCanvasElement): void => {
    this.hueSliderCanvas = node;
    const canvas = this.hueSliderCanvas;

    this.renderHueSlider();

    let trackingMouse = false;

    const captureColor = (x: number): void => {
      const {
        dimensions: {
          slider: { width }
        }
      } = this;
      const hue = (360 / width) * x;
      this.activeColor = this.activeColor.hue(hue);
    };

    canvas.addEventListener("mousedown", ({ offsetX }) => {
      trackingMouse = true;
      captureColor(offsetX);
    });

    canvas.addEventListener("mouseup", () => (trackingMouse = false));

    canvas.addEventListener("mousemove", ({ offsetX }) => {
      if (!trackingMouse) {
        return;
      }

      captureColor(offsetX);
    });
  };

  private renderHueSlider(): void {
    const canvas = this.hueSliderCanvas;
    const context = canvas.getContext("2d");
    const {
      dimensions: {
        slider: { height, width }
      }
    } = this;

    const gradient = context.createLinearGradient(0, 0, width, 0);

    const hueSliderColorStopKeywords = [
      "red",
      "yellow",
      "lime",
      "cyan",
      "blue",
      "magenta",
      "red"
    ];

    const offset = 1 / (hueSliderColorStopKeywords.length - 1);
    let currentOffset = 0;

    hueSliderColorStopKeywords.forEach(keyword => {
      gradient.addColorStop(currentOffset, Color(keyword).toString());
      currentOffset += offset;
    });

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    this.renderActiveHueSliderColor();
  }

  updateColorFromParts(): void {
    this.activeColor = Color(
      [this.colorPart0, this.colorPart1, this.colorPart2],
      this.mode
    );
  }

  getColorComponents(): [number, number, number] {
    const { activeColor, mode } = this;
    return activeColor[mode]()
      .array()
      .map(value => Math.floor(value)) as [number, number, number];
  }
}