import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";

function TopicTabs() {
  const [value, setValue] = useState(0);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-project-iwre.onrender.com/api/topics")
      .then((data) => {
        setTopics(data.data.topics);
        console.log(topics);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setTopics([]);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {!topics && <p>Loading topics...</p>}
      {topics && topics.length === 0 && <p>No topics found.</p>}

      {topics.length > 0 && (
           <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered> 
            {topics.map((topic, index) => ( 
              <Tab key={topic.slug || index} label={topic.slug} /> 
            ))}
          </Tabs>
        </Box>
      )}
    </>
  );
}

export default TopicTabs;
