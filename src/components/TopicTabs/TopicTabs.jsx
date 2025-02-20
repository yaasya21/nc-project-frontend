import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";

function TopicTabs({ setTopic, setPage }) {
  const [value, setValue] = useState(0);
  const [topics, setTopics] = useState([
    { slug: "all", description: "All articles" },
  ]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTopic = searchParams.get("topic");

  useEffect(() => {
    axios
      .get("https://nc-project-iwre.onrender.com/api/topics")
      .then((data) => {
        setTopics((prevTopics) => [...prevTopics, ...data.data.topics]);

        if (initialTopic) { // if topic added manualy to url or after refresh
          const index = data.data.topics.findIndex(
            (topic) => topic.slug === initialTopic
          );
          const correctIndex = index === -1 ? 0 : index + 1;

          setValue(correctIndex);
          setTopic(index === -1 ? "all" : data.data.topics[index].slug);
        }
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setTopics([{ slug: "all", description: "All articles" }]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTopic(topics[newValue].slug);
    setPage(1);
  };

  return (
    <>
      {loading && <p>Loading topics...</p>}

      {!loading && (
        <>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs value={value} onChange={handleChange} centered>
              {topics.map((topic, index) => (
                <Tab key={topic.slug || index} label={topic.slug} />
              ))}
            </Tabs>
          </Box>
          <Typography variant="h4">{topics[value].description}</Typography>
        </>
      )}
    </>
  );
}

export default TopicTabs;
