import { useState, useEffect } from "react";

// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';

const { fetchReadme } = require("@varandas/fetch-readme");

// ----------------------------------------------------------------------

export default function About() {
  const [page, setPage] = useState("eta");

  useEffect(() => {
    fetchReadme({
      username: "leviEyal",
      repository: "Big-Data-Project"
    }).then((readme) => setPage(readme));
  }, []);

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <section>
        <article dangerouslySetInnerHTML={{ __html: page }} />
      </section>
    </Page>
  );
}
