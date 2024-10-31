"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";

export default function SearchInput() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/images/search?q=${searchQuery.trim() || ""}`);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        className={classes.input}
        type="text"
        placeholder="Search an image"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}
