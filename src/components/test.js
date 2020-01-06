import React from "react"
import { Link } from "gatsby"
import Header from "./header"
import { ThemeProvider } from "styled-components"
import theme from "../utils/theme"

const Test = () => (
  <ThemeProvider theme={theme}>
    <Header />
  </ThemeProvider>
)

export default Test
