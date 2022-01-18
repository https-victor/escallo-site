import React from "react";
import NextImage from "next/image";
import classNames from "classnames";
import styles from "./image.module.scss";

export default function Image({
  wrapperClassName,
  className,
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  position,
  layout,
  ...props
}) {
  let style = {};
  width && (style["width"] = width);
  maxWidth && (style["maxWidth"] = maxWidth);
  minWidth && (style["minWidth"] = minWidth);
  height && (style["height"] = height);
  maxHeight && (style["maxHeight"] = maxHeight);
  minHeight && (style["minHeight"] = minHeight);
  position && (style["position"] = position);
  return (
    <div
      className={classNames(styles.imageContainer, wrapperClassName)}
      style={style}
    >
      <NextImage
        {...props}
        layout={layout}
        {...(layout === "fill" ? {} : { width: { width } })}
        {...(layout === "fill" ? {} : { height: { height } })}
        className={classNames(styles.image, className)}
      />
    </div>
  );
}
