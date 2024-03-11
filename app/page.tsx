"use client";
import {
  Title,
  Text,
  Anchor,
  Flex,
  Grid,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useProgressBar } from "./context/ProgressBarContext";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { isLoading, showProgressBar, hideProgressBar } = useProgressBar();

  const onClickHandler = async () => {
    const req = { text: input };
    console.log("Will request to api");
    showProgressBar();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    hideProgressBar();
    console.log("This is resposne");
    const result = await response.json();
    setOutput(result);
  };
  return (
    <>
      <Flex align="center" mt={40}>
        <Grid w="100vw">
          <Grid.Col span={6} w="30%">
            <Textarea
              rows={30}
              value={input}
              onChange={(event: any) => {
                setInput(event.target.value);
              }}
            >
              {" "}
            </Textarea>
          </Grid.Col>
          <Grid.Col span={6} w="30%">
            <Textarea
              rows={30}
              value={output}
              onChange={(event: any) => {
                setOutput(event.target.value);
              }}
            ></Textarea>
          </Grid.Col>
        </Grid>
      </Flex>
      <Flex dir="rtl">
        <Button mt={30} onClick={onClickHandler}>
          Resposne
        </Button>
      </Flex>
    </>
  );
}
