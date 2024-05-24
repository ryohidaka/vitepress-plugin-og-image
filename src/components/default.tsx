import { ReactNode } from "react";
import React from "react";

/**
 * DefaultTemplate component displays a default template with a title.
 *
 * @param {string} title - The title to display in the template.
 * @returns {ReactNode} - The default template component.
 */
const DefaultTemplate = (title: string): ReactNode => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      backgroundImage: "linear-gradient(135deg, #7dc7f8 10%, #027cd9 100%)",
      color: "#f3f3f3",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 2rem",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "3rem 4rem 2.5rem",
        backgroundColor: "#181b29",
        justifyContent: "space-between",
        borderRadius: "10px",
        width: "100%",
        height: "90%",
      }}
    >
      <p style={{ fontSize: 60, fontWeight: 700 }}>{title}</p>
    </div>
  </div>
);

export default DefaultTemplate;
