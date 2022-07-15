import React, { useState } from "react";
import styles from "./form.module.css";

export function Form() {
  const [name, nameSet] = useState("");
  const [favoriteColor, favoriteColorSet] = useState("");
  const [response, responseSet] = useState();

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    // prevent an empty form
    if (name === "" && favoriteColor === "") return;

    const res = await fetch("/.netlify/functions/submit", {
      method: "POST",
      body: JSON.stringify({ name, favoriteColor }),
    }).then((res) => res.json());

    responseSet(res);
    nameSet("");
    favoriteColorSet("");
  }

  return (
    <>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          name="name"
          id="name"
          className={styles.input}
          type="text"
          onChange={(e) => nameSet(e.target.value)}
          value={name}
        />

        <label htmlFor="favorite-color" className={styles.label}>
          Favorite Color
        </label>
        <input
          name="favorite-color"
          id="favorite-color"
          className={styles.input}
          type="text"
          onChange={(e) => favoriteColorSet(e.target.value)}
          value={favoriteColor}
        />

        <button className={styles.button}>Submit</button>
      </form>
    </>
  );
}
