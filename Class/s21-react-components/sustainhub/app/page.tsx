"use client";

import Link from "next/link";
import { useState } from "react"; // state helps update the votes
import { SAMPLE_INITIATIVES } from "./initiatives"; // list

export default function Home() {
  const [initiatives, setInitiatives] = useState(SAMPLE_INITIATIVES);  // stores initiative in state so the page updates when votes change

  //runs when someone clicks Vote, idToUpdate is which initiative should get vote
  function handleVote(idToUpdate: string) {
    // Use the latest state so a click always starts with the current vote counts.
    setInitiatives((currentInitiatives) => {
      // new array to store updated initiatives
      const newInitiatives = [];

      for (let i = 0; i < currentInitiatives.length; i++) {
        const currentItem = currentInitiatives[i];

        //if this is the initiative we want to vote for
        if (currentItem.id === idToUpdate) {
          const updatedItem = {
            ...currentItem, // keeps all original properties and
            votes: currentItem.votes + 1, // this increases vote by 1
          };

          newInitiatives.push(updatedItem);
        } else {
          newInitiatives.push(currentItem);
        }
      }

      return newInitiatives;
    }); // React redraws the page with this updated list.
  }

  return (
    <main>
      <h1>Climate Action Initiatives</h1> <br></br>
      <h2> Made by Emiliano Gomez and Ian Uribe</h2>

      <div>
        {/* goes through initiatives and displays each one, curly braces are so comments work btw*/}
        {initiatives.map((item) => {
          return (
            // key helps React identify the initiatives
            <article key={item.id}>
              {/* clicking the title or votes opens the details*/}
              <Link href={"/initiatives/" + item.id}>
                <h2>{item.title}</h2>
                <p>{item.votes} votes</p>
              </Link>

              {/*clicking vote calls handleVote with the item id of the voted initiative*/}
              {/* type="button" makes this a regular button, not a form submit button. */}
              <button type="button" onClick={() => handleVote(item.id)}>
                Vote
              </button>
            </article>
          );
        })}
      </div>
    </main>
  );
}