import { useState, useEffect } from "react";

const [query, setQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [typingTimeout, setTypingTimeout] = useState(null);

useEffect(() => {
  if (query.length < 2) {
    setSuggestions([]);
    return;
  }

  if (typingTimeout) clearTimeout(typingTimeout);

  const timeout = setTimeout(async () => {
    try {
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        query
      )}&limit=5&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data.features || []);
    } catch (err) {
      console.error(err);
    }
  }, 500); // wait 500ms after user stops typing

  setTypingTimeout(timeout);
}, [query]);
