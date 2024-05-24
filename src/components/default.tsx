import { Author } from "@/types";
import { ReactNode } from "react";
import React from "react";

/**
 * DefaultTemplate component displays a default template with a title.
 *
 * @param {string} title - The title to display in the template.
 * @param {Object} author - The author to display in the template.
 * @returns {ReactNode} - The default template component.
 */
const DefaultTemplate = (title: string, author?: Author): ReactNode => (
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

      <div style={{ display: "flex", alignItems: "center" }}>
        {author?.imageURL && (
          <img
            src={author.imageURL}
            alt=""
            width={110}
            height={110}
            style={{
              padding: "1rem",
              border: "1px solid #333545",
              borderRadius: "100%",
            }}
          />
        )}
        <p style={{ marginLeft: "16px", fontSize: 40, fontWeight: 500 }}>
          {author?.name}
        </p>
      </div>
    </div>
  </div>
);

export default DefaultTemplate;
